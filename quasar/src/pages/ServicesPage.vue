<template>
  <q-page class="services-page">
    <ServicesHeroBanner />
    <ServicesContent />
    <ServicesCTA />
  </q-page>
</template>

<script setup lang="ts">
import ServicesHeroBanner from 'components/ServicesHeroBanner.vue';
import ServicesContent from 'components/ServicesContent.vue';
import ServicesCTA from 'components/ServicesCTA.vue';
</script>
