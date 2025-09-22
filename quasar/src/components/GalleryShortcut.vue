
<!-- Quasar version: Remove Material UI imports -->

<template>
  <div class="gallery-shortcut-page">
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="gallery-row artistic"
      :class="{ 'reverse': idx % 2 === 1 }"
    >
      <div class="gallery-card">
        <div class="gallery-image">
          <q-img
            src="/src/assets/frontpagebanner.jpg"
            spinner-color="white"
            :ratio="16/9"
            class="image-placeholder"
          />
        </div>
        <div class="gallery-text">
          <div class="text-h3">{{ item.title }}</div>
          <div class="text-body1">{{ item.description }}</div>
        </div>
      </div>
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

.gallery-shortcut-page {
  width: 100vw;
  padding: 48px 0 0 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #9a9292;
}
.gallery-row.artistic {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
}
.gallery-row.artistic.reverse .gallery-card {
  flex-direction: row-reverse;
}

.gallery-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1100px;
  width: 80vw;
  min-height: 220px;
  background: #232222;
  box-shadow: 0 4px 32px 0 rgba(224, 73, 73, 0.517);
  border-radius: 22px;
  overflow: visible;
  margin: 0 0 32px 0;
}
.gallery-image {
  flex: 1 1 48%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}
.gallery-text {
  flex: 1 1 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 56px;
  color: #fff;
  min-width: 0;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-size: 1.7rem;
  background: none;
  box-shadow: none;
}
.gallery-text .text-h3 {
  font-size: 2.7rem;
  font-weight: 700;
  margin-bottom: 18px;
}
.gallery-text .text-body1 {
  font-size: 1.45rem;
  font-weight: 400;
  opacity: 0.94;
}
.image-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.12);
}
@media (max-width: 900px) {
  .gallery-card {
    flex-direction: column;
    max-width: 98vw;
    min-height: 140px;
  }
  .gallery-image, .gallery-text {
    padding: 16px;
    min-height: 100px;
  }
  .image-placeholder {
    aspect-ratio: 16/9;
  }
  .gallery-text {
    font-size: 1.2rem;
    padding: 18px 12px;
  }
  .gallery-text .text-h3 {
    font-size: 1.5rem;
  }
  .gallery-text .text-body1 {
    font-size: 1.1rem;
  }
}
</style>