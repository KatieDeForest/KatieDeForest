<template>
  <div class="collection-bg">
    <div class="collection-page q-pa-lg">
      <div class="photo-grid" aria-live="polite">
        <div
          v-for="(item, idx) in collectionImages"
          :key="idx"
          class="photo-item q-hoverable"
          role="button"
          tabindex="0"
          @click="openLightbox(idx)"
          @keyup.enter="openLightbox(idx)"
          @keyup.space="openLightbox(idx)"
        >
          <img
            :src="item.thumbUrl || item.url"
            :alt="item.title || `Image ${idx + 1} of ${displayName}`"
            loading="lazy"
            class="photo-item__img"
          />

          <!-- Heart overlay (grid) -->
          <div class="heart-overlay" role="group" aria-label="Like control">
            <span class="grid-like-count" :class="{ pulse: gridPulseForIndex(idx) }">
              {{ totalLikesForIndex(idx) }}
            </span>
            <q-btn
              flat
              dense
              color="white"
              size="sm"
              class="like-heart-btn"
               :class="{ pulse: gridPulseForIndex(idx), liked: isIndexLiked(idx) }"
              :icon="isIndexLiked(idx) ? 'favorite' : 'favorite_border'"
              :aria-pressed="isIndexLiked(idx) ? 'true' : 'false'"
              :aria-label="heartAriaLabel(idx)"
              @click.stop="onGridToggleLike(idx)"
              @keyup.enter.stop="onGridToggleLike(idx)"
              @keyup.space.stop.prevent="onGridToggleLike(idx)"
            />
          </div>
        </div>
      </div>

      <!-- Lightbox Dialog -->
      <q-dialog v-model="isLightboxOpen" maximized persistent transition-show="slide-up" transition-hide="slide-down">
  <div class="lightbox-container" :class="{ 'info-collapsed': isInfoCollapsed }">
          <div class="lightbox-toolbar">
            <q-btn flat color="white" icon="close" aria-label="Close" @click="closeLightbox" />
            <div class="lightbox-title">{{ displayName }}</div>
            <div class="lightbox-spacer"></div>
            <div class="lightbox-like">
              <span class="lightbox-like-count" :class="{ pulse: likePulse }">{{ totalLikesCurrent }}</span>
              <q-btn
                flat
                color="white"
                :icon="isCurrentLiked ? 'favorite' : 'favorite_border'"
                :aria-pressed="isCurrentLiked ? 'true' : 'false'"
                :aria-label="isCurrentLiked ? 'Unlike this image' : 'Like this image'"
                class="like-heart-btn"
                 :class="{ pulse: likePulse, liked: isCurrentLiked }"
                @click="toggleLikeCurrent"
              />
            </div>
          </div>

          <div class="lightbox-content">
            <button class="nav-btn prev" aria-label="Previous" @click="prev" :disabled="!hasPrev">‹</button>
            <img :src="currentFullImage" :alt="currentAlt" class="lightbox-img" />
            <button class="nav-btn next" aria-label="Next" @click="next" :disabled="!hasNext">›</button>
          </div>

          <div class="lightbox-info-wrap">
            <div
              id="lightbox-info"
              class="lightbox-info q-pa-md"
              :class="{ collapsed: isInfoCollapsed }"
              role="region"
              :aria-hidden="isInfoCollapsed"
            >
              <button
                class="info-toggle"
                :aria-expanded="!isInfoCollapsed"
                :title="isInfoCollapsed ? 'Show details' : 'Hide details'"
                @click="toggleInfo"
                @keyup.enter="toggleInfo"
                @keyup.space="toggleInfo"
              >
                <span class="toggle-arrow" :class="{ up: isInfoCollapsed }">▾</span>
              </button>

              <div class="info-left">
                <div class="text-body2 meta-line">
                  <span>ISO {{ currentISO }}</span>
                  <span>·</span>
                  <span>{{ currentAperture }}</span>
                  <span>·</span>
                  <span>{{ currentShutter }}</span>
                  <span>·</span>
                  <span>{{ currentFocal }}</span>
                </div>
              </div>
              <div class="info-center">
                <div class="title">{{ currentTitle }}</div>
                <div class="count">Image {{ currentIndex + 1 }} of {{ collectionImages.length }}</div>
              </div>
              <div class="info-right" aria-label="Color Theme">
                <div class="palette">
                  <div
                    v-for="(c, i) in currentColors"
                    :key="i"
                    class="swatch"
                    :style="{ background: c }"
                    role="button"
                    tabindex="0"
                    :aria-label="`Show hex and RGB color codes ${c}`"
                    @click="showHexCode(i)"
                    @keyup.enter="showHexCode(i)"
                    @keyup.space="showHexCode(i)"
                  >
                    <span class="hex-bubble" :class="{ show: hexCodeVisible[i] }">
                      <span class="hex-line">{{ displayHex(c) }}</span>
                      <span class="rgb-line" v-if="displayRgb(c)">{{ displayRgb(c) }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const data = ref(null)

const accessToken = '6da5f6a26b0e6f924915b1ff5e259e8b1d4b8f0a14c4789e60fec9f4c31e56fecac73d0802ae61c784b6643d69ff9418be2395bcedfd42d78a941adf724c8c22408c2dce452d5992a45a9aae0d3a38914f6734b562eed540615aa923a0e01b1ec5fb362d8088bde2aefe8d720c5aa17fa123eb50e8068206ece6504fc11c1b3d';
api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

async function fetchAlbum() {

  try {
    const response = await api.get('/api/photos?filters[collection][Title][$eq]=Nature&populate=*')
    data.value = response.data;
  }
  catch (error) {
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Error fetching album data',
      icon: 'report_problem'
    })
    console.log('Error fetching album data:', error);
  }
}

onMounted(async () => {
  await fetchAlbum()
  console.log('Data is now available outside try/catch:', JSON.stringify(data.value));
})
const route = useRoute();

// current collection from route
const collection = computed(() => (route.params.collection as string) || '');

// simple title case for header
const toTitleCase = (s: string) => s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
const displayName = computed(() => (collection.value ? toTitleCase(collection.value) : 'Collection'));

type ImageMeta = {
  url: string; // legacy main url
  thumbUrl?: string; // smaller grid image
  fullUrl?: string; // higher-res for lightbox
  title: string;
  iso: number;
  aperture: string; // e.g., f/2.8
  shutter: string;  // e.g., 1/125s
  focalLength: string; // e.g., 50mm
  colors: string[]; // up to 4 hex/rgb
};

// per-collection visible placeholders with basic EXIF-like metadata and color theme
const makeCollectionPlaceholders = (slug: string): ImageMeta[] => {
  const apertures = ['f/1.8', 'f/2', 'f/2.8', 'f/4', 'f/5.6'];
  const shutters = ['1/60s', '1/125s', '1/250s', '1/500s', '1/1000s'];
  const focals = ['24mm', '35mm', '50mm', '85mm', '135mm'];
  const palettes = [
    ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c'],
    ['#1b4332', '#2d6a4f', '#40916c', '#95d5b2'],
    ['#003049', '#d62828', '#f77f00', '#fcbf49'],
    ['#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00'],
    ['#2d3142', '#4f5d75', '#bfc0c0', '#ef8354'],
  ];
  const seed = encodeURIComponent(slug || 'collection');
  return Array.from({ length: 12 }, (_, i) => {
    const aperture = apertures[i % apertures.length] ?? 'f/2.8';
    const shutter = shutters[i % shutters.length] ?? '1/125s';
    const focal = focals[i % focals.length] ?? '50mm';
    const colors = palettes[i % palettes.length] ?? ['#444', '#666', '#888', '#aaa'];
    return {
      url: `https://picsum.photos/seed/${seed}-${i}/1600/900`,
      thumbUrl: `https://picsum.photos/seed/${seed}-${i}/800/600`,
      fullUrl: `https://picsum.photos/seed/${seed}-${i}/2560/1440`,
      title: `Photo ${i + 1}`,
      iso: 100 * (1 + (i % 5)),
      aperture,
      shutter,
      focalLength: focal,
      colors,
    } as ImageMeta;
  });
};

const collectionImages = computed<ImageMeta[]>(() => makeCollectionPlaceholders(collection.value));

// Lightbox state
const isLightboxOpen = ref(false);
const currentIndex = ref(0);

const currentItem = computed(() => collectionImages.value[currentIndex.value] ?? null);
const currentFullImage = computed(() => currentItem.value?.fullUrl || currentItem.value?.url || '');
const currentTitle = computed(() => currentItem.value?.title ?? `Image ${currentIndex.value + 1}`);
const currentISO = computed(() => currentItem.value?.iso ?? 100);
const currentAperture = computed(() => currentItem.value?.aperture ?? 'f/2.8');
const currentShutter = computed(() => currentItem.value?.shutter ?? '1/125s');
const currentFocal = computed(() => currentItem.value?.focalLength ?? '50mm');
const currentColors = computed(() => currentItem.value?.colors ?? ['#444', '#666', '#888', '#aaa']);
const currentAlt = computed(() => `${currentTitle.value} — ${displayName.value}`);
// With wrap-around navigation, both are enabled if there is more than one image
const hasPrev = computed(() => collectionImages.value.length > 1);
const hasNext = computed(() => collectionImages.value.length > 1);

function openLightbox(index: number) {
  currentIndex.value = index;
  isLightboxOpen.value = true;
}

function closeLightbox() {
  isLightboxOpen.value = false;
}

function prev() {
  const len = collectionImages.value.length;
  if (len === 0) return;
  if (len === 1) { currentIndex.value = 0; return; }
  currentIndex.value = (currentIndex.value - 1 + len) % len;
}

function next() {
  const len = collectionImages.value.length;
  if (len === 0) return;
  if (len === 1) { currentIndex.value = 0; return; }
  currentIndex.value = (currentIndex.value + 1) % len;
}

function onKey(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    next();
  }
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

// Lightbox info collapse with global persistence across collections
const isInfoCollapsed = ref(false);
const collapseStorageKey = 'gallery:infoCollapsed';

function loadCollapseState() {
  try {
    const v = localStorage.getItem(collapseStorageKey);
    if (v === '1') isInfoCollapsed.value = true;
    else if (v === '0') isInfoCollapsed.value = false;
  } catch {
    /* ignore storage errors */
  }
}

function saveCollapseState() {
  try {
    localStorage.setItem(collapseStorageKey, isInfoCollapsed.value ? '1' : '0');
  } catch {
    /* ignore storage errors */
  }
}

function toggleInfo() {
  isInfoCollapsed.value = !isInfoCollapsed.value;
  saveCollapseState();
}

// Load on mount (same for every collection); keep watch to reload if route logic ever reuses component
onMounted(loadCollapseState);
watch(collection, () => loadCollapseState());

// Palette swatch: click to show hex color code temporarily
const hexCodeVisible = ref<boolean[]>([]);
const hexCodeTimers = new Map<number, number>();

function resetHexCodeState() {
  hexCodeVisible.value = (currentColors.value || []).map(() => false);
  // clear any running timers
  hexCodeTimers.forEach((t) => window.clearTimeout(t));
  hexCodeTimers.clear();
}

// Reset visibility when image changes (palette changes)
watch([currentIndex, currentColors], () => {
  resetHexCodeState();
});

onMounted(() => {
  resetHexCodeState();
});

function showHexCode(i: number) {
  // bounds check
  if (i < 0 || i >= (currentColors.value?.length || 0)) return;
  // hide all other bubbles immediately (no need to wait their timers)
  const count = currentColors.value?.length || 0;
  for (let j = 0; j < count; j++) {
    if (j === i) continue;
    hexCodeVisible.value[j] = false;
    const tj = hexCodeTimers.get(j);
    if (tj) {
      window.clearTimeout(tj);
      hexCodeTimers.delete(j);
    }
  }

  // show the clicked one
  hexCodeVisible.value[i] = true;
  // clear existing timer for this index
  const existing = hexCodeTimers.get(i);
  if (existing) window.clearTimeout(existing);
  // hide after 4000ms
  const timer = window.setTimeout(() => {
    hexCodeVisible.value[i] = false;
    hexCodeTimers.delete(i);
  }, 4000);
  hexCodeTimers.set(i, timer);
}

// Color formatting helpers for swatch bubble
function isHexColor(s: string): boolean {
  return /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s.trim());
}

function normalizeHex(s: string): string {
  const v = s.trim();
  if (!isHexColor(v)) return v;
  const hex = v.slice(1);
  if (hex.length === 3 || hex.length === 4) {
    // expand short hex (#rgb or #rgba)
    const r = hex[0];
    const g = hex[1];
    const b = hex[2];
    // ignore alpha for display
    return ('#' + r + r + g + g + b + b).toUpperCase();
  }
  // 6 or 8 (ignore alpha)
  return ('#' + hex.slice(0, 6)).toUpperCase();
}

function parseRgb(s: string): { r: number; g: number; b: number } | null {
  const v = s.trim();
  if (isHexColor(v)) {
    const h = normalizeHex(v).slice(1);
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return { r, g, b };
  }
  const rgbMatch = v.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|0?\.\d+|1(?:\.0+)?)\s*)?\)$/i);
  if (rgbMatch) {
    const r = Math.max(0, Math.min(255, parseInt(rgbMatch[1]!, 10)));
    const g = Math.max(0, Math.min(255, parseInt(rgbMatch[2]!, 10)));
    const b = Math.max(0, Math.min(255, parseInt(rgbMatch[3]!, 10)));
    return { r, g, b };
  }
  // Could add hsl/hsla support later
  return null;
}

function displayHex(c: string): string {
  return isHexColor(c) ? normalizeHex(c) : c;
}

function displayRgb(c: string): string {
  const rgb = parseRgb(c);
  if (!rgb) return '';
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// ---------------------------
// Likes (Hearts) with local storage and fake counts
// ---------------------------
type LikesMap = Record<string, boolean>;
const likesStorageKey = 'gallery:likes:v1';
const likesMap = ref<LikesMap>({});

function loadLikes() {
  try {
    const raw = localStorage.getItem(likesStorageKey);
    likesMap.value = raw ? (JSON.parse(raw) as LikesMap) : {};
  } catch {
    likesMap.value = {};
  }
}

function saveLikes() {
  try {
    localStorage.setItem(likesStorageKey, JSON.stringify(likesMap.value));
  } catch {
    /* ignore */
  }
}

function imageIdByIndex(index: number): string {
  const item = collectionImages.value[index];
  if (!item) return `${collection.value}:${index}`;
  return item.fullUrl || item.url || `${collection.value}:${index}`;
}

function isIdLiked(id: string): boolean {
  return !!likesMap.value[id];
}

function toggleLikeById(id: string) {
  const next = !likesMap.value[id];
  likesMap.value = { ...likesMap.value, [id]: next };
  saveLikes();
}

function isIndexLiked(index: number): boolean {
  return isIdLiked(imageIdByIndex(index));
}

function toggleLikeForIndex(index: number) {
  toggleLikeById(imageIdByIndex(index));
}

const isCurrentLiked = computed(() => isIndexLiked(currentIndex.value));
function toggleLikeCurrent() {
  toggleLikeForIndex(currentIndex.value);
  pulseLike();
}

// Deterministic fake baseline count per image
function hashString(s: string): number {
  let h = 2166136261 >>> 0; // FNV-like hash
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    // mix
    h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
  }
  return h >>> 0;
}

function baselineForId(id: string): number {
  const h = hashString(id);
  const min = 8;
  const max = 220;
  return min + (h % (max - min + 1));
}

function totalLikesForId(id: string): number {
  return baselineForId(id) + (isIdLiked(id) ? 1 : 0);
}

function totalLikesForIndex(index: number): number {
  return totalLikesForId(imageIdByIndex(index));
}

const totalLikesCurrent = computed(() => totalLikesForIndex(currentIndex.value));

function heartAriaLabel(index: number): string {
  return `${isIndexLiked(index) ? 'Unlike' : 'Like'} this image. Total likes: ${totalLikesForIndex(index)}`;
}

onMounted(loadLikes);

// Lightbox like pulse animation
const likePulse = ref(false);
function pulseLike() {
  likePulse.value = false;
  // next tick-like delay to restart animation reliably
  window.setTimeout(() => {
    likePulse.value = true;
    window.setTimeout(() => { likePulse.value = false; }, 320);
  }, 0);
}

// Grid pulse per image id
const gridPulseTimers = new Map<string, number>();
const gridPulseIds = ref<Set<string>>(new Set());

function triggerGridPulseForId(id: string) {
  // remove then add next tick to restart animation
  const clearExisting = new Set(gridPulseIds.value);
  clearExisting.delete(id);
  gridPulseIds.value = clearExisting;
  const existing = gridPulseTimers.get(id);
  if (existing) window.clearTimeout(existing);
  window.setTimeout(() => {
    const withId = new Set(gridPulseIds.value);
    withId.add(id);
    gridPulseIds.value = withId;
    const t = window.setTimeout(() => {
      const removed = new Set(gridPulseIds.value);
      removed.delete(id);
      gridPulseIds.value = removed;
      gridPulseTimers.delete(id);
    }, 320);
    gridPulseTimers.set(id, t);
  }, 0);
}

function gridPulseForIndex(index: number): boolean {
  return gridPulseIds.value.has(imageIdByIndex(index));
}

function onGridToggleLike(index: number) {
  toggleLikeForIndex(index);
  triggerGridPulseForId(imageIdByIndex(index));
}

onBeforeUnmount(() => {
  gridPulseTimers.forEach((t) => window.clearTimeout(t));
  gridPulseTimers.clear();
});

</script>

<style scoped lang="scss">
.collection-bg {
  background: $primary;
  min-height: 100vh;
}

.collection-page {
  width: 80%;
  /* allow full-width container without a numeric cap */
  max-width: none;
  margin: 0 auto;
}



.photo-grid {
  width: 100%;
  margin: 0 auto;
  display: grid;
  /* Max 4 columns; tiles scale to fill available width */
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Step down columns as space decreases */
@media (max-width: 1400px) {
  .photo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 980px) {
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .photo-grid {
    grid-template-columns: 1fr;
  }
}

.photo-item {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative; /* for heart overlay positioning */
}

.photo-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
}

.photo-item__img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

/* Lightbox */
.lightbox-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden; /* prevent page scrollbar flicker on small overflows */
  /* Shared variable controlling how far the arrow protrudes upward */
  --arrow-protrusion: clamp(18px, 2.2vw, 30px);
}

.lightbox-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 0 8px; /* smaller top padding so image sits higher */
  color: #fff;
}

.lightbox-title { flex: 0 1 auto; font-weight: 600; font-size: clamp(14px, 1.8vw, 22px); }
.lightbox-spacer { flex: 1 1 auto; }

.lightbox-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0; /* allow flex child to shrink and avoid overflow pushing info off-screen */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* smaller top padding, a bit more bottom padding to keep separation from info bar */
  padding: 
    clamp(4px, 1vw, 4px)   /* top */
    clamp(8px, 2vw, 24px)   /* right */
    calc(var(--arrow-protrusion) + clamp(4px, 1vw, 6px))/* bottom depends on arrow */
    clamp(8px, 2vw, 24px);  /* left */
  box-sizing: border-box;
}

/* When collapsed, arrow may protrude more; bump the shared variable only */
.lightbox-container.info-collapsed {
  --arrow-protrusion: clamp(24px, 2.8vw, 30px);
}

.lightbox-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.nav-btn {
  /* Fixed so arrows remain centered on the screen; styled as vertical pill pillars */
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--nav-pill-width, clamp(40px, 4.6vw, 64px));
  height: var(--nav-pill-height, clamp(140px, 38vh, 420px));
  /* light gray translucent “glass” look */
  background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.10));
  color: #fff;
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 999px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06);
  backdrop-filter: saturate(120%) blur(2px);
  -webkit-backdrop-filter: saturate(120%) blur(2px);
  font-size: clamp(22px, 3.4vw, 46px);
  line-height: 1;
  cursor: pointer;
  z-index: 1000; /* ensure above image/info */
  user-select: none;
  touch-action: manipulation;
  transition: background 160ms ease, box-shadow 50ms ease, transform 180ms ease;
}
.nav-btn:disabled { opacity: 0.4; cursor: default; }
.nav-btn.prev { left: max(8px, env(safe-area-inset-left)); }
.nav-btn.next { right: max(8px, env(safe-area-inset-right)); }

/* Hover/active/focus states for better affordance */
.nav-btn:hover:not(:disabled), .nav-btn:focus-visible:not(:disabled) {
  background: linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.15));
  box-shadow: 0 8px 28px rgba(0,0,0,0.42), inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 0 2px rgba(255,255,255,0.12);
  outline: none;
  transform: translateY(-50%) scale(1.05); /* grow more on hover */
}

.nav-btn:active:not(:disabled) {
  transform: translateY(-50%) scale(0.98);
}

/* Tweak size on small screens to keep the pillar usable but not overwhelming */
@media (max-width: 600px) {
  .nav-btn {
    width: var(--nav-pill-width-sm, clamp(36px, 7vw, 56px));
    height: var(--nav-pill-height-sm, clamp(120px, 32vh, 280px));
    font-size: clamp(20px, 6.5vw, 38px);
  }
}

.lightbox-info {
  background: #111;
  color: #ddd;
  display: grid;
  grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
  align-items: center;
  gap: 8px;
  /* center the info box and make it less wide */
  margin: 0px auto 0; /* top auto bottom */
  border-top: 1px solid rgba(255,255,255,0.08);
  /* padding: top | left+right | bottom */
  padding: 
    clamp(8px, 1.4vw, 8px) /* top */
    clamp(8px, 1.2vw, 14px)  /* left+right */
    clamp(10px, 1.4vw, 16px);/* bottom */
  border-radius: 12px 12px 0 0; /* rounded corners */
  overflow: visible; /* allow toggle button to sit above the rounded edge */
  will-change: max-height, padding; /* hint for smoother slide */
  max-height: 38vh; /* show content without needing inner scrollbar on common screens */
  transition: max-height 500ms ease, padding 800ms ease, margin-top 800ms ease;
  position: relative;
  width: min(92%, 1100px); /* make box less wide than viewport */
}

.lightbox-info.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  border-top-width: 0;
}

.lightbox-info-wrap {
  position: relative;
  display: block;
}

.info-toggle {
  position: absolute;
  top: calc(var(--arrow-protrusion) * -1); /* sits above and attached, tied to shared variable */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: clamp(40px, 3vw, 52px);
  height: clamp(28px, 2.2vw, 30px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  color: #ddd;
  border: 1px solid rgba(255,255,255,0.15);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
}

.toggle-arrow {
  display: inline-block;
  transition: transform 200ms ease;
  font-size: clamp(14px, 1.6vw, 30px);
}
.toggle-arrow.up { transform: rotate(180deg); }

.info-left { justify-self: start; }
.info-center { justify-self: center; text-align: center; }
.info-right { justify-self: end; }

.meta-line {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: clamp(12px, 1.6vw, 18px);
}

.palette {
  display: inline-flex;
  gap: clamp(4px, 0.6vw, 12px);
}

.swatch {
  width: clamp(16px, 1.3vw, 24px);
  height: clamp(16px, 1.3vw, 24px);
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.25) inset;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: transform 140ms ease;
}

.swatch:focus-visible {
  box-shadow: 0 0 0 2px #fff, 0 0 0 1px rgba(255,255,255,0.25) inset;
}

/* Subtle grow on hover without layout shift */
.palette .swatch:hover {
  transform: scale(1.15);
}

/* Small feedback on press */
.palette .swatch:active {
  transform: scale(1.08);
}

.hex-bubble {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 6px);
  background: rgba(0,0,0,0.85);
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 160ms ease, transform 160ms ease;
  border: 1px solid rgba(255,255,255,0.35); /* outline for readability */
  box-shadow: 0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15); /* subtle halo */
  text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  z-index: 5;
}

.hex-bubble.show {
  opacity: 1;
  transform: translate(-50%, -6px); /* sit a bit higher above the swatch */
}

/* Two-line layout inside the bubble */
.hex-bubble .hex-line,
.hex-bubble .rgb-line {
  display: block;
  line-height: 1.2;
}
.hex-bubble .hex-line { font-weight: 600; }
.hex-bubble .rgb-line { opacity: 0.9; }

/* Center section typography */
.info-center .title { font-size: clamp(16px, 1.8vw, 24px); font-weight: 600; }
.info-center .count { font-size: clamp(12px, 1.2vw, 16px); opacity: 0.8; }

@media (max-width: 600px) {
  .photo-grid { gap: 16px; }
}

/* Heart overlay in grid (match lightbox look) */
.heart-overlay {
  position: absolute;
  right: 8px;
  top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: rgb(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 999px;
  z-index: 2;
  backdrop-filter: saturate(110%) blur(1.5px);
}

/* Lightbox like area */
.lightbox-like { display: inline-flex; align-items: center; gap: 8px; }
.lightbox-like-count {
  font-size: var(--lightbox-like-font-size, clamp(14px, 1.6vw, 18px));
  color: #fff;
  opacity: 0.95;
  font-weight: 700;
}

/* Grid like count uses its own variable so it can be sized independently */
.grid-like-count {
  font-size: var(--grid-like-font-size, 15px);
  color: #fff;
  opacity: 0.95;
  font-weight: 700;
  pointer-events: none;
}

/* Clamp heart clickable area; neutralize external gutter padding */
.heart-overlay .like-heart-btn {
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1;
  min-width: auto;
}
.heart-overlay .like-heart-btn :deep(i.q-icon) {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; /* increase actual heart glyph size */
}

/* Pulse animation for like count and heart */
@keyframes like-pulse {
  0% { transform: scale(1); }
  25% { transform: scale(1.12); }
  60% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

.pulse {
  animation: like-pulse 280ms ease-out;
}

.like-heart-btn.pulse :deep(i.q-icon) {
  animation: like-pulse 280ms ease-out;
}

/* Red glow on hover/focus and persistent red when liked */
.like-heart-btn:focus-visible :deep(i.q-icon),
.like-heart-btn:hover :deep(i.q-icon) {
  filter: drop-shadow(0 0 6px rgba(255, 90, 118, 0.9));
}

.like-heart-btn.liked :deep(i.q-icon) {
  color: #ff5a76 !important;
  filter: drop-shadow(0 0 6px rgba(255, 90, 118, 0.85));
}

</style>
