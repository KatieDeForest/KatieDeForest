<template>
  <q-page>
    <GalleryHeroBanner />
    <GalleryCard />
    <GallerySearchReminder />
  </q-page>
</template>

<script setup lang="ts">
import GalleryCard from 'src/components/GalleryCard.vue';
import GalleryHeroBanner from 'src/components/GalleryHeroBanner.vue';
import GallerySearchReminder from 'src/components/GallerySearchReminder.vue';
</script>
