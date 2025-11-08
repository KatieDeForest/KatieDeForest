<template>
  <q-page>
    <GalleryHeroBanner />
    <GalleryGrid />
    <SearchReminder />
    <ScrollToTop />
  </q-page>
</template>

<script setup lang="ts">
import GalleryHeroBanner from 'src/components/GalleryHeroBanner.vue';
import GalleryGrid from 'src/components/GalleryGrid.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
import ScrollToTop from 'components/ScrollToTop.vue';
</script>
