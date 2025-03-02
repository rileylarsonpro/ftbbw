import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db } from '../../../utils/db';
import { eq, and } from 'drizzle-orm';
import { question } from '../../../models/question.model';
import { questionnaire } from '../../../models/questionnaire.model';
import { answer } from '../../../models/answer.model';
import {
  handleInternalServerError,
  handleUnauthorizedError,
  handleBadRequestError
} from '../action.helper';
import type { ActionAPIContext } from 'astro:actions';
import questionnaireHelper from '../../../helpers/questionnaire.helper';
import { findMovie, findPerson, findSeries } from '../media/media.utils';

export const createQuestionnaire = async (
  input: {
    name: string;
    description: string;
    questions: QuestionForm[];
    type?: QuestionnaireType;
  },
  context: ActionAPIContext
) => {
  const { name, description, questions, type } = input;

  if (!context.locals.user) {
    return handleUnauthorizedError();
  }

  const transaction = await db.transaction(async (tx) => {
    const newQuestionnaire = await tx
      .insert(questionnaire)
      .values({
        name: name,
        description: description,
        createdByUserId: context.locals.user?.id,
        type: context.locals.isAdmin ? type : 'CUSTOM'
      })
      .returning();

    if (newQuestionnaire.length === 0) {
      return handleInternalServerError('No Questionnaire created');
    }

    const questionPromises = questions.map((newQuestion, index) => {
      return tx
        .insert(question)
        .values({
          text: newQuestion.text,
          description: newQuestion.description,
          answerType: newQuestion.answerType,
          order: index + 1,
          questionnaireId: newQuestionnaire[0].id
        })
        .returning();
    });

    await Promise.all(questionPromises);

    return newQuestionnaire[0];
  });

  return transaction;
};

export const answerQuestionnaire = async (
  input: {
    questionnaireId: number;
    answers: FormattedAnswerForm[][];
  },
  context: ActionAPIContext
) => {
  if (context.locals.user === null || !context.locals.user?.id) {
    return handleUnauthorizedError();
  }

  const { questionnaireId, answers } = input;
  const questionnaire =
    await questionnaireHelper.findQuestionnaireById(questionnaireId);

  if (!questionnaire) {
    return handleBadRequestError('No questionnaire found with that Id');
  }

  const questions =
    await questionnaireHelper.findManyQuestionnaireQuestions(questionnaireId);

  if (!questions.length) {
    return handleBadRequestError('No questions found');
  }
  const transaction = await db.transaction(async (tx) => {
    // Delete all old answers
    await tx
      .delete(answer)
      .where(
        and(
          eq(answer.questionnaireId, questionnaireId),
          eq(answer.userId, context.locals.user?.id as string)
        )
      );
    // Add new answers
    answers.forEach(async (row, rowIndex) => {
      let question = await questionnaireHelper.findQuestionById(
        questions[rowIndex].id
      );
      row
        .filter((answerForm) => {
          // validate question
          if (!question) return false;
          if (question.answerType === 'MOVIE' && !answerForm.movieId)
            return false;
          if (question.answerType === 'TV_SERIES' && !answerForm.seriesId)
            return false;
          if (question.answerType === 'PERSON' && !answerForm.personId)
            return false;
          if (question.answerType === 'TEXT' && !answerForm.note) return false;
          if (
            question.answerType === 'MULTI' &&
            !answerForm.movieId &&
            !answerForm.seriesId &&
            !answerForm.personId
          )
            return false;

          return true;
        })
        .forEach(async (answerForm, index) => {
          if (question) {
            let idSection = {
              movieId: undefined as string | undefined,
              seriesId: undefined as string | undefined,
              personId: undefined as string | undefined
            };
            if (answerForm.movieId) {
              let movie = await findMovie(answerForm.movieId);
              idSection.movieId = movie.id;
            } else if (answerForm.seriesId) {
              let series = await findSeries(answerForm.seriesId);
              idSection.seriesId = series.id;
            } else if (answerForm.personId) {
              let person = await findPerson(answerForm.personId);
              idSection.personId = person.id;
            }
            let res = await tx.insert(answer).values({
              ...idSection,
              questionId: question.id,
              questionnaireId: questionnaireId,
              note: answerForm.note,
              order: index + 1,
              userId: context.locals.user?.id,
              answerType: question.answerType
            });
          }
        });
    });

    return true;
  });

  return transaction;
};

export default {
  createQuestionnaire: defineAction({
    input: z.object({
      name: z.string(),
      description: z.string(),
      questions: z
        .array(
          z.object({
            text: z.string(),
            description: z.string(),
            answerType: z.enum([
              'MOVIE',
              'TV_SERIES',
              'PERSON',
              'TEXT',
              'MULTI'
            ])
          })
        )
        .refine((questions) => questions.length > 0, {
          message: 'At least one question is required.'
        }),
      type: z
        .enum([
          'CUSTOM',
          'FTBBW',
          'FTBBW_2018',
          'FTBBW_2019',
          'FTBBW_DECADE_2010',
          'FTBBW_2020',
          'FTBBW_2021',
          'FTBBW_2022',
          'FTBBW_2023',
          'FTBBW_2024',
          'RESURRECTION',
          'JUDGMENT_DAY',
          'REINCARNATION'
        ])
        .optional()
    }),
    handler: createQuestionnaire
  }),
  answerQuestionnaire: defineAction({
    input: z.object({
      questionnaireId: z.number(),
      answers: z.array(
        z.array(
          z.object({
            questionId: z.number(),
            movieId: z.string().optional(),
            seriesId: z.string().optional(),
            personId: z.string().optional(),
            note: z.string().optional()
          })
        )
      )
    }),
    handler: answerQuestionnaire
  })
};
