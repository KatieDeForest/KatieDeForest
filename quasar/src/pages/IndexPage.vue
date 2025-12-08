<template>
  <q-page class="index-page">
    <MainHeroBanner />
    <MainShortcut />
    <HomeCTA />
    <ScrollToTop />
  </q-page>
</template>

<script setup lang="ts">
import MainHeroBanner from 'components/MainHeroBanner.vue';
import MainShortcut from 'components/MainShortcut.vue';
import ScrollToTop from 'components/ScrollToTop.vue';
import HomeCTA from 'components/HomeCTA.vue';
</script>

<style scoped>
.index-page { background: var(--q-primary); min-height: 100vh; }
</style>
