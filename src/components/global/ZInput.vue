<template>
  <div class="mb-1" :class="{ 'sr-only': !showLabel }">
    <label :for="`${id}`">{{ $attrs.placeholder }}</label>
  </div>
  <textarea
    v-if="isTextarea"
    :id="`${id}`"
    v-bind="$attrs"
    v-model="localValue"
    @input="handelInput"
    @focus="handleFocus"
    @blur="handleBlur"
    class="block w-full px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ring-inset ring-1 ring-gray-500"
    :class="{
      'pl-10': $slots.prepend,
      'ring-red-500': error
    }"
    autocomplete="off"
  />
  <input
    v-else
    :id="`${id}`"
    v-bind="$attrs"
    v-model="localValue"
    @input="handelInput"
    @focus="handleFocus"
    @blur="handleBlur"
    class="block w-full px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ring-inset ring-1 ring-gray-500"
    :class="{
      'pl-10': $slots.prepend,
      'ring-red-500': error
    }"
    autocomplete="off"
  />
  <Transition name="fade" v-if="rules.length">
    <div class="h-6">
      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>
  </Transition>
  <!-- Search Icon -->

  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4">
    <slot name="prepend"></slot>
  </span>

  <span
    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 text-purple-500"
  >
    <slot name="append"></slot>
  </span>

  <div
    class="absolute w-full bg-gray-800 rounded-md shadow-lg max-h-[50vh] overflow-auto z-10"
  >
    <slot name="dropdown"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { PropType } from 'vue';
interface Field {
  id: number;
  validate(): { valid: boolean; errorMessage?: string };
}

export default defineComponent({
  name: 'ZInput',
  inject: {
    registerField: {
      from: 'registerField',
      default: () => {}
    },
    unregisterField: {
      from: 'unregisterField',
      default: () => {}
    }
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    rules: {
      type: Array as PropType<Function[]>,
      default: () => []
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    isTextarea: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: this.modelValue,
      error: null as string | null,
      id: null as number | null,
      isFocused: false
    };
  },
  watch: {
    modelValue() {
      this.localValue = this.modelValue;
    }
  },
  methods: {
    handelInput() {
      this.validate();
      this.$emit('input', this.localValue);
      this.$emit('update:modelValue', this.localValue);
    },
    validate() {
      for (const rule of this.rules) {
        const valid = rule(this.modelValue);
        if (valid !== true) {
          this.error = valid;
          return { valid: false, errorMessage: valid };
        }
      }
      this.error = null;
      return { valid: true };
    },
    handleFocus() {
      this.$emit('focus');
    },
    handleBlur() {
      this.$emit('blur');
    }
  },
  mounted() {
    this.id = Math.random();
    const registerField = inject('registerField') as (field: Field) => void;
    if (!registerField) return;
    registerField({
      id: this.id,
      validate: this.validate
    }); // Register the field
  },
  beforeUnmount() {
    if (!this.id) return;
    const unregisterField = inject('unregisterField') as (field: Field) => void;
    if (!unregisterField) return;
    unregisterField({
      id: this.id,
      validate: this.validate
    }); // Unregister the field
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
