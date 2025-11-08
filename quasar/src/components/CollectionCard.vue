<script setup lang="ts">
import { useRouter } from 'vue-router';
import frontpageBanner from 'src/assets/frontpagebanner.jpg';
import useCollections from 'src/composables/useCollections';

const router = useRouter();
const { collections, slugify } = useCollections();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// attach an image per collection for the card view (keeps data DRY)
const cardCollections = collections.map((c) => ({ ...c, image: frontpageBanner }));
</script>

<template>
  <div class="gallery-page q-pa-xl column">
    <!-- <h1 class="text-h3 q-mb-lg">Main Gallery collections</h1> -->
    <div class="gallery-cards">
      <div v-for="col in cardCollections" :key="col.slug" class="gallery-card">
        <q-card class="gallery-card-outer q-hoverable" style="width: 100%; max-width: 350px; cursor: pointer;"
          @click="router.push(`/gallery/${slugify(col.name)}`)">
          <div class="gallery-info-box">
            <div class="text-h5">{{ t(`collections.${col.slug}.name`) || col.name }}</div>
          </div>
          <div class="gallery-card-img-wrapper">
            <q-img :src="col.image" ratio="16/9" class="gallery-card-img" />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery-page {
  min-height: 100vh;
  background: $primary;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4.0rem;
}

.gallery-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 1fr));
  gap: 3rem;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  perspective: 1200px;
}

.gallery-card {
  display: block;
  width: 100%;
  max-width: 420px;
  justify-self: start;
}

.gallery-card-outer {
  position: relative;
  padding-top: 0;
  background: #232323;
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 #0007, 0 1.5px 8px 0 $accent;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s cubic-bezier(.25, 1.25, .5, 1.05);
  will-change: transform, box-shadow;
  transform-style: preserve-3d;
}

.gallery-card-outer:hover {
  box-shadow: 0 0 48px 16px $accent, 0 8px 32px #0006;
  transform: scale(1.07) translateZ(32px);
}

.gallery-info-box {
  background: $secondary;
  color: #ffffff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 12px #0003;
  padding: 0.5em 1.5em 0.5em 1.5em;
  width: 100%;
  text-align: left;
  font-size: 1.15em;
  font-weight: 500;
  position: relative;
  z-index: 2;
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
}

.gallery-info-box .text-h5 {
  font-size: 1.35em;
  font-weight: 700;
}



.gallery-card-img-wrapper {
  width: 100%;
  border-radius: 0 0 22px 22px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.gallery-card-img {
  width: 100%;
  min-height: 240px;
  object-fit: cover;
  display: block;
}
</style>
