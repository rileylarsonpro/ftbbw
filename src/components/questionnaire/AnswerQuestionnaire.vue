<template>
  <div>
    <ZForm @form-submit="answerQuestionnaire">
      <div v-if="isAdmin">
        <MediaSearch
          show-label
          v-model="adminForm.person"
          search-type="person"
          placeholder="Podcast Guest"
        />
        <ZInput
          show-label
          placeholder="Episode Title"
          v-model="adminForm.episodeTitle"
          class="mb-2"
        />
        <ZInput
          show-label
          placeholder="Episode Number"
          v-model="adminForm.episodeNumber"
          class="mb-2"
          type="number"
          min="1"
          max="1000"
        />
        <ZInput
          show-label
          placeholder="Air Date"
          v-model="adminForm.airDate"
          class="mb-2"
          type="date"
          min="1"
          max="1000"
        />
        <ZInput
          show-label
          placeholder="Description"
          v-model="adminForm.description"
          class="mb-2"
          is-textarea
          rows="5"
        />
      </div>
      <div v-for="(question, index) in questions" :key="question.id">
        <AnswerQuestion
          v-model="answers[index]"
          :question="question"
          :index="index"
          @update:model-value="answerQuestionnaire"
        />
      </div>
      <div class="flex items-center justify-center my-4 gap-3">
        <ZButton type="submit">Save Answers</ZButton>
      </div>
    </ZForm>
  </div>
</template>

<script lang="ts">
import type { Questionnaire } from '../../models/questionnaire.model';
import type { Question } from '../../models/question.model';

import { actions } from 'astro:actions';
import ZButton from '../global/ZButton.vue';
import ZForm from '../global/ZForm.vue';
import ZInput from '../global/ZInput.vue';
import AnswerQuestion from './AnswerQuestion.vue';
import ZSelect from '../global/ZSelect.vue';
import MediaSearch from '../media/MediaSearch.vue';

import rules from '../../helpers/rules.helper';
import type { PropType } from 'vue';

const emptyQuestion = {
  text: '',
  description: '',
  answerType: 'MOVIE'
} as QuestionForm;

export default {
  name: 'AnswerQuestionnaire',
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    questionnaire: {
      type: Object as PropType<Questionnaire>,
      required: true
    },
    questions: {
      type: Object as PropType<Question[]>,
      required: true
    },
    previousAnswers: {
      type: Array as PropType<RawAnswerForm[][]>,
      default: () => []
    }
  },
  components: { ZInput, ZButton, ZForm, AnswerQuestion, ZSelect, MediaSearch },
  data() {
    return {
      adminForm: {
        episodeTitle: '',
        episodeNumber: 1,
        person: null as TMDBSearchResult | null,
        airDate: Date.now() as string | number | undefined,
        description: ''
      },
      answers: this.previousAnswers?.length
        ? this.previousAnswers
        : (new Array(this.questions.length).fill([]) as RawAnswerForm[][]),
      rules
    };
  },
  methods: {
    async answerQuestionnaire() {
      if (this.isAdmin && this.adminForm.episodeTitle) {
        return;
      }
      let answers = this.answers.map((row, rowIndex) => {
        let question = this.questions[rowIndex];
        return row.map((aForm) => {
          let formatted = {
            note: aForm.note,
            questionId: question.id
          } as FormattedAnswerForm;
          if (!aForm.answer?.id) return formatted;
          if (question.answerType === 'MULTI') {
            if (aForm.answer?.media_type === 'movie') {
              formatted.movieId = `${aForm.answer.id}`;
            } else if (aForm.answer?.media_type === 'tv') {
              formatted.seriesId = `${aForm.answer.id}`;
            } else if (aForm.answer?.media_type === 'person') {
              formatted.personId = `${aForm.answer.id}`;
            }
          }

          if (question.answerType === 'MOVIE') {
            formatted.movieId = `${aForm.answer.id}`;
          } else if (question.answerType === 'TV_SERIES') {
            formatted.seriesId = `${aForm.answer.id}`;
          } else if (question.answerType === 'PERSON') {
            formatted.personId = `${aForm.answer.id}`;
          }
          return formatted;
        });
      });
      const { data, error } = await actions.answerQuestionnaire({
        questionnaireId: this.questionnaire.id,
        answers
      });
    }
  }
};
</script>
