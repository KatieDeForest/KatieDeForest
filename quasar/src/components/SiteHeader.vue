<script setup lang="ts">
import {
  MDBIcon,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from 'mdb-vue-ui-kit';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

// Demo search data (replace with your real search logic)
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
  'Art',
  'Blog'
];

const searchQuery = ref('');
const searchResults: Ref<string[]> = ref([]);

watch(searchQuery, (val) => {
  if (val.trim().length > 0) {
    // Only show results that start with the search query
    const query = val.trim().toLowerCase();
    searchResults.value = allResults.filter(item =>
      item.toLowerCase().startsWith(query)
    );
  } else {
    searchResults.value = [];
  }
});

// NOTE: Replaced JS computed inline style with a CSS class `.brand-text` in the
// <style scoped> block below. If you need to change font family/size or the
// glow effect, edit the .brand-text rules instead of the JS.

const collapse1 = ref(false);
const showSearchModal = ref(false);
const showLanguageModal = ref(false);
const languages = [
  { code: 'en', name: 'English' },
  { code: 'da', name: 'Dansk' },
  { code: 'de', name: 'Deutsch' },
  { code: 'no', name: 'Norsk' },
  { code: 'sv', name: 'Svenska' }
].sort((a, b) => a.name.localeCompare(b.name));
const selectedLanguage = ref('en');
function openLanguageModal() {
  showLanguageModal.value = true;
}
function closeLanguageModal() {
  showLanguageModal.value = false;
}
function selectLanguage(code: string) {
  selectedLanguage.value = code;
  closeLanguageModal();
}

function openSearchModal() {
  showSearchModal.value = true;
  searchQuery.value = '';
  searchResults.value = [];
}
function closeSearchModal() {
  showSearchModal.value = false;
  searchQuery.value = '';
  searchResults.value = [];
}

function onGlobalOpenSearch() {
  openSearchModal();
}

onMounted(() => {
  window.addEventListener('open-search', onGlobalOpenSearch as EventListener);
});
onUnmounted(() => {
  window.removeEventListener('open-search', onGlobalOpenSearch as EventListener);
});
</script>

<template>
  <MDBNavbar
    expand="lg"
    bg="dark"
    container
    :style="{
      transition: 'background-color 0.35s, color 0.35s',
      backgroundColor: '#111',
      color: '#fff',
      fontSize: '1.2em',
      padding: '0.5em 0',
      boxShadow: '0 6px 32px rgba(0,0,0,0.5)',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2000
    }"
  >
      <MDBNavbarToggler
        @click="collapse1 = !collapse1"
        target="#navbarSupportedContent"
      ></MDBNavbarToggler>
      <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <!-- Navigation links -->
          <MDBNavbarNav class="mb-2 mb-lg-0 flex-grow-1">
            <MDBNavbarItem to="/" active>
              <span class="text-white nav-item-text">Home</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/gallery" active>
              <span class="text-white nav-item-text">Gallery</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/about">
              <span class="text-white nav-item-text">About Me</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/contact">
              <span class="text-white nav-item-text">Contact</span>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <!-- Brand name -->
            <div class="position-absolute start-50 translate-middle-x">
            <router-link to="/" class="brand-link">
              <MDBNavbarBrand class="brand-text brand-size-lg">Katie De Forest</MDBNavbarBrand>
            </router-link>
          </div>
          <!-- Header controls: search only -->
          <div class="d-flex w-auto justify-content-end me-3 align-items-center">
            <button
              class="btn btn-link p-0 globe-btn control-btn"
              aria-label="Select language"
              @click="openLanguageModal"
            >
              <MDBIcon icon="globe" size="sm" class="text-white" />
            </button>
            <button
              class="btn btn-link p-0 me-2 control-btn"
              aria-label="Open search"
              @click="openSearchModal"
            >
              <MDBIcon icon="search" size="sm" class="text-white" />
            </button>
          </div>
              <!-- Search Modal -->
              <div v-if="showSearchModal" class="search-modal-overlay">
                  <div class="search-modal-content">
                  <button class="close-btn" @click="closeSearchModal" aria-label="Close search">&times;</button>
                  <input
                    v-model="searchQuery"
                    type="search"
                    class="form-control bg-dark text-white border-0"
                    placeholder="Type your search..."
                    style="font-size:1.2em; margin-bottom: 1em;"
                    autofocus
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
              <!-- Language Modal -->
              <div v-if="showLanguageModal" class="search-modal-overlay">
                  <div class="language-modal-content">
                  <button class="close-btn" @click="closeLanguageModal" aria-label="Close language">&times;</button>
                  <div class="d-flex align-items-center mb-3">
                    <h5 class="mb-0 me-2">Select Language</h5>
                    <span class="manual-translations-label">(Manual Translations)</span>
                  </div>
                  <ul class="list-group">
                    <li
                      v-for="(lang) in languages"
                      :key="lang.code"
                      class="list-group-item bg-dark text-white border-0 d-flex flex-column align-items-stretch language-option"
                      :style="{ cursor: 'pointer', fontWeight: selectedLanguage === lang.code ? 'bold' : 'normal' }"
                      @click="selectLanguage(lang.code)"
                    >
                      <div class="d-flex justify-content-between align-items-center w-100">
                        <span>{{ lang.name }}</span>
                        <span v-if="selectedLanguage === lang.code" style="font-size:1.2em;">
                          <MDBIcon icon="check" size="sm" style="color: #39ff14;" />
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
        </div>
      </MDBCollapse>
    </MDBNavbar>
</template>

<style scoped>
@font-face {
  font-family: 'CustomLeafFont';
  src: url('/fonts/leavesfont.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
.brand-link {
  text-decoration: none !important;
  color: inherit !important;
  all: unset;
  display: inline-block;
  cursor: pointer;
}
/* Brand text class replacing JS style object */
.brand-text {
  font-family: 'CustomLeafFont', serif;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.08em;
  color: inherit;
  text-shadow: 0 2px 0 #222, 0 6px 14px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f;
  -webkit-text-stroke: 0.5px #b5ffb5;
  transition: color 0.35s, text-shadow 0.35s;
  text-transform: none;
  display: inline-block;
}
.brand-size-lg {
  font-size: 2.85rem;
}
.search-modal-content {
  background: #181818;
  padding: 2.5em 2.5em 2.5em 2.5em;
  border-radius: 12px;
  width: 30%;
  height: 50%;
  box-shadow: 0 8px 32px #000a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.search-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.language-modal-content {
  background: #181818;
  padding: 1em 1.2em 1em 1.2em;
  border-radius: 12px;
  width: 30%;
  height: 35%;
  box-shadow: 0 8px 32px #000a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.manual-translations-label {
  font-size: 0.95em;
  color: #aaa;
  font-weight: 400;
  margin-top: 2px;
}
.language-option {
  margin-bottom: 0.2em;
  padding-bottom: 0.2em;
}
.globe-btn:hover,
.globe-btn:focus {
  color: #fff !important;
  background: none !important;
  text-decoration: none !important;
}
.btn-link[aria-label="Open search"]:hover,
.btn-link[aria-label="Open search"]:focus {
  background: none !important;
  text-decoration: none !important;
}
.live-search-results {
  max-height: 220px;
  overflow-y: auto;
  margin-top: -0.5em;
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
.close-btn {
  position: absolute;
  top: 0.1em;
  right: 0.1em;
  width: 36px;
  height: 36px;
  padding: 0;
  background: none;
  border: none;
  color: #b5ffb5;
  font-size: 2em;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
}
/* Custom spacing for globe (language) button */
.globe-btn {
  margin-right: 1.2em;
}
.nav-item-text {
  font-size: 1.15em;
  color: inherit;
  /* softer green glow similar to brand but reduced intensity */
  text-shadow: 0 1px 0 #222, 0 3px 8px rgba(0,0,0,0.7), 0 0 6px rgba(57,255,20,0.45);
  -webkit-text-stroke: 0.25px rgba(181,255,181,0.85);
  transition: color 0.25s, text-shadow 0.25s;
}
.nav-item-text:hover {
  /* slightly increase glow on hover */
  text-shadow: 0 1px 0 #222, 0 4px 12px rgba(0,0,0,0.75), 0 0 8px rgba(57,255,20,0.6);
}

/* Shared control buttons (globe, search) use same softer brand glow */
.control-btn {
  color: inherit;
  font-size: 1em;
  background: none !important;
  border: none;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 0 #222, 0 3px 8px rgba(0,0,0,0.7), 0 0 6px rgba(57,255,20,0.45);
  -webkit-text-stroke: 0.25px rgba(181,255,181,0.85);
  transition: color 0.25s, text-shadow 0.25s;
}
.control-btn:hover,
.control-btn:focus {
  text-shadow: 0 1px 0 #222, 0 4px 12px rgba(0,0,0,0.75), 0 0 8px rgba(57,255,20,0.6);
  color: inherit;
}
</style>