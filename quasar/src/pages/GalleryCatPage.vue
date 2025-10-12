<template>
  <q-page>
    <GalleryHeroBanner />
    <GalleryCatCard />
    <SearchReminder />
  </q-page>
</template>

<script setup lang="ts">
import GalleryCatCard from 'src/components/GalleryCatCard.vue';
import GalleryHeroBanner from 'src/components/GalleryHeroBanner.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
</script>
