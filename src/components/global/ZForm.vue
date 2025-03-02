<template>
  <form @submit.stop.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      validateForm: this.validateForm
    };
  },
  data() {
    return {
      fields: [],
      errors: {}
    };
  },
  methods: {
    // Register a field with its validation rules
    registerField(field) {
      this.fields.push(field);
    },
    // Unregister a field
    unregisterField(field) {
      this.fields = this.fields.filter((f) => f.id !== field.id);
    },
    // Validate the entire form
    validateForm() {
      this.errors = {}; // Reset errors before validation
      let isValid = true;

      // Loop through all fields and validate
      for (const field of this.fields) {
        const { valid, errorMessage } = field.validate();
        if (!valid) {
          this.errors[field.name] = errorMessage;
          isValid = false;
        }
      }

      return isValid;
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit('form-submit');
      } else {
        //console.error('Form has errors');
      }
    }
  }
};
</script>
