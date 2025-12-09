<template>
  <div class="hero-banner q-pa-xl">
    <div class="hero-inner">
      <h1 class="hero-title">{{ t('footer.legal.terms') }}</h1>
      <p class="hero-description">{{ t('terms.desc') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';
.hero-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $primary;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  height: 180px;
  border-bottom: 2px solid $light-accent;
  padding: 36px 18px;
}
.hero-inner { max-width: 980px; width: 100%; text-align: center; }
.hero-title { color: #fff; font-size: 2.6rem; margin: 0 0 8px; }
.hero-description { color: #e6e6e6; margin: 0; font-size: 1.05rem; max-width: 760px; margin-left: auto; margin-right: auto; }
</style>
