<template>
  <div class="embed-wrap">
    <div class="igwrapper">
      <blockquote
        class="instagram-media"
        :data-instgrm-permalink="permalink"
        data-instgrm-version="14"
        style="border:0; margin:0; padding:0; width:100%;"
      ></blockquote>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, watch } from 'vue';

const props = withDefaults(defineProps<{ permalink?: string }>(), {
  permalink: 'https://www.instagram.com/katiedeforest.photography/',
});

function ensureScriptLoaded() {
  if ((window as any).instgrm?.Embeds?.process) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const existing = document.querySelector('script[data-instgrm-script]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      // If already loaded, resolve immediately
      if ((window as any).instgrm?.Embeds?.process) resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    s.setAttribute('data-instgrm-script', 'true');
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

function processEmbeds() {
  const inst = (window as any).instgrm;
  if (inst?.Embeds?.process) inst.Embeds.process();
}

onMounted(async () => {
  await nextTick();
  await ensureScriptLoaded();
  processEmbeds();
});

watch(() => props.permalink, async () => {
  await nextTick();
  await ensureScriptLoaded();
  processEmbeds();
});
</script>

<style scoped>
.embed-wrap { background: #111; color: #000000; padding: 0 24px 80px; }
.igwrapper { position:relative; max-width: 760px; margin: 0 auto; }
.igwrapper iframe { border:0; position:relative; z-index:2; width: 100%; }
.igwrapper :deep(.instagram-media) { width: 100% !important; margin: 0 !important; }
.igwrapper a { color: rgba(0,0,0,0); position:absolute; left:0; top:0; z-index:0; }
</style>
