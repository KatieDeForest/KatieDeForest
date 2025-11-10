<template>
  <q-page>
    <CollectionHeroBanner />
    <CollectionCard />
    <SearchReminder />
  </q-page>
</template>

<script setup lang="ts">
import CollectionCard from 'src/components/CollectionCard.vue';
import CollectionHeroBanner from 'src/components/CollectionHeroBanner.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
</script>
