<template>
  <div class="gallery-category-grid">
    <div class="category-header q-mb-lg">
      <div class="text-h4">{{ displayName }}</div>
      <div class="text-subtitle2 text-grey-6">Photos for the "{{ displayName }}" collection</div>
    </div>

    <div class="photo-grid">
      <q-card v-for="img in images" :key="img" class="photo-card q-hoverable" style="width: 100%; max-width: 320px; cursor: pointer;">
        <q-img :src="img" ratio="4/3" />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
// Import the asset so Vite resolves the correct URL at build/dev time
import frontpageBanner from 'src/assets/frontpagebanner.jpg';

const route = useRoute();
const category = (route.params.category as string) || '';

const toTitleCase = (s: string) => s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
const displayName = category ? toTitleCase(category) : 'Gallery';

const singleAsset = frontpageBanner;

const categoryImages: Record<string, string[]> = {
  'featured-album': Array(6).fill(singleAsset),
  'nature-collection': Array(6).fill(singleAsset),
  'urban-scenes': Array(6).fill(singleAsset),
  'studio-works': Array(6).fill(singleAsset),
};

const fallback = Array(6).fill(singleAsset);

const images = categoryImages[category] || fallback;
</script>

<style scoped lang="scss">
.gallery-category-grid {
  width: 100%;
  max-width: 1100px;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
}

.photo-card {
  border-radius: 12px;
  overflow: hidden;
}

.category-header {
  text-align: left;
}
</style>
