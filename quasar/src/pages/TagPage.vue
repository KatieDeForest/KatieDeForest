<template>
  <q-page aria-live="polite">
    <TagHeroBanner v-if="slug" :title="title" :description="bannerDesc" />
    <div v-if="slug" class="q-pa-xl">
      <GalleryGrid :tagSlug="slug" />
    </div>
    <div v-else class="q-pa-md">
      <!-- Empty state when no tag slug is present -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import GalleryGrid from 'components/GalleryGrid.vue';
import TagHeroBanner from 'components/TagHeroBanner.vue';
import { api } from 'src/boot/axios';

const route = useRoute();
const { t, locale } = useI18n();

const slug = computed(() => (route.params.slug as string) || '');
const title = computed(() => tagName.value || slug.value || t('collection.defaultTitle'));
const bannerDesc = computed(() => {
  const name = tagName.value || slug.value;
  if (!name) return '';
  // Localized description acknowledging this page lists all images with the tag
  return String(locale.value) === 'da'
    ? `Alle billeder med tag "${name}"`
    : `All images with the tag "${name}"`;
});

// localized tag name
const tagName = ref<string>('');
async function fetchTagName(sl: string) {
  if (!sl) { tagName.value = ''; return; }
  try {
    const loc = encodeURIComponent(String(locale.value));
    const resp = await api.get(`/api/tags?filters[Slug][$eq]=${encodeURIComponent(sl)}&locale=${loc}`);
    const arr = resp?.data?.data ?? [];
    const entry = Array.isArray(arr) ? arr[0] : null;
    tagName.value = entry?.attributes?.Name || sl;
  } catch {
    tagName.value = sl;
  }
}

onMounted(async () => {
  if (slug.value) await fetchTagName(slug.value);
});

watch(slug, async (next) => {
  if (next) await fetchTagName(next);
});
</script>

<style scoped>
</style>
