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
import { reactive } from 'vue';

const items = reactive([
  { id: 1, title: 'Featured Album', description: 'A short intro to the first gallery section.' },
  { id: 2, title: 'Nature Collection', description: 'A short intro to the second gallery section.' },
  { id: 3, title: 'Urban Scenes', description: 'A short intro to the third gallery section.' },
  { id: 4, title: 'Studio Works', description: 'A short intro to the fourth gallery section.' }
]);
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

.gallery-shortcut-page {
  width: 100vw;
  padding: 48px 0 0 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $primary;
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
  width: 70%;
  min-height: 320px;
  background: #181818; 
  box-shadow: 0 8px 20px 0 rgb(211, 209, 209);
  border-radius: 32px;
  overflow: visible;
  margin: 0 0 32px 0;
  padding: 40px 48px;
}
.gallery-image {
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 16px;
}
.gallery-text {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 24px;
  color: #fff;
  min-width: 0;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-size: 1.7rem;
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
  width: 90%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.12);
  margin: auto;
}
@media (max-width: 900px) {
  .gallery-card {
    flex-direction: column;
    max-width: 98vw;
    min-height: 180px;
    padding: 16px 8px;
  }
  .gallery-image, .gallery-text {
    padding: 8px;
    min-height: 100px;
  }
  .image-placeholder {
    width: 98%;
    aspect-ratio: 16/9;
  }
  .gallery-text {
    font-size: 1.2rem;
    padding: 12px 8px;
  }
  .gallery-text .text-h3 {
    font-size: 1.5rem;
  }
  .gallery-text .text-body1 {
    font-size: 1.1rem;
  }
}
</style>