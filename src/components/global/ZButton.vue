<template>
  <button
    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'ZButton',
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
