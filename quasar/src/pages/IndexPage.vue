<template>
  <q-page class="index-page">
    <IndexHeroBanner />
    <IndexShortcut />
    <IndexCTA />
    <ScrollToTop />
  </q-page>
</template>

<script setup lang="ts">
import IndexHeroBanner from 'components/IndexHeroBanner.vue';
import IndexShortcut from 'components/IndexShortcut.vue';
import ScrollToTop from 'components/ScrollToTop.vue';
import IndexCTA from 'components/IndexCTA.vue';
</script>

<style scoped>
.index-page { background: var(--q-primary); min-height: 100vh; }
</style>
