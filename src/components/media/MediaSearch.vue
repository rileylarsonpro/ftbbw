<template>
  <div class="relative w-full mx-auto">
    <label for="search" class="sr-only">Search</label>
    <div
      v-if="selectedResult"
      class="flex justify-between items-center w-full px-4 py-2 text-white bg-gray-800 rounded-md ring-inset ring-1 ring-gray-500"
    >
      <div class="flex justify-between items-center h-full">
        <div v-if="number" class="mr-2">{{ number }}.</div>
        <MediaTypeIcon
          :mediaType="
            searchType === 'multi' ? selectedResult.media_type : searchType
          "
          class="mr-4"
        />
        <div>
          {{ selectedResult.title ?? selectedResult.name }}
          <span v-if="selectedResult.release_date">
            ({{ selectedResult.release_date.substring(0, 4) }})
          </span>
        </div>
      </div>
      <button @click="clearSelection" class="w-8">
        <img :src="cancelIcon.src" alt="cancel" />
      </button>
    </div>
    <ZInput
      v-else
      id="search"
      v-model="query"
      type="text"
      :placeholder="placeholder"
      @input="debouncedSearch"
    >
      <template #prepend>
        <img :src="searchIcon.src" alt="" />
      </template>

      <template #append>
        <div v-if="loading">
          <img :src="spinner.src" alt="loading" />
        </div>
      </template>

      <template #dropdown>
        <ul class="text-white" v-if="results.length > 0 && !loading">
          <li
            v-for="(result, index) in results"
            :key="index"
            @click="selectResult(result)"
            class="px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white"
            tabindex="1"
          >
            <div class="flex items-center space-x-4">
              <!-- Poster Image -->
              <div class="relative">
                <img
                  :src="
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w154${result.poster_path}`
                      : result.profile_path
                        ? `https://image.tmdb.org/t/p/w154${result.profile_path}`
                        : noPoster.src
                  "
                  alt="Poster"
                  class="w-24 h-36 object-cover rounded-md"
                />
              </div>

              <!-- Text Information -->
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white">
                  {{ result.title || result.name }}
                  <span v-if="result.release_date">
                    ({{ result.release_date.substring(0, 4) }})
                  </span>
                </h3>
                <p class="text-gray-300 text-sm mt-1 line-clamp-4">
                  {{ result.overview }}
                </p>
                <p class="text-gray-300 text-sm mt-2">
                  <span v-if="result.known_for && result.known_for.length > 0">
                    Known for:
                    <span v-for="(item, i) in result.known_for" :key="i">
                      <span
                        >{{ item.title || item.name }}
                        <span v-if="item.release_date">
                          ({{ item.release_date.substring(0, 4) }})
                        </span>
                      </span>
                      <span v-if="i < result.known_for.length - 1">, </span>
                    </span>
                  </span>
                </p>
              </div>

              <!-- Media Type Icon -->
              <MediaTypeIcon
                :mediaType="
                  searchType === 'multi' ? result.media_type : searchType
                "
                class="ml-2"
              />
            </div>
          </li>
        </ul>
      </template>
    </ZInput>
  </div>
</template>

<script lang="ts">
import { actions } from 'astro:actions';
import type { PropType } from 'vue';
import ZInput from '../global/ZInput.vue';
import noPoster from '../../assets/img/no-poster.svg';
import searchIcon from '../../assets/icons/search.svg';
import spinner from '../../assets/icons/spinner.svg';
import cancelIcon from '../../assets/icons/circle-x.svg';
import MediaTypeIcon from './MediaTypeIcon.vue';

export default {
  name: 'MediaSearch',
  props: {
    modelValue: {
      type: Object as PropType<null | TMDBSearchResult | SimpleMedia>,
      default: null
    },
    searchType: {
      type: String as PropType<TMDBSearchType>,
      default: 'multi'
    },
    number: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  components: {
    ZInput,
    MediaTypeIcon
  },
  data() {
    return {
      query: '',
      results: [] as TMDBSearchResult[],
      loading: false,
      selectedResult: this.modelValue as null | TMDBSearchResult,
      debounceTimeout: null as null | NodeJS.Timeout,
      noPoster,
      searchIcon,
      spinner,
      cancelIcon
    };
  },
  methods: {
    // Debounced version of the search
    debouncedSearch() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout); // Clear the previous timeout if it exists
      }

      // Set a new timeout to handle the search after a delay (300ms in this case)
      this.debounceTimeout = setTimeout(() => {
        this.handleSearch();
      }, 300); // 300ms delay
    },

    async handleSearch() {
      if (!this.query.trim()) {
        this.results = [];
        return;
      }

      this.loading = true;

      const { data, error } = await actions.searchMulti({
        type: this.searchType,
        query: this.query
      });
      if (error) {
        console.error('Error fetching search results:', error);
        this.results = [];
      } else {
        this.results = data.results || [];
      }

      this.loading = false;
    },

    selectResult(result: TMDBSearchResult) {
      this.selectedResult = result;
      this.results = [];
      this.$emit('update:modelValue', this.selectedResult);
    },
    clearSelection() {
      this.query = '';
      this.selectedResult = null;
      this.$emit('update:modelValue', this.selectedResult);
    }
  }
};
</script>
