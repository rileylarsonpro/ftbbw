<template>
  <div class="w-6 h-6 text-purple-400">
    <div v-if="mediaType === 'movie'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="24"
        viewBox="0 0 35 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <!-- Outer Circle of Film Reel -->
        <circle cx="17.5" cy="12" r="9" stroke="currentColor" fill="none" />

        <!-- Four larger circles inside the film reel (moved further inside) -->
        <circle cx="17.5" cy="7" r="1" stroke="currentColor" fill="none" />
        <circle cx="17.5" cy="17" r="1" stroke="currentColor" fill="none" />
        <circle cx="13" cy="12" r="1" stroke="currentColor" fill="none" />
        <circle cx="22" cy="12" r="1" stroke="currentColor" fill="none" />

        <!-- Smaller dot in the center -->
        <circle cx="17.5" cy="12" r="0.2" fill="black" />

        <!-- Tape coming out (line) from the bottom left -->
        <line x1="2" y1="21" x2="17" y2="21" stroke="currentColor" />
      </svg>
    </div>
    <div v-if="mediaType === 'tv'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <!-- TV screen (rectangle) -->
        <rect
          x="3"
          y="6"
          width="24"
          height="14"
          stroke="currentColor"
          fill="none"
        />

        <!-- Antenna left -->
        <line x1="9" y1="3" x2="9" y2="6" stroke="currentColor" />

        <!-- Antenna right -->
        <line x1="21" y1="3" x2="21" y2="6" stroke="currentColor" />

        <!-- Bottom base of the TV -->
        <rect
          x="11"
          y="20"
          width="8"
          height="2"
          stroke="currentColor"
          fill="none"
        />
      </svg>
    </div>
    <div v-if="mediaType === 'person'">
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.25 6.00001C12.25 8.89951 9.89949 11.25 7 11.25C4.1005 11.25 1.75 8.89951 1.75 6.00001C1.75 3.10052 4.1005 0.750012 7 0.750012C9.89949 0.750012 12.25 3.10052 12.25 6.00001Z"
          stroke="currentColor"
          stroke-width="2"
        />
        <path
          d="M13.25 18V23.25H0.75V18C0.75 14.5482 3.54822 11.75 7 11.75C10.4518 11.75 13.25 14.5482 13.25 18Z"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    mediaType: {
      type: String as PropType<TMDBMediaType>,
      required: true
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
