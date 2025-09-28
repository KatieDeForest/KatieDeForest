<script setup lang="ts">
import 'mdb-vue-ui-kit/css/mdb.min.css';
// App component logic: imports and sets up main layout
import GalleryShortcut from './components/GalleryShortcut.vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroBanner from './components/HeroBanner.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <SiteHeader />
  <HeroBanner />
  <GalleryShortcut />
  <SiteFooter />
</template>

<style scoped>
/* App component styles: font and layout */
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>

<style>
body, html {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
}
</style>
