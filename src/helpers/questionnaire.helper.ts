import { db } from '../utils/db';
import { eq, asc, and } from 'drizzle-orm';
import { question } from '../models/question.model';
import { answer } from '../models/answer.model';

const findQuestionnaireById = async (questionnaireId: number) => {
  return db.query.questionnaire.findFirst({
    where: (questionnaire) => eq(questionnaire.id, questionnaireId)
  });
};

const findManyQuestionnaireQuestions = async (questionnaireId: number) => {
  return db.query.question.findMany({
    where: (question) => eq(question.questionnaireId, questionnaireId),
    orderBy: [asc(question.order)]
  });
};

const findQuestionById = async (questionId: number) => {
  return db.query.question.findFirst({
    where: (question) => eq(question.id, questionId)
  });
};

const findQuestionnaireAnswers = async (
  questionnaireId: number,
  userId: string
) => {
  return db.query.answer.findMany({
    where: (answer) =>
      and(
        eq(answer.questionnaireId, questionnaireId),
        eq(answer.userId, userId)
      ),
    orderBy: [asc(answer.order)]
  });
};

export default {
  findQuestionnaireById,
  findManyQuestionnaireQuestions,
  findQuestionById,
  findQuestionnaireAnswers
};
