<template>
  <section class="about-cta">
    <div class="cta-inner">
      <h2 class="cta-title">Explore the Collections</h2>
      <p class="cta-desc">Dive deeper into themed bodies of work—seasonal studies, quiet waters, and abstract
        botanicals. Limited edition prints available.</p>
      <div class="cta-actions">
        <q-btn color="accent" unelevated to="/gallery" label="Browse Gallery" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.about-cta {
  background: #0f1410;
  padding: 4rem 1rem 4.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.about-cta:before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(70, 170, 120, 0.23), transparent 70%);
  pointer-events: none;
}

.cta-inner {
  max-width: 900px;
  margin: 0 auto;
  color: #f4f7f4;
}

.cta-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-desc {
  font-size: 1.05rem;
  line-height: 1.55;
  opacity: 0.9;
  max-width: 680px;
  margin: 0 auto 2rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
