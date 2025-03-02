<template>
  <div class="relative w-full mx-auto" ref="dropdownWrapper">
    <!-- Search Input -->
    <ZInput
      v-bind="$attrs"
      :model-value="selectedIndex !== null ? items[selectedIndex].label : ''"
      :rules="rules"
      @focus="showDropdown = true"
    >
      <!-- Dropdown Menu -->
      <template #dropdown>
        <ul class="text-white" v-if="items.length > 0 && showDropdown">
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="selectItem(item, index)"
            class="px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white"
            tabindex="1"
          >
            <div class="flex items-center space-x-4">
              <slot name="item" :item="item">
                <div>
                  {{ item.label }}
                </div>
              </slot>
            </div>
          </li>
        </ul>
      </template>
    </ZInput>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import ZInput from '../global/ZInput.vue';

export default {
  name: 'ZSelect',
  props: {
    modelValue: {
      type: [Object, String] as PropType<any | null>,
      default: null
    },
    rules: {
      type: Array as PropType<Function[]>,
      default: () => []
    },
    items: {
      type: Array as PropType<{ label: string; value: any }[]>,
      default: () => []
    }
  },
  components: {
    ZInput
  },
  data() {
    return {
      selectedItem: this.modelValue,
      selectedIndex: null as null | number,
      showDropdown: false
    };
  },
  created() {
    if (this.modelValue) {
      let index = this.items.findIndex((item) => item.value == this.modelValue);
      this.selectedIndex = index !== -1 ? index : null;
    }
  },
  methods: {
    selectItem(item: any, index: number) {
      this.selectedItem = item.value;
      this.selectedIndex = index;
      this.showDropdown = false;
      this.$emit('update:modelValue', this.selectedItem);
    },

    clearSelection() {
      this.selectedItem = null;
      this.selectedIndex = null;
      this.$emit('update:modelValue', this.selectedItem);
    },
    handleClickOutside(event: MouseEvent) {
      const dropdownWrapper = this.$refs.dropdownWrapper as HTMLElement;
      const input = dropdownWrapper.querySelector('input') as HTMLElement;

      if (
        dropdownWrapper &&
        !dropdownWrapper.contains(event.target as Node) &&
        !input.contains(event.target as Node)
      ) {
        this.showDropdown = false;
      }
    }
  },
  mounted() {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('mousedown', this.handleClickOutside);
  },
  beforeUnmount() {
    // Remove event listener when the component is destroyed
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
};
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>
