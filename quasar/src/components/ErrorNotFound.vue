<template>
  <div class="error-wrapper">
      <div class="error-header">{{ title }}</div>

      <div class="error-description">{{ description }}</div>

      <!-- Small live-search so 404 visitors can look around without using header icon -->
      <div class="error-search">
        <input
          v-model="searchQuery"
          type="search"
          class="error-search-input"
          placeholder="Search the site..."
          aria-label="Search the site"
        />

        <div v-if="searchQuery.trim().length > 0" class="live-search-results">
          <div v-if="searchResults.length === 0" class="text-muted px-2 py-1">No results found.</div>
          <ul v-else class="list-group">
            <li v-for="result in searchResults" :key="result" class="list-group-item bg-dark text-white border-0">
              {{ result }}
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
}>(), {
  title: '404: Page not found',
  description: 'Oops. Nothing here...'
});

const { title, description } = props;

// Reuse the header's demo search data and logic for the 404 search bar
const allResults = [
  'Gallery',
  'About Me',
  'Contact',
  'Featured Album',
  'Nature Collection',
  'Urban Scenes',
  'Studio Works',
  'Photography',
  'Phone',
  'Phone',
  'Phone',
  'Phone',
  'Phone',
  'Phone',
  'Phone',
  'Art',
  'Blog'
];

const searchQuery = ref('');
const searchResults: Ref<string[]> = ref([]);

watch(searchQuery, (val) => {
  if (val.trim().length > 0) {
    const q = val.trim().toLowerCase();
    searchResults.value = allResults.filter(item => item.toLowerCase().startsWith(q));
  } else {
    searchResults.value = [];
  }
});
</script>

<style scoped lang="scss">
.error-wrapper {
  height: 100%;
  align-items: center;
  text-align: center;
  background-color: $primary;
  color: #ffffff;
  padding: 16px;
}

.error-header {
  box-sizing: border-box;
  font-size: 5vh;
}

.error-description {
  font-size: 2vh;
  opacity: 0.4;
}

/* Button styles for the 404 page (replicate unelevated white button with blue text) */
.error-btn {
  margin-top: 1.25rem; /* approximate q-mt-xl */
  background: #ffffff;
  color: #027be3; /* quasar blue */
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-transform: none; /* replicate no-caps */
  box-shadow: none; /* unelevated */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.error-btn:hover,
.error-btn:focus {
  background: #f4f4f4;
}

.error-search {
  margin-top: 1.25rem;
  width: 100%;
  max-width: 540px;
}
.error-search-input {
  width: 100%;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #121212;
  color: #fff;
  font-size: 1rem;
}
.live-search-results {
  max-height: 40vh;
  overflow-y: auto;
  margin-top: 0.5em;
}
.live-search-results ul {
  padding-left: 0;
  margin-bottom: 0;
}
.live-search-results .list-group-item {
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 0.5em;
  border-radius: 8px;
  background: #232323 !important;
  border: 1px solid #333;
  box-shadow: 0 2px 8px #0002;
  padding: 0.75em 1em;
  font-size: 1.1em;
}
.live-search-results .list-group-item:hover {
  background: #222 !important;
}
</style>
