<template>
  <q-page>
    <ContactForm />
    <InstagramProfileEmbed />
  </q-page>
</template>

<script setup lang="ts">
import ContactForm from 'components/ContactForm.vue';
import InstagramProfileEmbed from 'components/InstagramProfileEmbed.vue';
</script>
<style scoped>
q-page {
  background-color: #111;
  color: #fff;
  min-height: 100vh;
}
</style>
