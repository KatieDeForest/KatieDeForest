<template>
  <!-- Card-like wrapper with title to match site style -->
  <div class="ig-card">
    <div class="ig-card-header">
      <div class="ig-card-title">{{ t('instagram.embedTitle') }}</div>
    </div>
    <div class="ig-card-body">
      <!-- EmbedSocial Instagram widget container -->
      <div
        class="embedsocial-hashtag"
        data-ref="66bf9e56169ee4f2071c7d3091874194984f8541"
        data-lazyload="yes"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const SCRIPT_ID = 'EmbedSocialHashtagScript'
const DATA_REF = '66bf9e56169ee4f2071c7d3091874194984f8541'

function rebuildContainer(): void {
  const parent = document.querySelector('.ig-card-body')
  if (!parent) return
  // Remove any previous container/widget DOM the script may have created
  parent.querySelectorAll('.embedsocial-hashtag').forEach((n) => n.remove())
  // Create a fresh container with lazyload enabled
  const container = document.createElement('div')
  container.className = 'embedsocial-hashtag'
  container.setAttribute('data-ref', DATA_REF)
  parent.appendChild(container)
}

function injectScript(): void {
  // Remove existing script to force re-initialization on SPA navigation
  const existing = document.getElementById(SCRIPT_ID)
  if (existing) existing.remove()
  const js = document.createElement('script')
  js.id = SCRIPT_ID
  js.src = 'https://embedsocial.com/cdn/ht.js'
  const headEl = document.head || document.getElementsByTagName('head')[0]
  if (headEl) {
    headEl.appendChild(js)
  } else if (document.body) {
    document.body.appendChild(js)
  }
}

onMounted(() => {
  rebuildContainer()
  injectScript()
})

onBeforeUnmount(() => {
  // Optional: clean up container to reduce duplicates on rapid nav
  const parent = document.querySelector('.ig-card-body')
  parent?.querySelectorAll('.embedsocial-hashtag').forEach((n) => n.remove())
})
</script>

<style scoped lang="scss">
.ig-card {
  max-width: 980px;
  margin: 0px auto 100px;
  border-radius: 14px;
  background: $primary;
  box-shadow: 0 8px 32px 0 #0007;
  overflow: hidden;
}

.ig-card-header {
  background: $primary;
  color: #ffffff;
  padding: 12px 16px;
  border-bottom: 1px solid #1a1a1a;
}

.ig-card-title {
  font-size: 22px;
  font-weight: 600;
}

.ig-card-body {
  padding: 0px 16px 0px 16px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0 0 14px 14px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28), 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

/* Hide EmbedSocial branding button injected by the widget */
:deep(.es-widget-branding) {
  display: none !important;
}
</style>
