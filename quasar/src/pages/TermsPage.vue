<template>
  <q-page class="terms-page">
    <TermsHeroBanner />
    <TermsContent />
  </q-page>
</template>

<script setup lang="ts">
import TermsHeroBanner from 'components/TermsHeroBanner.vue';
import TermsContent from 'components/TermsContent.vue';
</script>

<style scoped>
.terms-page { background: var(--q-primary); min-height: 100vh; }
</style>
