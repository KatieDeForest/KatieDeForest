<script setup lang="ts">
import {
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
// Header component logic: navigation, branding, dark mode, dropdowns
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-vue-ui-kit';
import { ref, computed } from 'vue';

// This computed style object is used to apply the custom font and styling to the brand name in the template.
// The text shadow changes depending on dark or light mode for better contrast.
const brandFontStyle = computed(() => ({
  fontFamily: 'CustomLeafFont, serif',
  fontWeight: 500,
  fontStyle: 'italic',
  letterSpacing: '0.08em',
  fontSize: '1.9rem',
  color: 'inherit',
  textShadow: darkMode.value
    // More visible green glow for dark mode
    ? '0 2px 0 #222, 0 4px 8px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f'
    // Enhanced green glow for light mode to match dark mode vibrancy
    : '0 2px 0 #b5d0a0, 0 4px 8px #1a3a1a, 0 0 8px #39ff14, 0 0 2px #7fff7f',
  WebkitTextStroke: darkMode.value
    ? '0.5px #b5ffb5'
    : '0.5px #1a3a1a',
  transition: 'color 0.35s, text-shadow 0.35s',
  textTransform: 'none',
}));

const collapse1 = ref(false);
const dropdown1 = ref(false);
const dropdown3 = ref(false);
const darkMode = ref(true);
const animating = ref(false);
const sunActive = ref(false);
const moonActive = ref(true);

function toggleDarkMode() {
  if (animating.value) return;
  animating.value = true;
  if (!darkMode.value) {
    // Sun slides out, moon slides in
    sunActive.value = false;
    moonActive.value = true;
  } else {
    // Moon slides out, sun slides in
    sunActive.value = true;
    moonActive.value = false;
  }
  setTimeout(() => {
    darkMode.value = !darkMode.value;
    animating.value = false;
  }, 350);
}
</script>

<template>
  <MDBNavbar
    expand="lg"
    :light="!darkMode"
    :dark="darkMode"
    :bg="darkMode ? 'dark' : 'light'"
    container
    :style="{
      transition: 'background-color 0.35s, color 0.35s',
      backgroundColor: darkMode ? 'rgba(34,34,34,0.2)' : 'rgba(255,255,255,0.2)',
      color: darkMode ? '#fff' : '#222',
      backdropFilter: 'blur(2px)',
      fontSize: '1.5em',
      padding: '0.5em 0'
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
            <MDBNavbarItem to="#" active>
              <span style="font-size:1.15em;">Home</span>
            </MDBNavbarItem>
            <MDBNavbarItem href="#">
              <span style="font-size:1.15em;">Gallery</span>
            </MDBNavbarItem>
            <MDBNavbarItem href="#">
              <span style="font-size:1.15em;">About Me</span>
            </MDBNavbarItem>
            <MDBNavbarItem href="#">
              <span style="font-size:1.15em;">Contact</span>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <!-- Brand name -->
          <div class="position-absolute start-50 translate-middle-x">
            <MDBNavbarBrand href="#" :style="{...brandFontStyle, fontSize: '2.85rem'}">Katie De Forest</MDBNavbarBrand>
          </div>
          <!-- Header controls -->
          <form class="d-flex w-auto justify-content-end me-3 align-items-center">
            <!-- Dark mode toggle -->
            <div class="me-3 position-relative" style="width: 40px; height: 40px;">
              <span
                class="icon-anim position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                :class="[
                  !darkMode && sunActive ? 'icon-visible' : '',
                  animating && !darkMode ? 'slide-out' : '',
                  animating && darkMode ? 'slide-in' : ''
                ]"
                style="z-index:2; cursor:pointer;"
                @click="!animating && toggleDarkMode()"
                aria-label="Toggle dark mode"
              >
                <MDBIcon icon="sun" size="lg" :style="!darkMode ? 'color: #ffe066; filter: drop-shadow(0 0 4px #ffe066); font-size:1.5em;' : 'font-size:1.5em;'" />
              </span>
              <span
                class="icon-anim position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                :class="[
                  darkMode && moonActive ? 'icon-visible' : '',
                  animating && darkMode ? 'slide-out' : '',
                  animating && !darkMode ? 'slide-in' : ''
                ]"
                style="z-index:2; cursor:pointer;"
                @click="!animating && toggleDarkMode()"
                aria-label="Toggle dark mode"
              >
                <MDBIcon icon="moon" size="lg" :style="darkMode ? 'color: #fffbe6; filter: drop-shadow(0 0 2px #fffbe6); font-size:1.5em;' : 'font-size:1.5em;'" />
              </span>
            </div>
            <!-- Search bar -->
            <div class="position-relative" style="width: 300px; font-size:0.8em;">
              <input
                type="search"
                class="form-control"
                placeholder="Type query"
                aria-label="Search"
                style="padding-right: 2.2rem; font-size:1.1em; height:2.7em; width:100%;"
              />
              <button
                type="submit"
                aria-label="Search"
                class="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent px-2"
                style="height: 100%; font-size:1.0em;"
              >
                <MDBIcon icon="search" size="lg" />
              </button>
            </div>
          </form>
          <!-- User dropdown -->
          <MDBNavbarNav class="d-flex flex-row">
            <MDBNavbarItem class="me-3 me-lg-0 dropdown">
              <MDBDropdown v-model="dropdown3">
                <MDBDropdownToggle
                  tag="a"
                  class="nav-link"
                  @click="dropdown3 = !dropdown3"
                  style="font-size:1.3em;"
                >
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
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
/* Header component styles */
.bg-dark{
  --mdb-bg-opacity: 0.8;
}
.bg-light{
  --mdb-bg-opacity: 0.7;
}
.icon-anim {
  transition: opacity 0.25s, transform 0.6s;
  opacity: 0;
  transform: translateX(0);
  pointer-events: none;
}
.icon-visible {
  opacity: 1;
  pointer-events: auto;
}
.slide-out {
  opacity: 0;
  transform: translateX(80px);
  pointer-events: none;
  z-index: 0 !important;
}
.slide-in {
  opacity: 0;
  transform: translateX(-60px);
  pointer-events: none;
}
/*
  This @font-face rule loads the custom font file and makes it available as 'CustomLeafFont'.
  The brandFontStyle computed property above then uses this font for the brand name.
*/
@font-face {
  font-family: 'CustomLeafFont';
  src: url('/fonts/leavesfont.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
</style>