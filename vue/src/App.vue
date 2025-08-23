<script setup lang="ts">
// App component logic: imports and sets up main layout
import GalleryShortcut from './GalleryShortcut.vue';
import Header from './Header.vue';
import HeroBanner from './HeroBanner.vue';
</script>

<template>
<!-- Main app structure: header, hero banner, and main content -->
  <Header />
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
