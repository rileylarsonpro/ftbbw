<template>
  <div>
    <ZForm @form-submit="createQuestionnaire">
      <div class="md:grid md:grid-cols-2 gap-3">
        <div>
          <ZInput
            v-model="form.name"
            placeholder="Questionnaire Name"
            :rules="[rules.required]"
            show-label
          />
        </div>
        <div class="mb-4">
          <ZInput
            placeholder="Description"
            v-model="form.description"
            show-label
          />
        </div>
      </div>
      <div v-if="isAdmin" class="md:grid md:grid-cols-2 gap-3">
        <ZSelect
          v-model="form.type"
          placeholder="Questionnaire Type"
          :rules="[rules.required]"
          :items="typeChoices"
          show-label
          :readonly="true"
        />
      </div>
      <div v-for="(question, index) in form.questions" :key="question.id">
        <CreateQuestion
          :hide-remove="form.questions.length <= 1"
          v-model="form.questions[index]"
          :index="index"
          @removeQuestion="removeQuestion(index)"
        />
      </div>
      <div class="flex items-center justify-center my-4 gap-3">
        <ZButton @click.prevent="addQuestion">+ Add Question</ZButton>
        <ZButton type="submit">Create Questionnaire</ZButton>
      </div>
    </ZForm>
  </div>
</template>

<script lang="ts">
import { actions } from 'astro:actions';
import ZButton from '../global/ZButton.vue';
import ZForm from '../global/ZForm.vue';
import ZInput from '../global/ZInput.vue';
import CreateQuestion from './CreateQuestion.vue';
import ZSelect from '../global/ZSelect.vue';

import rules from '../../helpers/rules.helper';

const emptyQuestion = {
  text: '',
  description: '',
  answerType: 'MOVIE'
} as QuestionForm;

export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  components: { ZInput, ZButton, ZForm, CreateQuestion, ZSelect },
  data() {
    return {
      form: {
        type: 'CUSTOM' as QuestionnaireType,
        name: '',
        description: '',
        questions: [{ ...emptyQuestion, id: Date.now() }] as QuestionForm[]
      },
      rules,
      typeChoices: [
        { value: 'CUSTOM', label: 'CUSTOM' },
        { value: 'FTBBW', label: 'FTBBW' },
        { value: 'RESURRECTION', label: 'RESURRECTION' },
        { value: 'JUDGMENT_DAY', label: 'JUDGMENT_DAY' },
        { value: 'REINCARNATION', label: 'REINCARNATION' },
        { value: 'FTBBW_2018', label: 'FTBBW_2018' },
        { value: 'FTBBW_2019', label: 'FTBBW_2019' },
        { value: 'FTBBW_DECADE_2010', label: 'FTBBW_DECADE_2010' },
        { value: 'FTBBW_2020', label: 'FTBBW_2020' },
        { value: 'FTBBW_2021', label: 'FTBBW_2021' },
        { value: 'FTBBW_2022', label: 'FTBBW_2022' },
        { value: 'FTBBW_2023', label: 'FTBBW_2023' },
        { value: 'FTBBW_2024', label: 'FTBBW_2024' }
      ]
    };
  },
  methods: {
    addQuestion() {
      this.form.questions.push({
        ...emptyQuestion,
        id: Date.now()
      });
    },
    removeQuestion(index: number) {
      this.form.questions.splice(index, 1);
    },
    async createQuestionnaire() {
      const { data, error } = await actions.createQuestionnaire(this.form);
      if (!error) {
        this.form = {
          type: 'CUSTOM' as QuestionnaireType,
          name: '',
          description: '',
          questions: [{ ...emptyQuestion, id: Date.now() }] as QuestionForm[]
        };
      }
    }
  }
};
</script>
