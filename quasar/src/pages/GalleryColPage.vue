<template>
  <q-page>
    <GalleryHeroBanner />
    <GalleryColCard />
    <SearchReminder />
  </q-page>
</template>

<script setup lang="ts">
import GalleryColCard from 'src/components/GalleryColCard.vue';
import GalleryHeroBanner from 'src/components/GalleryHeroBanner.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
</script>
