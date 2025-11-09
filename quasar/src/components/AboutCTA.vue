<template>
  <section class="about-cta" aria-labelledby="about-cta-title">
    <div class="cta-inner">
      <h2 id="about-cta-title" class="cta-title">Explore My Collections</h2>
      <p class="cta-desc">Dive deeper into themed bodies of work—seasonal studies, quiet waters, and abstract
        botanicals.</p>
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
  padding: 12rem 1rem 2rem;
  /* large top padding so gradient finishes before content */
  text-align: center;
  position: relative;
  overflow: visible;
  margin-top: 0;
  z-index: 1;
  /* ensure CTA (and its content) paints above the previous section's fade */
}

/* Unified top seam blend (Field Kit -> CTA) using combined radial + linear layers */
.about-cta::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  /* top region only */
  height: 220px;
  /* tall enough to hide seam without mid hotspot */
  /* Pure linear blend that starts exactly at $primary (#222222) to match Field Kit, no radial/tint at the very top */
  background: linear-gradient(to bottom,
      #222222 0%,
      #222222 42%,
      #1b1f1c 62%,
      #141914 78%,
      #0f1410 100%);
  pointer-events: none;
  z-index: 0;
}

/* Subtle background depth accent (very low opacity) */
/* Removed radial accent to avoid any top-center half-moon effect */

.cta-inner {
  max-width: 900px;
  margin: 0 auto;
  color: #f4f7f4;
  position: relative;
  z-index: 2;
  /* ensure content sits above the blend layers */
}

.cta-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
}

.cta-title:after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  margin: 0.75rem auto 0;
  background: linear-gradient(90deg, rgba(70, 170, 120, 0), rgba(70, 170, 120, 0.6), rgba(70, 170, 120, 0));
  border-radius: 2px;
  opacity: 0.8;
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

/* Tweak spacing on smaller screens so it doesn't push content too far down */
@media (max-width: 700px) {
  .about-cta {
    padding-top: 8rem;
    padding-bottom: 3.75rem;
  }
}
</style>
