<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { MDBIcon } from 'mdb-vue-ui-kit';

const items = [
  { id: 1, img: '/src/assets/frontpagebanner.jpg' },
  { id: 2, img: '/src/assets/frontpagebanner.jpg' },
  { id: 3, img: '/src/assets/frontpagebanner.jpg' },
  { id: 4, img: '/src/assets/frontpagebanner.jpg' },
  { id: 5, img: '/src/assets/frontpagebanner.jpg' }
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
  <section class="hero d-flex align-items-center justify-content-center">
    <div class="slides w-100 d-flex align-items-center justify-content-center">
  <div class="slides-inner position-relative w-100 d-flex align-items-center justify-content-center" :style="{ height: slidesHeight }">
        <template v-for="(item, idx) in items" :key="item.id">
          <div
            :class="['slide', positionFor(idx)]"
            style="background: #222;"
            role="img"
          >
            <img
              :src="item.img"
              alt="Slide image"
              class="slide-img"
            />
            <!-- arrows inside images -->
            <button class="carousel-arrow left btn btn-link text-white" @click="prev" aria-label="Previous slide">
              <MDBIcon icon="chevron-left" size="2x" class="text-white" />
            </button>
            <button class="carousel-arrow right btn btn-link text-white" @click="next" aria-label="Next slide">
              <MDBIcon icon="chevron-right" size="2x" class="text-white" />
            </button>
            <!-- Only show the row of dots on the active slide -->
            <div v-if="positionFor(idx) === 'active'" class="slide-dots-fixed d-flex justify-content-center align-items-center">
              <span
                v-for="(dot, dotIdx) in items"
                :key="'dot-fixed-' + dot.id"
                :class="['slide-dot', { 'slide-dot-fixed': true, active: dotIdx === current }]"
                @click="current = dotIdx"
                aria-label="Go to slide"
              ></span>
            </div>
          </div>
        </template>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';
.hero {
  padding-top: 0rem;
  background: $primary;
}
.slides-inner {
  max-width: 60%;
  perspective: 1000px;
  overflow: show;
}
.slide {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  transform-origin: center center;
  width: 90%;
  height: 70%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 14px rgba(0,0,0,0.5);
  transition: transform 700ms cubic-bezier(.2,.9,.2,1), opacity 450ms ease, filter 450ms ease;
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
  z-index: 1000;
  color: #120202;
}

.carousel-arrow.left { left: 1rem; }
.carousel-arrow.right { right: 1rem; }
// ...existing code...
.carousel-arrow:hover { background: rgba(0,0,0,0.28); }

.slide-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: 12px;
}

@media (max-width: 992px) {
  .slides-inner { max-width: 100%; }
  .slide { width: 92%; }
  .slide .slide-content { max-width: 80%; }
}
.slide-dot {
  display: inline-block;
  margin: 0 0.22em;
  border-radius: 50%;
  background: #181818;
  opacity: 0.7;
  transition: all 0.25s cubic-bezier(.2,.9,.2,1);
  cursor: pointer;
  width: 0.75em;
  height: 0.75em;
  box-shadow: 0 2px 8px #000a;
  border: 1px solid #fff;
}
.slide-dot .slide-dot-active-on-slide {
  position: absolute;
  left: 50%;
  bottom: 0.5rem;
  transform: translateX(-50%);
  width: 1.1em;
  height: 1.1em;
  opacity: 1;
  background: #222;
  box-shadow: 0 4px 16px #000c;
  z-index: 2002;
  pointer-events: none;
}
.slide-dots-fixed {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  z-index: 2001;
  width: 100%;
  pointer-events: auto;
}
.slide-dot.slide-dot-fixed.active {
  background: #222;
  opacity: 1;
  width: 1em;
  height: 1em;
  box-shadow: 0 2px 8px #000c;
}
</style>
