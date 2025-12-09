<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { api } from 'src/boot/axios';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();
const { t, locale } = useI18n({ useScope: 'global' });
const router = useRouter();

const show = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v)
});

const searchQuery = ref('');
const debouncedQuery = ref('');
const debouncedSuggestQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
// Tag support: fetch tags in both locales and match query against slug/names
type TagMap = Record<string, { en?: string | undefined; da?: string | undefined }>;
const tagsBySlug = ref<TagMap>({});
let _tagsLoaded = false;
// Start loading tags eagerly so they're likely ready by first keystroke
void (async () => { try { await ensureTagsLoaded(); } catch { /* ignore */ } })();

async function fetchTagsForLocale(loc: 'en' | 'da') {
  try {
    const resp = await api.get(`/api/tags?fields[0]=Slug&fields[1]=Name&pagination[pageSize]=1000&locale=${encodeURIComponent(loc)}`);
    const arr = resp?.data?.data ?? [];
    for (const entry of arr) {
      const slug = entry?.Slug as string | undefined;
      const name = entry?.Name as string | undefined;
      if (!slug) continue;
      const rec = tagsBySlug.value[slug] || {};
      if (loc === 'en') rec.en = name ?? rec.en;
      else rec.da = name ?? rec.da;
      tagsBySlug.value[slug] = rec;
    }
  } catch {
    /* ignore tag fetch errors */
  }
}

async function ensureTagsLoaded() {
  if (_tagsLoaded) return;
  await fetchTagsForLocale('en');
  await fetchTagsForLocale('da');
  try {
    console.debug('[SearchModal] Tags loaded:', Object.keys(tagsBySlug.value).length);
  } catch { /* ignore */ }
  _tagsLoaded = true;
}

function getTagRouteFor(q: string, qtoks: string[]): RouteSuggestion {
  // try to find best tag by slug or localized names
  let best: { slug: string; score: number } | null = null;
  const entries = Object.entries(tagsBySlug.value);
  if (entries.length === 0) {
    // Tags not loaded or empty — bail early
    return null;
  }
  for (const [slug, names] of entries) {
    const candidates = [slug, names.en || '', names.da || ''];
    for (const alias of candidates) {
      const aliasLower = String(alias).toLowerCase();
      if (!aliasLower) continue;
      const atoks = aliasLower.split(/\s+/);
      if (qtoks.length > 0) {
        const a0 = atoks[0] ?? '';
        const q0 = qtoks[0] ?? '';
        if (!(a0.startsWith(q0) || q0.startsWith(a0))) continue;
      }
      let score = 0;
      const max = Math.min(qtoks.length, atoks.length);
      for (let i = 0; i < max; i++) {
        const a = atoks[i] ?? '';
        const qv = qtoks[i] ?? '';
        if (a.startsWith(qv) || qv.startsWith(a)) score++;
        else { score = -1; break; }
      }
      if (aliasLower.startsWith(q)) score += 2;
      if (score > 0) {
        if (!best || score > best.score) {
          best = { slug, score };
        }
      }
    }
  }
  if (!best) return null;
  const rec = tagsBySlug.value[best.slug] || {};
  const name = String(locale.value) === 'da' ? (rec.da || rec.en || best.slug) : (rec.en || rec.da || best.slug);
  const label = String(locale.value) === 'da' ? `Søg efter tag "${name}"` : `Search for tag "${name}"`;
  return { to: `/tags/${encodeURIComponent(best.slug)}`, label, kind: 'tag' };
}
// Inline routing logic to reduce component clutter
type RouteSuggestion = { to: string; label: string; kind?: 'tag' | 'route' } | null;
type PhraseAlias = { text: string; lang: 'en' | 'da' };
type PhraseRoute = { aliases: PhraseAlias[]; to: string; labelEn: string; labelDa: string };
const phraseRoutes: PhraseRoute[] = [
  {
    aliases: [
      { text: 'privacy', lang: 'en' },
      { text: 'privacy policy', lang: 'en' },
      { text: 'policy', lang: 'en' },
      { text: 'policies', lang: 'en' },
      { text: 'legal notice', lang: 'en' },
      { text: 'legal', lang: 'en' },
      { text: 'cookie', lang: 'en' },
      { text: 'cookies', lang: 'en' },
      { text: 'cookie policy', lang: 'en' },
      { text: 'gdpr', lang: 'en' },
      { text: 'privatlivspolitik', lang: 'da' }
    ],
    to: '/privacy',
    labelEn: 'Privacy Policy',
    labelDa: 'Privatlivspolitik'
  },
  {
    aliases: [
      { text: 'terms', lang: 'en' },
      { text: 'terms of service', lang: 'en' },
      { text: 'tos', lang: 'en' },
      { text: 'conditions', lang: 'en' },
      { text: 'vilkår', lang: 'da' },
      { text: 'vilkår og betingelser', lang: 'da' },
      { text: 'betingelser', lang: 'da' }
    ],
    to: '/terms',
    labelEn: 'Terms of Service',
    labelDa: 'Vilkår og betingelser'
  },
  {
    aliases: [
      { text: 'home', lang: 'en' },
      { text: 'homepage', lang: 'en' },
      { text: 'index', lang: 'en' },
      { text: 'start', lang: 'en' },
      { text: 'start', lang: 'da' },
      { text: 'forside', lang: 'da' }
    ],
    to: '/',
    labelEn: 'Home',
    labelDa: 'Forside'
  },
  {
    aliases: [
      { text: 'gallery', lang: 'en' },
      { text: 'photos', lang: 'en' },
      { text: 'portfolio', lang: 'en' },
      { text: 'galleri', lang: 'da' }
    ],
    to: '/gallery',
    labelEn: 'Gallery',
    labelDa: 'Galleri'
  },
  {
    aliases: [
      { text: 'about', lang: 'en' },
      { text: 'about me', lang: 'en' },
      { text: 'bio', lang: 'en' },
      { text: 'om mig', lang: 'da' },
      { text: 'om', lang: 'da' }
    ],
    to: '/about',
    labelEn: 'About Me',
    labelDa: 'Om Mig'
  },
  {
    aliases: [
      { text: 'services', lang: 'en' },
      { text: 'service', lang: 'en' },
      { text: 'pricing', lang: 'en' },
      { text: 'priser', lang: 'da' },
      { text: 'tjenester', lang: 'da' }
    ],
    to: '/services',
    labelEn: 'Services',
    labelDa: 'Tjenester'
  },
  {
    aliases: [
      { text: 'contact', lang: 'en' },
      { text: 'email', lang: 'en' },
      { text: 'mail', lang: 'en' },
      { text: 'kontakt', lang: 'da' }
    ],
    to: '/contact',
    labelEn: 'Contact',
    labelDa: 'Kontakt'
  }
];

function getRouteFor(query: string): RouteSuggestion {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  // Tokenize query to allow partial phrase matching like "privacy po"
  const qtoks = q.split(/\s+/);
  let best: { to: string; labelKey: string; score: number } | null = null;
  for (const entry of phraseRoutes) {
    for (const alias of entry.aliases) {
      const aliasLower = alias.text.toLowerCase();
      const atoks = aliasLower.split(/\s+/);
      // Require the first query token to match the start of the first alias token
      if (qtoks.length > 0) {
        const a0 = atoks[0] ?? '';
        const q0 = qtoks[0] ?? '';
        if (!a0.startsWith(q0)) continue;
      }
      // Base score: count of tokens where query token is a prefix of alias token
      let score = 0;
      const max = Math.min(qtoks.length, atoks.length);
      for (let i = 0; i < max; i++) {
        const a = atoks[i] ?? '';
        const qv = qtoks[i] ?? '';
        if (a.startsWith(qv)) score++;
        else { score = -1; break; }
      }
      // Bonus: full alias starts with the whole query string
      if (aliasLower.startsWith(q)) score += 2;
      if (score > 0) {
        // If tie on score, keep existing best (preserves route order preference)
        if (!best || score > best.score) {
          best = { to: entry.to, labelKey: alias.lang === 'da' ? 'da' : 'en', score } as any;
          // Temporarily stash lang in labelKey for later decision
          (best as any).labelEn = entry.labelEn;
          (best as any).labelDa = entry.labelDa;
        }
      }
    }
  }
  // If no static route matched, try tags (slug + localized names)
  const tagSuggestion = getTagRouteFor(q, qtoks);
  if (tagSuggestion) return tagSuggestion;
  if (!best) return null;
  const label = String(locale.value) === 'da' ? (best as any).labelDa : (best as any).labelEn;
  return { to: best.to, label, kind: 'route' };
}

function handleSearch(query: string): boolean {
  const target = getRouteFor(query);
  if (target) {
    // Navigate via Vue Router
    void router.push(target.to);
    return true;
  }
  return false;
}

let _debounceTimer: number | null = null;
let _suggestTimer: number | null = null;
let _idleTimer: number | null = null;
let _typingIdle = true;
const _revealTimers: number[] = [];

// Remove demo "allResults" list to avoid interfering with external systems.
// Keep searchResults empty; only the route suggestion is shown by this modal.
const searchResults = computed<string[]>(() => []);

const visibleResults = computed(() => {
  return searchResults.value.filter(r => !(getRouteFor(r)));
});

const routeSuggestion = computed((): RouteSuggestion => {
  const q = debouncedSuggestQuery.value.trim();
  if (!q || q.length < 3) return null as RouteSuggestion;
  return getRouteFor(q);
});

watch(searchResults, async (val) => {
  if (debouncedQuery.value !== searchQuery.value) return;
  if (!_typingIdle) return;
  while (_revealTimers.length) {
    const t = _revealTimers.pop();
    if (t) clearTimeout(t);
  }
  if (!val || val.length === 0) return;
  await nextTick();
  const items = document.querySelectorAll('.live-search-results .list-group-item');
  items.forEach(i => i.classList.remove('revealed'));
  const gap = 90;
  items.forEach((el, idx) => {
    const t = window.setTimeout(() => {
      (el as HTMLElement).classList.add('revealed');
    }, idx * gap);
    _revealTimers.push(t);
  });
});

watch(searchQuery, (val) => {
  // Ensure tags are loaded as soon as user starts typing
  void ensureTagsLoaded();
  if (_debounceTimer) { clearTimeout(_debounceTimer); _debounceTimer = null; }
  _debounceTimer = window.setTimeout(() => { debouncedQuery.value = val; }, 160);
  if (_suggestTimer) { clearTimeout(_suggestTimer); _suggestTimer = null; }
  _suggestTimer = window.setTimeout(() => { debouncedSuggestQuery.value = val; }, 260);
  _typingIdle = false;
  if (_idleTimer) { clearTimeout(_idleTimer); _idleTimer = null; }
  _idleTimer = window.setTimeout(() => { _typingIdle = true; }, 360);
});

function open() {
  show.value = true;
  searchQuery.value = '';
  _typingIdle = true;
  if (_idleTimer) { clearTimeout(_idleTimer); _idleTimer = null; }
  // Mark nextTick as intentionally unawaited to satisfy no-floating-promises
  void nextTick(() => {
    if (searchInput.value) {
      try { searchInput.value.focus(); searchInput.value.select(); } catch { /* ignore */ }
    }
  });
}
function close() {
  show.value = false;
  searchQuery.value = '';
  _typingIdle = true;
  if (_idleTimer) { clearTimeout(_idleTimer); _idleTimer = null; }
}
function submitSearch() {
  const handled = handleSearch(searchQuery.value) || false;
  if (handled) {
    close();
  }
}
function navigateResult(result: string) {
  const target = getRouteFor(result);
  if (target) {
    close();
    void router.push(target.to);
  }
}

defineExpose({ open, close });

// Ensure the input is focused and text selected whenever the modal becomes visible
watch(show, (visible) => {
  if (visible) {
    // lazy-load tags when modal opens (both locales), once
    void ensureTagsLoaded();
    searchQuery.value = '';
    _typingIdle = true;
    if (_idleTimer) { clearTimeout(_idleTimer); _idleTimer = null; }
    void nextTick(() => {
      if (searchInput.value) {
        try { searchInput.value.focus(); searchInput.value.select(); } catch { /* ignore */ }
      }
    });
  }
});
</script>

<template>
  <teleport to="body" v-if="show">
    <div class="search-modal-overlay">
      <div class="search-modal-content">
        <button class="close-btn" @click="close" :aria-label="t('aria.closeSearch')">&times;</button>
        <input ref="searchInput" v-model="searchQuery" type="search" class="form-control"
          :placeholder="t('search.placeholder')" autofocus @keyup.enter="submitSearch" />
        <div v-if="searchQuery.trim().length > 0" class="live-search-results">
          <div v-if="searchResults.length === 0 && !routeSuggestion" class="text-muted px-2 py-1">{{
            t('search.noResults') }}</div>
          <ul v-else class="list-group">
            <li v-for="result in visibleResults" :key="result" class="list-group-item bg-dark text-white border-0"
              @click="navigateResult(result)">
              {{ result }}
            </li>
          </ul>
          <ul class="list-group" v-if="routeSuggestion">
            <li class="list-group-item bg-dark text-white border-0" @click="submitSearch">
              <template v-if="routeSuggestion.kind === 'tag'">
                {{ routeSuggestion.label }}
              </template>
              <template v-else>
                {{ t('search.gotoPage') }} "{{ routeSuggestion.label }}"
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.search-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5rem;
  z-index: 3000;
  will-change: opacity;
  animation: liveContainerFade 300ms ease-out both;
}

@keyframes liveContainerFade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.search-modal-content {
  background: #181818;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  width: min(520px, 94%);
  max-width: 640px;
  height: auto;
  max-height: calc(80vh - 7rem);
  box-shadow: 0 8px 48px #000a;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  overflow: hidden;
}

.live-search-results .list-group-item {
  opacity: 1;
  transform: none;
  transition: opacity 520ms ease-out, transform 520ms ease-out;
  will-change: transform, opacity;
}

.live-search-results {
  max-height: 40%;
  overflow-y: auto;
  margin-top: 0.75rem;
}

.live-search-results ul {
  padding-left: 0;
  margin-bottom: 0;
}

.live-search-results .list-group-item {
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 0.5em;
  border-radius: 8px;
  background: #232323 !important;
  border: 1px solid #333;
  box-shadow: 0 2px 8px #0002;
  padding: 0.75em 1em;
  font-size: 1.3em;
}

.live-search-results .list-group-item:hover {
  background: mix($light-accent, #3a3a3a, 12%) !important;
  border-color: rgba($light-accent, 0.18);
  box-shadow: 0 2px 8px #0002, inset 0 0 10px rgba($light-accent, 0.06);
}

.close-btn {
  position: absolute;
  top: 0em;
  right: 0em;
  width: 28px;
  height: 28px;
  padding: 0;
  background: none;
  border: none;
  color: #b5ffb5;
  font-size: 1.75em;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 80;
}

.search-modal-content .form-control {
  border-radius: 8px;
  color: white;
  background-color: $primary;
  width: 97%;
  max-width: 100%;
  padding: 0.5rem 1.2rem;
  margin: 0 auto;
  margin-left: 0rem;
  font-size: 1.3em;
  box-sizing: border-box;
  transition: box-shadow 240ms ease, border-color 200ms ease;
  will-change: box-shadow, border-color;
}

.search-modal-content .form-control:focus {
  outline: none;
  box-shadow: 0 0 0 0.15rem rgba($light-accent, 0.18), 0 0 12px rgba($light-accent, 0.25);
  border-color: $light-accent;
}

.search-modal-content .form-control:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px $primary inset;
  box-shadow: 0 0 0px 1000px $primary inset;
  -webkit-text-fill-color: #ffffff;
}
</style>
