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
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MessageLanguages } from 'src/boot/i18n';
import SearchModal from './SearchModal.vue';

// Modal-specific reveal timers moved to SearchModal component
// separate timers for the language modal reveal so we don't mix with search timers
// const _langRevealTimers: number[] = []; // legacy (unused)

// searchResults is now computed from searchQuery; no manual watcher required.

// Reveal animation handled inside SearchModal

// NOTE: Replaced JS computed inline style with a CSS class `.brand-text` in the
// <style scoped> block below. If you need to change font family/size or the
// glow effect, edit the .brand-text rules instead of the JS.

const collapse1 = ref(false);
const { t, locale } = useI18n();
const showSearchModal = ref(false);
// const showLanguageModal = ref(false); // legacy (unused after toggle)
// Simplified language support: toggle between Danish ('da') and English ('en')
// const languages = [ { code: 'da', name: 'Dansk' }, { code: 'en', name: 'English' } ]; // legacy (unused)

const STORAGE_KEY = 'app:locale';

// Identity mapping for current locales; keep compatibility for any stored 'en-US'
function codeToLocale(code: string): string {
  // Accept legacy 'en-US' input but normalize to 'en'
  if (code === 'en-US') return 'en';
  return code;
}
function localeToCode(loc: string): string {
  if (loc === 'en-US') return 'en';
  return loc;
}

const selectedLanguage = ref(localeToCode(String(locale.value)) || 'en');
function toggleLanguage() {
  const next = selectedLanguage.value === 'da' ? 'en' : 'da';
  selectedLanguage.value = next;
  const target = codeToLocale(next);
  locale.value = target as MessageLanguages;
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
}

// Body scroll is disabled while the search modal is open

function openSearchModal() {
  showSearchModal.value = true;
  // search state handled inside SearchModal; manage body scroll only
  // Prevent the main page from scrolling while the modal is open. The modal
  // itself (teleported to body) contains `.live-search-results` which already
  // has `overflow-y: auto` so it can scroll independently.
  try {
    document.body.style.overflow = 'hidden';
  } catch {
    /* ignore */
  }

  // Focus management is handled inside SearchModal
}

// Search UI moved to SearchModal component

function onGlobalOpenSearch() {
  // The call returns a Promise (async function). It's intentionally not awaited
  // because the event handler should not block. Mark it with `void` to
  // satisfy the `@typescript-eslint/no-floating-promises` rule.
  void openSearchModal();
}

onMounted(() => {
  window.addEventListener('open-search', onGlobalOpenSearch as EventListener);
  // initialize from storage if present
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const normalized = codeToLocale(stored);
      selectedLanguage.value = normalized;
      locale.value = normalized as MessageLanguages;
    }
  } catch { /* ignore */ }
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

// Legacy watcher removed (language modal no longer used)
// Mark typing as idle only after a short delay; animations run only when idle
// Idle typing handling moved to SearchModal
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
      boxShadow: '0 6px 32px rgba(0,0,0,0.65), 0 10px 50px rgba(66,150,112,0.32), 0 24px 50px rgba(0,0,0,0.45)',
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
              <span class="text-white nav-item-text">{{ t('nav.home') }}</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/gallery" active>
              <span class="text-white nav-item-text">{{ t('nav.gallery') }}</span>
            </MDBNavbarItem>
              <MDBNavbarItem to="/services">
                <span class="text-white nav-item-text">{{ t('nav.services') }}</span>
              </MDBNavbarItem>
            <MDBNavbarItem to="/about">
              <span class="text-white nav-item-text">{{ t('nav.about') }}</span>
            </MDBNavbarItem>
            <MDBNavbarItem to="/contact">
              <span class="text-white nav-item-text">{{ t('nav.contact') }}</span>
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
            <!-- Language toggle: Danish / English (flags directly in header) -->
            <div
              class="lang-toggle"
              :aria-label="t('aria.selectLanguage')"
              role="button"
              @click="toggleLanguage"
            >
              <span class="half left" :class="{ active: selectedLanguage === 'da', inactive: selectedLanguage !== 'da' }">
                <span class="flag-wrap"><span class="flag fi fi-dk" aria-hidden="true"></span></span>
                <span class="sr-only">Danish</span>
              </span>
              <span class="half right" :class="{ active: selectedLanguage === 'en', inactive: selectedLanguage !== 'en' }">
                <span class="flag-wrap"><span class="flag fi fi-us" aria-hidden="true"></span></span>
                <span class="sr-only">English</span>
              </span>
            </div>
            <button
              class="control-btn"
              :aria-label="t('aria.openSearch')"
              @click="openSearchModal"
            >
              <MDBIcon icon="search" size="sm" class="text-white" />
            </button>
          </div>
              <SearchModal v-model="showSearchModal" />
              <!-- Language Modal removed: using simple toggle button -->
        </div>
      </MDBCollapse>
    </MDBNavbar>
</template>

<style scoped lang="scss">
/* Flag icons CSS (lightweight CDN). If you later bundle locally, remove this import
  and include the package styles globally. */
@import url('https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/css/flag-icons.min.css');
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
  z-index: 5; /* ensure brand stays above decorative seams */
}
/* `.brand-link` removed — styles consolidated into `.brand-text` */
.language-modal-content {
  background: #181818;
  padding: 1em 1.2em;
  border-radius: 12px;
  /* Scale modal size with viewport while keeping sensible min/max bounds.
     - Width grows with viewport (vw) but is clamped between a minimum and maximum.
     - Typography also scales a little using clamp(). */
  /* match search modal width exactly */
  width: min(520px, 94%);
  max-width: 640px;
  box-shadow: 0 8px 32px #000a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  /* disable visual scaling so width matches search modal exactly */
  --lang-scale: 1;
  transform-origin: center;
  transform: none;
  max-height: 78vh; /* keep within viewport */
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
  font-size: 1.35em; /* slightly larger */
  background: none !important;
  border: none;
  margin-right: 12px;
  padding: 10px;
  min-width: 48px; /* bigger touch target */
  min-height: 48px; /* bigger touch target */
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

/* Language toggle button */
.lang-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-right: 10px;
  position: relative;
  overflow: visible;   /* allow soft glow/shadow not to be clipped */
  transition: transform 160ms ease; /* match search button timing */
  will-change: transform;
}
.lang-toggle:hover,
.lang-toggle:focus-within {
  transform: translateY(-2px); /* same lift as .control-btn hover */
}
.lang-toggle .half {
  width: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: filter 160ms ease, opacity 160ms ease;
  position: relative;
}
.lang-toggle .half.left { justify-content: flex-end; }
.lang-toggle .half.right { justify-content: flex-start; }
.lang-toggle .half.left { margin-right: -15px; }
.lang-toggle .half.right { margin-left: -15px; }
.lang-toggle .half.left .flag {
  /* Cut only the inner diagonal (preserve outer corners) */
  -webkit-clip-path: polygon(0% 0%, 99% 0%, 6% 100%, 0% 100%); /* tweak for sharper diagonal */
  clip-path: polygon(0% 0%, 94% 0%, 6% 100%, 0% 100%);
  will-change: clip-path;
  position: relative;
  border-top-left-radius: 8px; /* maintain outer corner rounding on actual flag */
}
.lang-toggle .half.right .flag {
  -webkit-clip-path: polygon(2% 100%, 94% 0%, 100% 0%, 100% 100%); /* matching tweak */
  clip-path: polygon(3% 100%, 94% 0%, 100% 0%, 100% 100%);
  will-change: clip-path;
  position: relative;
  border-bottom-right-radius: 8px; /* maintain outer corner rounding on actual flag */
}

.lang-toggle .flag-wrap {
  width: 36px;
  height: 24px;
  display: block;
  position: relative;
  overflow: visible;
  transition: filter 160ms ease;
  z-index: 1;
  /* baseline subtle glow */
  filter: drop-shadow(0 0 1px rgba(57,255,20,0.45));
}
.lang-toggle .half.left .flag-wrap { border-radius: 10px 0 0 0; }
.lang-toggle .half.right .flag-wrap { border-radius: 0 0 10px 0; }

/* intensify glow when hovering or focusing the toggle */
.lang-toggle:hover .flag-wrap,
.lang-toggle:focus-within .flag-wrap { filter: drop-shadow(0 0 3px rgba(57,255,20,0.5)); }

.lang-toggle .half.inactive .flag { filter: grayscale(100%); }
/* Ensure active flag keeps color (override any inheritance) */
.lang-toggle .half.active .flag { filter: none; }
.lang-toggle .flag {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 0; /* keep diagonal edge crisp */
  will-change: clip-path;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>
