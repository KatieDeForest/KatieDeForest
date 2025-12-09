<template>
  <q-page class="policy-page">
    <PrivacyHeroBanner />
    <PrivacyContent />
  </q-page>
</template>

<script setup lang="ts">
import PrivacyHeroBanner from 'components/PrivacyHeroBanner.vue';
import PrivacyContent from 'components/PrivacyContent.vue';
</script>

<style scoped>
.policy-page { background: var(--q-primary); min-height: 100vh; }
</style>
