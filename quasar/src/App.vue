<script setup lang="ts">
import 'mdb-vue-ui-kit/css/mdb.min.css';
// App component logic: imports and sets up main layout
import GalleryShortcut from './components/GalleryShortcut.vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroBanner from './components/HeroBanner.vue';
</script>

<template>
<!-- Main app structure: header, hero banner, and main content -->
  <SiteHeader />
  <HeroBanner />
  <GalleryShortcut />
</template>

<style scoped>
/* App component styles: font and layout */
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>

<style>
/* Global page background to match dark header and remove default body margin */
body, html {
  background: #111;
  margin: 0;
  height: 100%;
  overflow-x: hidden;
}
</style>
