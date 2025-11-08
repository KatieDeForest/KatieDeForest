<template>
  <q-page>
    <ErrorNotFound/>
    <SearchReminder/>
  </q-page>
</template>

<style scoped lang="scss">
.q-page {
  height: 100%;
  position: relative; /* allow absolutely-positioned children to center without changing layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: $primary;
  background-color: $primary;
}

/* When the main content is absolutely positioned (removed from flow),
   ensure the remaining (last) child — typically SearchReminder — stays
   pinned to the bottom by giving it auto top margin. */
.q-page > *:last-child {
  margin-top: auto;
}
</style>


<script setup lang="ts">
import ErrorNotFound from 'src/components/ErrorNotFound.vue';
import SearchReminder from 'src/components/SearchReminder.vue';
</script>
