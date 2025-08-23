<script setup lang="ts">
import {
  MDBBtn,
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
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Brand style (static, dark-mode friendly) with green glow
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
      fontSize: '1.5em',
      padding: '0.5em 0',
      boxShadow: '0 6px 32px rgba(0,0,0,0.5)',
      position: 'fixed',
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
            <MDBNavbarItem to="#" active>
              <span class="text-white" style="font-size:1.15em;">Home</span>
            </MDBNavbarItem>
            <MDBNavbarItem href="#">
              <span class="text-white" style="font-size:1.15em;">Gallery</span>
            </MDBNavbarItem>
            <MDBNavbarItem href="#">
              <span class="text-white" style="font-size:1.15em;">About Me</span>
            </MDBNavbarItem>
            <MDBNavbarItem href="#">
              <span class="text-white" style="font-size:1.15em;">Contact</span>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <!-- Brand name -->
          <div class="position-absolute start-50 translate-middle-x">
            <MDBNavbarBrand href="#" :style="{...brandFontStyle, fontSize: '2.85rem'}">Katie De Forest</MDBNavbarBrand>
          </div>
          <!-- Header controls: search + user -->
          <form class="d-flex w-auto justify-content-end me-3 align-items-center">
            <!-- Search bar -->
            <div class="position-relative" style="width: 300px; font-size:0.8em;">
              <input
                type="search"
                class="form-control bg-transparent text-white border-0"
                placeholder="Type query"
                aria-label="Search"
                style="padding-right: 2.2rem; font-size:1.1em; height:2.7em; width:100%;"
              />
              <button
                type="submit"
                aria-label="Search"
                class="position-absolute top-50 end-0 translate-middle-y h-100 border-0 bg-transparent px-2"
              >
                <MDBIcon icon="search" size="lg" class="text-white" />
              </button>
            </div>
          </form>
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
                  <MDBIcon icon="user" class="text-white" />
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
</style>