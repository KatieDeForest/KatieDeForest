
<!-- Quasar version: Remove Material UI imports -->

<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="item in items"
      :key="item.id"
      class="col-12 col-md-6 col-lg-3"
    >
      <q-card :style="{ background: item.color }" class="gallery-shortcut">
        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
          <div class="text-subtitle2">{{ item.description }}</div>
        </q-card-section>
        <!-- Optionally add an image or button here -->
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// Quasar components are auto-imported if using Quasar CLI
import { reactive } from 'vue';

const items = reactive([
	{ id: 1, title: 'Featured Album', description: 'A short intro to the first gallery section.', color: 'linear-gradient(135deg,#2d6a4f,#134e4a)' },
	{ id: 2, title: 'Nature Collection', description: 'A short intro to the second gallery section.', color: 'linear-gradient(135deg,#1b4332,#0f5132)' },
	{ id: 3, title: 'Urban Scenes', description: 'A short intro to the third gallery section.', color: 'linear-gradient(135deg,#40916c,#265b48)' },
	{ id: 4, title: 'Studio Works', description: 'A short intro to the fourth gallery section.', color: 'linear-gradient(135deg,#52b788,#2f8a63)' }
]);
</script>

<style scoped>
.gallery-shortcut { background-color: #111; }
.image-placeholder {
	width: 100%;
	height: 260px;
	background-size: cover;
	background-position: center;
}
@media (min-width: 992px) {
	.image-placeholder { height: 320px; }
}
</style>