<template>
  <div
    class="relative block w-full p-4 mt-4 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ring-inset ring-1 ring-gray-500"
  >
    <div class="text-lg font-semibold mb-4">
      {{ question.text }}
    </div>
    <div class="mb-4">
      {{ question.description }}
    </div>
    <div v-for="(answer, aIndex) in form" :key="answer.id">
      <div class="mb-4 flex items-center my-4 gap-3">
        <MediaSearch
          v-if="question.answerType !== 'TEXT'"
          v-model="answer.answer"
          :search-type="searchType.type"
          :placeholder="searchType.placeholder"
          @update:model-value="updateForm"
          :number="aIndex + 1"
        />
        <button
          v-if="aIndex !== 0"
          @click.prevent="removeAnswer(aIndex)"
          class="w-4"
        >
          X
        </button>
      </div>
      <ZInput
        isTextarea
        rows="4"
        v-if="form.length > 0"
        :placeholder="question.answerType === 'TEXT' ? 'Answer here' : 'Notes'"
        v-model="answer.note"
        @input="updateForm"
        class="mb-2"
      />
    </div>
    <div
      v-if="question.answerType !== 'TEXT'"
      class="flex items-center justify-center my-4 gap-3"
    >
      <ZButton @click.prevent="addAnswer">+ Add Honorable Mention</ZButton>
    </div>
  </div>
</template>

<script lang="ts">
import type { Question } from '../../models/question.model';
import ZButton from '../global/ZButton.vue';
import ZForm from '../global/ZForm.vue';
import ZInput from '../global/ZInput.vue';
import ZSelect from '../global/ZSelect.vue';
import MediaSearch from '../media/MediaSearch.vue';

import rules from '../../helpers/rules.helper';
import type { PropType } from 'vue';

export default {
  name: 'AnswerQuestion',
  props: {
    modelValue: {
      type: Object as PropType<RawAnswerForm[]>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    question: {
      type: Object as PropType<Question>,
      required: true
    }
  },
  computed: {
    searchType(): { type: TMDBSearchType; placeholder: string } {
      switch (this.question.answerType) {
        case 'PERSON':
          return { type: 'person', placeholder: 'Search for person...' };
        case 'TV_SERIES':
          return { type: 'tv', placeholder: 'Search for tv series...' };
        case 'MULTI':
          return { type: 'multi', placeholder: 'Search...' };
        case 'MOVIE':
        default:
          return { type: 'movie', placeholder: 'Search for film...' };
      }
    }
  },
  components: { ZInput, MediaSearch, ZButton, ZForm, ZSelect },
  data() {
    return {
      form:
        this.modelValue && this.modelValue.length > 0
          ? this.modelValue
          : ([
              {
                id: Date.now(),
                questionId: this.question.id,
                note: '',
                answer: null
              }
            ] as RawAnswerForm[]),
      selected: null as null | TMDBSearchResult,
      rules
    };
  },
  methods: {
    updateForm() {
      this.$emit('update:model-value', this.form);
    },
    removeQuestion() {
      this.$emit('remove-question', this.index);
    },
    addAnswer() {
      this.form.push({
        id: Date.now(),
        questionId: this.question.id,
        note: '',
        answer: null
      });
      this.updateForm();
    },
    removeAnswer(index: number) {
      this.form.splice(index, 1);
      this.updateForm();
    }
  }
};
</script>
