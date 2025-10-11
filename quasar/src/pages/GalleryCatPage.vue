<template>
  <q-page>
    <GalleryHeroBanner />
    <GalleryCard />
    <SearchReminder />
  </q-page>
</template>

<script setup lang="ts">
import GalleryCard from 'src/components/GalleryCard.vue';
import GalleryHeroBanner from 'src/components/GalleryHeroBanner.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
</script>
