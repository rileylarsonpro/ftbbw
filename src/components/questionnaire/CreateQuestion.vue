<template>
  <div
    class="relative block w-full p-4 mt-4 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ring-inset ring-1 ring-gray-500"
  >
    <div class="text-center text-lg font-semibold mb-4">
      Question {{ index + 1 }}
    </div>
    <button
      v-if="!hideRemove"
      @click.prevent="removeQuestion"
      class="absolute right-3 top-5 transform -translate-y-1/2 w-4"
    >
      X
    </button>

    <div class="md:grid md:grid-cols-2 gap-3">
      <div>
        <ZInput
          v-model="form.text"
          placeholder="Question Text"
          :rules="[rules.required]"
          @update-modelValue="updateForm"
          show-label
        />
      </div>
      <div>
        <ZSelect
          v-model="form.answerType"
          placeholder="Answer Type"
          :rules="[rules.required]"
          :items="items"
          @update-modelValue="updateForm"
          show-label
          :readonly="true"
        />
      </div>
    </div>
    <ZInput
      show-label
      placeholder="Description"
      v-model="form.description"
      @update-modelValue="updateForm"
      class="mb-2"
    />
  </div>
</template>

<script lang="ts">
import ZButton from '../global/ZButton.vue';
import ZForm from '../global/ZForm.vue';
import ZInput from '../global/ZInput.vue';
import ZSelect from '../global/ZSelect.vue';
import MediaSearch from '../media/MediaSearch.vue';

import rules from '../../helpers/rules.helper';
import type { PropType } from 'vue';
export default {
  name: 'CreateQuestion',
  props: {
    modelValue: {
      type: Object as PropType<QuestionForm>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    hideRemove: {
      type: Boolean,
      default: false
    }
  },
  components: { ZInput, MediaSearch, ZButton, ZForm, ZSelect },
  data() {
    return {
      form: this.modelValue,
      rules,
      items: [
        { label: 'Movie', value: 'MOVIE' },
        { label: 'TV Series', value: 'TV_SERIES' },
        { label: 'Person', value: 'PERSON' },
        { label: 'Multi (Movie, TV Series or Person)', value: 'MULTI' },
        { label: 'Short Answer', value: 'TEXT' }
      ]
    };
  },
  methods: {
    updateForm() {
      this.$emit('update:model-value', this.form);
    },
    removeQuestion() {
      this.$emit('remove-question', this.index);
    }
  }
};
</script>
