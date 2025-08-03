<script setup lang="ts">
// App component logic: imports and sets up main layout
import Header from './Header.vue';
import HeroBanner from './HeroBanner.vue';
</script>

<template>
<!-- Main app structure: header, hero banner, and main content -->
  <Header style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000;" />
  <HeroBanner />
  <h1>You did it!</h1>

</template>

<style scoped>
/* App component styles: font and layout */
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
