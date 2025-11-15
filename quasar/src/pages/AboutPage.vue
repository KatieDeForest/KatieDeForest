<template>
  <q-page class="about-page">
    <AboutHeroBanner />
    <AboutBio />
    <AboutGearList />
    <AboutCTA />
  </q-page>
</template>

<script setup lang="ts">
import AboutHeroBanner from 'src/components/AboutHeroBanner.vue';
import AboutBio from 'src/components/AboutBio.vue';
import AboutGearList from 'src/components/AboutGearList.vue';
import AboutCTA from 'src/components/AboutCTA.vue';
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.about-page {
  display: flex;
  flex-direction: column;
  background: #0b0d0b;
}

.about-page section {
  width: 100%;
}

/* High-resolution caps: keep width fluid (86%) but limit max readable span */
@media (min-width: 1600px) {

  /* large desktop */
  :deep(.about-bio-inner) {
    transform: scale(1.06);
    transform-origin: top center;
    width: calc(86% / 1.06);
    max-width: calc(1400px / 1.06);
    grid-template-columns: clamp(260px, 22vw, 380px) 1fr;
  }

  :deep(.gear-inner) {
    max-width: 1200px;
  }

  :deep(.gear-list) {
    padding: 1rem 1rem 4rem;
  }

  :deep(.about-bio-inner .section-title),
  :deep(.gear-list .section-title) {
    font-size: 2rem;
  }

  :deep(.about-bio-inner .bio-section)::before {
    font-size: 0.85rem;
    padding: 0.25rem 0.65rem;
    top: -0.9rem;
    /* lifted to avoid clipping at larger font */
  }

  :deep(.gear-list .gear-item) {
    font-size: 1.05rem;
    padding: 1.1rem;
  }

  :deep(.gear-list .desc) {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  :deep(.gear-list .q-icon) {
    font-size: 26px;
  }
}

@media (min-width: 2000px) {

  /* 2K / big monitors */
  :deep(.about-bio-inner) {
    transform: scale(1.06);
    transform-origin: top center;
    width: calc(86% / 1.06);
    max-width: calc(1500px / 1.06);
    grid-template-columns: clamp(270px, 22vw, 400px) 1fr;
  }

  :deep(.gear-inner) {
    max-width: 1300px;
  }

  :deep(.gear-list) {
    padding: 1rem 1rem 4rem;
  }

  :deep(.about-bio-inner .section-title),
  :deep(.gear-list .section-title) {
    font-size: 2.1rem;
  }

  :deep(.about-bio-inner .bio-section)::before {
    font-size: 0.9rem;
    padding: 0.28rem 0.7rem;
    top: -0.95rem;
  }

  :deep(.gear-list .gear-item) {
    font-size: 1.08rem;
    padding: 1.2rem;
  }

  :deep(.gear-list .desc) {
    font-size: 0.98rem;
    line-height: 1.5;
  }

  :deep(.gear-list .q-icon) {
    font-size: 28px;
  }
}

@media (min-width: 2500px) {

  /* 1440p / 2.5K+ */
  :deep(.about-bio-inner) {
    transform: scale(1.06);
    transform-origin: top center;
    width: calc(86% / 1.06);
    max-width: calc(1500px / 1.06);
    grid-template-columns: clamp(280px, 22vw, 420px) 1fr;
  }

  :deep(.gear-inner) {
    max-width: 1300px;
  }

  :deep(.gear-list) {
    padding: 1rem 1rem 4rem;
  }

  :deep(.about-bio-inner .section-title),
  :deep(.gear-list .section-title) {
    font-size: 2.2rem;
  }

  :deep(.about-bio-inner .bio-section)::before {
    font-size: 0.95rem;
    padding: 0.3rem 0.75rem;
    top: -1rem;
  }

  :deep(.gear-list .gear-item) {
    font-size: 1.1rem;
    padding: 1.3rem;
  }

  :deep(.gear-list .desc) {
    font-size: 1rem;
    line-height: 1.5;
  }

  :deep(.gear-list .q-icon) {
    font-size: 30px;
  }
}

@media (min-width: 3000px) {

  /* ultrawide */
  :deep(.about-bio-inner) {
    transform: scale(1.06);
    font-size: 1.5rem;
    transform-origin: top center;
    width: calc(86% / 1.06);
    max-width: calc(1800px / 1.06);
    grid-template-columns: clamp(300px, 22vw, 440px) 1fr;
  }

  :deep(.gear-inner) {
    max-width: 1600px;
  }

  :deep(.gear-list) {
    padding: 1rem 1rem 4rem;
  }

  :deep(.about-bio-inner .section-title),
  :deep(.gear-list .section-title) {
    font-size: 2.3rem;
  }

  :deep(.about-bio-inner .bio-section)::before {
    font-size: 1.05rem;
    padding: 0.2rem 0.8rem;
    top: -1.1rem;
  }

  :deep(.gear-list .gear-item) {
    font-size: 1.5rem;
    padding: 1.4rem;
  }

  :deep(.gear-list .desc) {
    font-size: 1.5rem;
    line-height: 1.55;
  }

  :deep(.gear-list .q-icon) {
    font-size: 32px;
  }
}

@media (min-width: 3440px) {

  /* ultrawide */
  :deep(.about-bio-inner) {
    transform: scale(1.06);
    transform-origin: top center;
    width: calc(86% / 1.06);
    max-width: calc(1600px / 1.06);
    grid-template-columns: clamp(320px, 22vw, 460px) 1fr;
  }

  :deep(.gear-inner) {
    max-width: 1600px;
  }

  :deep(.gear-list) {
    padding: 1rem 1rem 4rem;
  }

  :deep(.about-bio-inner .section-title),
  :deep(.gear-list .section-title) {
    font-size: 2.4rem;
  }

  :deep(.about-bio-inner .bio-section)::before {
    font-size: 1.1rem;
    padding: 0.38rem 0.85rem;
    top: -1.1rem;
  }

  :deep(.gear-list .gear-item) {
    font-size: 1.15rem;
    padding: 1.5rem;
  }

  :deep(.gear-list .desc) {
    font-size: 1.2rem;
    line-height: 1.55;
  }

  :deep(.gear-list .q-icon) {
    font-size: 34px;
  }
}
</style>
