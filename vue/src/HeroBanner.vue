<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { MDBIcon } from 'mdb-vue-ui-kit';

// Simple placeholder items (colors + label). Replace with real images later.
const items = [
  { id: 1, label: 'Placeholder 1', color: '#2d6a4f' },
  { id: 2, label: 'Placeholder 2', color: '#1b4332' },
  { id: 3, label: 'Placeholder 3', color: '#40916c' },
  { id: 4, label: 'Placeholder 4', color: '#52b788' },
  { id: 5, label: 'Placeholder 5', color: '#74c69d' }
];

const current = ref(0);
const n = items.length;

// dynamic sizing to exactly fill the viewport under the fixed header
const headerHeight = ref(0);
const slidesHeight = ref('60vh');

function updateHeights() {
  const nav = document.querySelector('nav') || document.querySelector('.navbar');
  headerHeight.value = nav ? Math.round(nav.getBoundingClientRect().height) : 80;
  const gap = 0; // no extra breathing room so slides fill remaining viewport
  slidesHeight.value = `calc(100vh - ${headerHeight.value + gap}px)`;
}

onMounted(() => {
  updateHeights();
  window.addEventListener('resize', updateHeights);
});
onUnmounted(() => window.removeEventListener('resize', updateHeights));

function prev() {
  current.value = (current.value - 1 + n) % n;
}

function next() {
  current.value = (current.value + 1) % n;
}

// helper to determine position class for each slide
function positionFor(index: number) {
  const diff = (index - current.value + n) % n;
  if (diff === 0) return 'active';
  if (diff === 1) return 'next';
  if (diff === n - 1) return 'prev';
  return 'behind';
}

</script>

<template>
  <section class="hero bg-dark d-flex align-items-center justify-content-center" :style="{ marginTop: headerHeight + 'px' }">
    <div class="slides w-100 d-flex align-items-center justify-content-center">
  <div class="slides-inner position-relative w-100 d-flex align-items-center justify-content-center" :style="{ height: slidesHeight }">
        <template v-for="(item, idx) in items" :key="item.id">
          <div
            :class="['slide', positionFor(idx)]"
            :style="{ background: `linear-gradient(135deg, ${item.color}, rgba(0,0,0,0.25))` }"
            role="img"
            :aria-label="item.label"
          >
            <div class="slide-content text-white text-center px-3">
              <h2 class="display-4 fw-bold">{{ item.label }}</h2>
              <p class="lead opacity-75">This is a placeholder slide — replace with an image or component.</p>
            </div>
            <!-- arrows inside images -->
            <button class="carousel-arrow left btn btn-link text-white" @click="prev" aria-label="Previous slide">
              <MDBIcon icon="chevron-left" />
            </button>
            <button class="carousel-arrow right btn btn-link text-white" @click="next" aria-label="Next slide">
              <MDBIcon icon="chevron-right" />
            </button>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Component-local styles only; uses utility classes where possible. */
.hero {
  /* small visual breathing room; header spacing is handled by marginTop */
  padding-top: 0rem;
}
.slides-inner {
  max-width: 1500px;
  perspective: 1000px;
  overflow: show; /* prevent transformed slides from creating page horizontal scroll */
}
.slide {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  transform-origin: center center;
  width: 100%;
  height: 80%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  transition: transform 550ms cubic-bezier(.2,.9,.2,1), opacity 450ms ease, filter 450ms ease;
  opacity: 0;
  z-index: 10;
}
.slide .slide-content { max-width: 60%; }
.slide.active {
  transform: translate(-50%, -50%) translateZ(0) scale(1.15);
  opacity: 1;
  z-index: 70;
  filter: none;
}
.slide.next {
  transform: translate(calc(-50% + 55%), -50%) translateZ(-120px) scale(0.7);
  opacity: 0.45;
  z-index: 45;
  filter: blur(0.6px) saturate(0.9) brightness(0.9);
}
.slide.prev {
  transform: translate(calc(-50% - 55%), -50%) translateZ(-120px) scale(0.7);
  opacity: 0.45;
  z-index: 45;
  filter: blur(0.6px) saturate(0.9) brightness(0.9);
}
.slide.behind {
  transform: translate(-50%, -50%) translateZ(-360px) scale(0.6);
  opacity: 0.16;
  z-index: 20;
  filter: blur(3px) saturate(0.7) brightness(0.65);
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(0,0,0,0.18);
  backdrop-filter: blur(4px);
}
.carousel-arrow.left { left: 1rem; }
.carousel-arrow.right { right: 1rem; }
.carousel-arrow:hover { background: rgba(0,0,0,0.28); }

@media (max-width: 992px) {
  .slides-inner { max-width: 100%; }
  .slide { width: 92%; }
  .slide .slide-content { max-width: 80%; }
}
</style>
