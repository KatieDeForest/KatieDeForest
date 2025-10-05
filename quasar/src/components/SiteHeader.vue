<script setup lang="ts">
import {
  MDBIcon,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-vue-ui-kit';
import { ref, computed, watch } from 'vue';
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

// Brand style
const brandFontStyle = computed(() => ({
  fontFamily: 'CustomLeafFont, serif',
  fontWeight: 500,
  fontStyle: 'italic',
  letterSpacing: '0.08em',
  fontSize: '1.9rem',
  color: 'inherit',
  // green glow similar to previous design
  textShadow: '0 2px 0 #222, 0 6px 14px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f',
  WebkitTextStroke: '0.5px #b5ffb5',
  transition: 'color 0.35s, text-shadow 0.35s',
  textTransform: 'none',
}));

const collapse1 = ref(false);
const dropdown3 = ref(false);
const showSearchModal = ref(false);

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
              <span class="text-white" style="font-size:1.15em;">Home</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/gallery" active>
              <span class="text-white" style="font-size:1.15em;">Gallery</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/about">
              <span class="text-white" style="font-size:1.15em;">About Me</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/contact">
              <span class="text-white" style="font-size:1.15em;">Contact</span>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <!-- Brand name -->
          <div class="position-absolute start-50 translate-middle-x">
                <router-link to="/" class="brand-link">
                  <MDBNavbarBrand :style="{...brandFontStyle, fontSize: '2.85rem'}">Katie De Forest</MDBNavbarBrand>
                </router-link>
          </div>
          <!-- Header controls: search + user -->
            <!-- Header controls: search button + user -->
            <div class="d-flex w-auto justify-content-end me-3 align-items-center">
              <button
                class="btn btn-link p-0 me-2"
                aria-label="Open search"
                @click="openSearchModal"
                style="color: #fff; font-size: 1em;"
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
          <!-- User dropdown -->
          <MDBNavbarNav class="d-flex flex-row">
            <MDBNavbarItem class="me-3 me-lg-0 dropdown">
              <MDBDropdown v-model="dropdown3">
                <MDBDropdownToggle
                  tag="a"
                  class="nav-link text-white"
                  @click="dropdown3 = !dropdown3"
                  style="font-size:1.3em;"
                >
                  <MDBIcon icon="user" size="sm" class="text-white" />
                </MDBDropdownToggle>
                <MDBDropdownMenu class="dropdown-menu-dark">
                  <MDBDropdownItem href="#">Login</MDBDropdownItem>
                  <MDBDropdownItem href="#">Create Account</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
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
.btn-link[aria-label="Open search"]:hover,
.btn-link[aria-label="Open search"]:focus {
  color: #b5ffb5 !important;
  background: none !important;
  text-decoration: none !important;
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
</style>