<template>
  <q-page class="about-page">
    <AboutHeroBanner />
    <AboutBio />
    <AboutGearList />
    <AboutCTA />
  </q-page>
</template>

<script setup lang="ts">
import AboutHeroBanner from 'src/components/AboutHeroBanner.vue';
import AboutBio from 'src/components/AboutBio.vue';
import AboutGearList from 'src/components/AboutGearList.vue';
import AboutCTA from 'src/components/AboutCTA.vue';
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.about-page {
  display: flex;
  flex-direction: column;
  background: #0b0d0b;
}

.about-page section {
  width: 100%;
}
</style>
