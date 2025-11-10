<template>
  <div class="gallery-shortcut-page">
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="gallery-row artistic"
      :class="{ 'reverse': idx % 2 === 1 }"
    >
      <div class="gallery-card-link">
        <div class="gallery-card">
          <div class="gallery-image">
            <q-img
              src="/src/assets/frontpagebanner.jpg"
              :ratio="16/9"
              class="image-placeholder"
              :alt="t(`collections.${item.slug}.name`)"
            />
          </div>
          <div class="gallery-text">
            <div class="text-h3">{{ t(`collections.${item.slug}.name`) }}</div>
            <div class="text-body1">{{ t(`collections.${item.slug}.description`) }}</div>
          </div>
          <!-- Click overlay limited to the card box, not its margins -->
          <router-link
            :to="`/gallery/${item.slug}`"
            class="card-click-overlay"
            :aria-label="t(`collections.${item.slug}.name`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// Store only stable IDs and slugs; render translated text via t() in template so it reacts to locale changes
const items = reactive([
  { id: 1, slug: 'featured-collection' },
  { id: 2, slug: 'nature-collection' },
  { id: 3, slug: 'urban-collection' },
  { id: 4, slug: 'studio-collection' }
]);
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

.gallery-shortcut-page {
  width: 100%;
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
.gallery-card-link {
  display: block;
  width: 70%;
  margin: 0 auto;
  text-decoration: none;
  color: inherit;
}
.gallery-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 320px;
  background: $secondary;
  border-radius: 32px;
  overflow: visible;
  margin: 0 0 42px 0;
  padding: 20px 0px;
  /* 3D effect: strong shadow, subtle border, and transform */
  box-shadow: 0 18px 16px -8px rgba(0,0,0,0.38);
  border: 1.5px solid rgba(255,255,255,0.08);
  transform: perspective(900px) rotateX(4deg) scale(1.01);
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  position: relative; /* for click overlay */
}
.gallery-card:hover {
  box-shadow: 0 32px 16px -14px rgba(0,0,0,0.48);
  transform: perspective(900px) rotateX(0deg) scale(1.025);
}
.gallery-image {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 10px;
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
  /* Concentrate paragraph width without affecting the flex item sizing */
  max-width: 35ch;
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
  .gallery-card-link {
    width: 98vw;
  }
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

// Custom styles for regular and reverse gallery text
.gallery-row.artistic:not(.reverse) .gallery-text {
  text-align: left;
  /* Add more regular-specific styles here */
  /* Create breathing room from the outer (right) edge without shifting layout */
  padding-right: clamp(24px, 6vw, 80px);
}
.gallery-row.artistic.reverse .gallery-text {
  text-align: right;
  /* Add more reverse-specific styles here */
  /* Create breathing room from the outer (left) edge without shifting layout */
  padding-left: clamp(24px, 6vw, 80px);
}
/* Anchor the description block toward the inner edge depending on orientation */
.gallery-row.artistic.reverse .gallery-text .text-body1 { margin-left: auto; margin-right: 0; }
.gallery-row.artistic:not(.reverse) .gallery-text .text-body1 { margin-left: 0; margin-right: 0; }

/* Absolutely positioned link to limit click area strictly to the card box */
.card-click-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  /* Keep it on top but non-obstructive visually */
  z-index: 1;
}
.card-click-overlay:focus-visible {
  outline: 2px solid rgba(255,255,255,0.6);
  outline-offset: 4px;
  border-radius: inherit;
}
</style>