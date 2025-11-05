<script setup lang="ts">
// import { onMounted } from 'vue';

// onMounted(() => {
//   // Disable right-click
//   document.addEventListener('contextmenu', e => e.preventDefault());
//   // Disable text selection
//   document.addEventListener('selectstart', e => e.preventDefault());
// });
import 'mdb-vue-ui-kit/css/mdb.min.css';
import SiteHeader from 'components/SiteHeader.vue';
import SiteFooter from 'components/SiteFooter.vue';
</script>

<template>
  <q-layout view="lhh lpr lff">
    <q-header elevated>
      <SiteHeader/>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <SiteFooter/>
    </q-footer>
  </q-layout>
</template>

<style scoped>
/* App component styles: font and layout */
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  user-select: none;
}
</style>

