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
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue';

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
// Derive searchResults from searchQuery using a computed — clearer and more
// idiomatic than manually syncing a ref via a watcher.
const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return [] as string[];
  return allResults.filter(item => item.toLowerCase().startsWith(q));
});

// template ref for the search input so we can programmatically focus it
const searchInput = ref<HTMLInputElement | null>(null);

// timers for JS-driven staggered reveal (cleared when modal closes)
const _revealTimers: number[] = [];
// separate timers for the language modal reveal so we don't mix with search timers
const _langRevealTimers: number[] = [];

// searchResults is now computed from searchQuery; no manual watcher required.

// When searchResults changes, add a JS-driven staggered 'revealed' class to each item
watch(searchResults, async (val) => {
  // clear any pending timers first
  while (_revealTimers.length) {
    const t = _revealTimers.pop();
    if (t) clearTimeout(t);
  }

  if (!val || val.length === 0) return;

  // wait for DOM to update
  await nextTick();

  const items = document.querySelectorAll('.live-search-results .list-group-item');
  // remove any existing revealed classes
  items.forEach(i => i.classList.remove('revealed'));

  // stagger adding 'revealed' via setTimeout — small gaps to avoid heavy parallel work
  const gap = 90; // ms between items (match CSS nth-child delays)
  items.forEach((el, idx) => {
    const t = window.setTimeout(() => {
      (el as HTMLElement).classList.add('revealed');
    }, idx * gap);
    _revealTimers.push(t);
  });
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
  // prevent background scroll when language modal opens (coordinate with search modal)
  try {
    if (_prevBodyOverflow === null) _prevBodyOverflow = document.body.style.overflow || null;
    document.body.style.overflow = 'hidden';
  } catch {
    /* ignore */
  }
}
function closeLanguageModal() {
  showLanguageModal.value = false;
  // only restore body scroll if no other modal (search) is open
  try {
    if (!showSearchModal.value) {
      if (_prevBodyOverflow === null) {
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = _prevBodyOverflow;
      }
      _prevBodyOverflow = null;
    }
  } catch {
    /* ignore */
  }
}
function selectLanguage(code: string) {
  selectedLanguage.value = code;
  closeLanguageModal();
}

// Save previous body overflow so we can restore it when the modal closes
let _prevBodyOverflow: string | null = null;

async function openSearchModal() {
  showSearchModal.value = true;
  searchQuery.value = '';
  // Prevent the main page from scrolling while the modal is open. The modal
  // itself (teleported to body) contains `.live-search-results` which already
  // has `overflow-y: auto` so it can scroll independently.
  try {
    _prevBodyOverflow = document.body.style.overflow || null;
    document.body.style.overflow = 'hidden';
  } catch {
    _prevBodyOverflow = null;
  }

  // wait for DOM to render the input, then focus it for immediate typing
  await nextTick();
  if (searchInput.value) {
    try {
      searchInput.value.focus();
      // select any prefilled text (usually empty) so typing replaces it
      searchInput.value.select();
    } catch {
      // ignore focus errors (some browsers may block focus in certain contexts)
    }
  }
}

function closeSearchModal() {
  showSearchModal.value = false;
  searchQuery.value = '';
  // restore page scroll
  try {
    if (_prevBodyOverflow === null) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = _prevBodyOverflow;
    }
    _prevBodyOverflow = null;
  } catch {
    /* ignore */
  }

  // cleanup any pending reveal timers and classes
  while (_revealTimers.length) {
    const t = _revealTimers.pop();
    if (t) clearTimeout(t);
  }
  const items = document.querySelectorAll('.live-search-results .list-group-item');
  items.forEach(i => i.classList.remove('revealed'));
  // blur the input to release any focus when closing
  if (searchInput.value) {
    try { searchInput.value.blur(); } catch { /* ignore */ }
  }
}

function onGlobalOpenSearch() {
  // The call returns a Promise (async function). It's intentionally not awaited
  // because the event handler should not block. Mark it with `void` to
  // satisfy the `@typescript-eslint/no-floating-promises` rule.
  void openSearchModal();
}

onMounted(() => {
  window.addEventListener('open-search', onGlobalOpenSearch as EventListener);
});
onUnmounted(() => {
  window.removeEventListener('open-search', onGlobalOpenSearch as EventListener);
  // restore body overflow if component is destroyed while modal open
  try {
    if (document && document.body) {
      document.body.style.overflow = '';
    }
  } catch {
    /* ignore */
  }
});

// Watcher to create the same staggered 'revealed' animation for language items
watch(showLanguageModal, async (open) => {
  // clear any pending language timers first
  while (_langRevealTimers.length) {
    const t = _langRevealTimers.pop();
    if (t) clearTimeout(t);
  }

  if (!open) {
    // remove revealed classes when closed
    const items = document.querySelectorAll('.language-modal-content .list-group-item');
    items.forEach(i => i.classList.remove('revealed'));
    return;
  }

  // wait for DOM to render
  await nextTick();
  const items = document.querySelectorAll('.language-modal-content .list-group-item');
  items.forEach(i => i.classList.remove('revealed'));

  const gap = 90;
  items.forEach((el, idx) => {
    const t = window.setTimeout(() => {
      (el as HTMLElement).classList.add('revealed');
    }, idx * gap);
    _langRevealTimers.push(t);
  });
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
          <div class="brand-wrapper">
            <router-link to="/" class="brand-text">
              <MDBNavbarBrand class="brand-text">Katie De Forest</MDBNavbarBrand>
            </router-link>
          </div>
          <!-- Header controls: search only -->
          <div class="d-flex w-auto justify-content-end align-items-center">
            <button
              class="control-btn"
              aria-label="Select language"
              @click="openLanguageModal"
            >
              <MDBIcon icon="globe" size="sm" class="text-white" />
            </button>
            <button
              class="control-btn"
              aria-label="Open search"
              @click="openSearchModal"
            >
              <MDBIcon icon="search" size="sm" class="text-white" />
            </button>
          </div>
              <!-- Search Modal (teleported to body so it overlays entire page) -->
              <teleport to="body" v-if="showSearchModal">
                <div class="search-modal-overlay">
                  <div class="search-modal-content">
                    <button class="close-btn" @click="closeSearchModal" aria-label="Close search">&times;</button>
                    <input
                      ref="searchInput"
                      v-model="searchQuery"
                      type="search"
                      class="form-control"
                      placeholder="Type your search..."
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
              </teleport>
              <!-- Language Modal (teleported to body) -->
              <teleport to="body" v-if="showLanguageModal">
                <div class="search-modal-overlay">
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
              </teleport>
        </div>
      </MDBCollapse>
    </MDBNavbar>
</template>

<style scoped lang="scss">
@font-face {
  font-family: 'CustomLeafFont';
  src: url('/fonts/leavesfont.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
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
  margin: 0px;
  padding: 0px;
  font-size: 2.85rem;
  line-height: 1; /* prevent extra vertical spacing */
}
/* Brand wrapper centers the brand and keeps its hitbox tight */
.brand-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block; /* shrink-to-fit */
  padding: 0;
  margin: 0;
  line-height: 1;
}
/* `.brand-link` removed — styles consolidated into `.brand-text` */
.search-modal-content {
  background: #181818;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  width: min(520px, 86%);
  max-width: 520px;
  height: auto;
  max-height: calc(100vh - 7rem); /* leave a bit more space from top */
  box-shadow: 0 8px 48px #000a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  /* keep modal content contained */
  overflow: hidden;
}

.live-search-results .list-group-item {
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 520ms ease-out, transform 520ms ease-out;
  will-change: transform, opacity;
}

/* JS-driven revealed state (added by watcher) */
.live-search-results .list-group-item.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger items for top-to-bottom flow (small gaps to avoid heavy parallel work) */
.live-search-results .list-group-item:nth-child(1) { animation-delay: 80ms; }
.live-search-results .list-group-item:nth-child(2) { animation-delay: 120ms; }
.live-search-results .list-group-item:nth-child(3) { animation-delay: 160ms; }
.live-search-results .list-group-item:nth-child(4) { animation-delay: 200ms; }
.live-search-results .list-group-item:nth-child(5) { animation-delay: 240ms; }
.live-search-results .list-group-item:nth-child(6) { animation-delay: 280ms; }
.live-search-results .list-group-item:nth-child(7) { animation-delay: 320ms; }
.live-search-results .list-group-item:nth-child(8) { animation-delay: 360ms; }
.live-search-results .list-group-item:nth-child(9) { animation-delay: 400ms; }
.live-search-results .list-group-item:nth-child(10) { animation-delay: 440ms; }

.search-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: flex-start; /* align to top */
  justify-content: center;
  padding-top: 5rem; /* space from the very top - nudged down a bit */
  z-index: 3000;
  will-change: opacity;
  animation: liveContainerFade 300ms ease-out both;
}

@keyframes liveContainerFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.search-modal-content .form-control {
  border-radius: 8px;
  color: white;
  background-color: $primary;
  width: 97%;      /* visual box width */
  max-width: 100%;   /* stay responsive on small screens */
  padding: 0.5rem 1rem; /* slightly tighter padding without changing font */
  margin: 0 auto;    /* center inside the modal */
  margin-left: 0rem; /* push the search input down inside the modal for breathing room */
  font-size: inherit; /* keep font size unchanged */
  box-sizing: border-box;
  transition: box-shadow 240ms ease, border-color 200ms ease;
  will-change: box-shadow, border-color;
}
/* Focus styles for search input use the project's $light-accent color */
.search-modal-content .form-control:focus {
  outline: none;
  box-shadow: 0 0 0 0.15rem rgba($light-accent, 0.18), 0 0 12px rgba($light-accent, 0.25);
  border-color: $light-accent;
}
/* Attempt to style browser autofill background on supported browsers */
.search-modal-content .form-control:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px $primary inset;
  box-shadow: 0 0 0px 1000px $primary inset;
  -webkit-text-fill-color: #ffffff;
}
.language-modal-content {
  background: #181818;
  padding: 1em 1.2em;
  border-radius: 12px;
  /* Scale modal size with viewport while keeping sensible min/max bounds.
     - Width grows with viewport (vw) but is clamped between a minimum and maximum.
     - Typography also scales a little using clamp(). */
  /* keep a stable base width so scaling visually enlarges the modal without making it wider */
  width: min(420px, 92%);
  box-shadow: 0 8px 32px #000a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  /* scale visually on larger monitors while keeping the modal's intrinsic width stable.
     --lang-scale is 1 on typical viewports and grows above 1 on wide screens; it's clamped
     to a reasonable maximum. We then scale the element and compensate internal max-heights
     so the scaled result never exceeds the viewport. */
  --lang-scale: clamp(1, calc(100vw / 1600), 1.6);
  transform-origin: center;
  transform: scale(var(--lang-scale));
  max-height: calc(78vh / var(--lang-scale)); /* keep scaled modal within viewport */
  font-size: clamp(0.95rem, 1.0vw, 1.25rem);
}

/* Make the language list scrollable and prevent items from wrapping or reflowing when zooming */
.language-modal-content .list-group {
  padding-left: 0;
  margin: 0;
  overflow-y: auto;
  /* compensate for the scale so the visible list area fits inside the viewport */
  max-height: calc((78vh - 5.2rem) / var(--lang-scale));
}

.language-modal-content .language-option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.language-modal-content .list-group-item {
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 520ms ease-out, transform 520ms ease-out;
  will-change: transform, opacity;
  cursor: pointer;
  margin-bottom: 0.5em;
  border-radius: 8px;
  background: #232323 !important;
  border: 1px solid #333;
  box-shadow: 0 2px 8px #0002;
  padding: 0.75em 1em;
  font-size: 1.1em;
}
.language-modal-content .list-group-item.revealed {
  opacity: 1;
  transform: translateY(0);
}
.language-modal-content .list-group-item:hover {
  background: mix($light-accent, #3a3a3a, 12%) !important;
  border-color: rgba($light-accent, 0.18);
  box-shadow: 0 2px 8px #0002, inset 0 0 10px rgba($light-accent, 0.06);
}
.manual-translations-label {
  font-size: 0.95em;
  color: #aaa;
  font-weight: 400;
  margin-top: 2px;
}
.live-search-results {
  max-height: 40%;
  overflow-y: auto;
  margin-top: 0.75rem;
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
  /* Add a subtle green tint on hover using the project's light accent */
  background: mix($light-accent, #3a3a3a, 12%) !important;
  border-color: rgba($light-accent, 0.18);
  box-shadow: 0 2px 8px #0002, inset 0 0 10px rgba($light-accent, 0.06);
}
.close-btn {
  position: absolute;
  top: 0em;
  right: 0em;
  width: 28px;
  height: 28px;
  padding: 0;
  background: none;
  border: none;
  color: #b5ffb5;
  font-size: 1.75em;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 80; /* above modal */
}
.nav-item-text {
  font-size: 1.15em;
  color: inherit;
  /* softer green glow similar to brand but reduced intensity */
  text-shadow: 0 1px 0 #222, 0 3px 8px rgba(0,0,0,0.7), 0 0 6px rgba(57,255,20,0.45);
  -webkit-text-stroke: 0.25px rgba(181,255,181,0.85);
  display: inline-block; /* allow transform without shifting layout */
  transition: color 0.22s ease, text-shadow 0.22s ease, transform 160ms ease;
}
.nav-item-text:hover {
  /* slightly increase glow on hover */
  text-shadow: 0 1px 0 #222, 0 4px 12px rgba(0,0,0,1), 0 0 8px rgba(57,255,20,1);
  transform: translateY(-2px);
}
/* Shared control buttons (globe, search) use same softer brand glow */
.control-btn {
  color: inherit;
  font-size: 1.2em;
  background: none !important;
  border: none;
  margin-right: 10px;
  padding: 8px;
  min-width: 40px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 0 #222, 0 3px 8px rgba(0,0,0,0.7), 0 0 6px rgba(57,255,20,0.45);
  -webkit-text-stroke: 0.25px rgba(181,255,181,0.85);
  transition: color 0.22s ease, text-shadow 0.22s ease, transform 160ms ease;
  will-change: transform, text-shadow;
}
.control-btn:hover,
.control-btn:focus {
  text-shadow: 0 1px 0 #222, 0 4px 12px rgba(0,0,0,1), 0 0 8px rgba(57,255,20,1);
  color: inherit;
  transform: translateY(-2px);
}
</style>