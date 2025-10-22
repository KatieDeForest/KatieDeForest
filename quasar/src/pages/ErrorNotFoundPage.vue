<template>
  <q-page>
    <ErrorNotFound/>
    <SearchReminder/>
  </q-page>
</template>

<style scoped lang="scss">
.q-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: $primary;
  background-color: $primary;
}
</style>


<script setup lang="ts">
import ErrorNotFound from 'src/components/ErrorNotFound.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
</script>
