<template>
  <section class="policy">
    <div class="inner">
      <h2 class="title">{{ t('privacy.title') }}</h2>
      <p class="desc">{{ t('privacy.desc') }}</p>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.controller.title') }}</h3>
        <p>{{ t('privacy.controller.body') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.collect.title') }}</h3>
        <ul>
          <li><strong>{{ t('privacy.collect.items.contact.label') }}</strong> {{ t('privacy.collect.items.contact.body') }}</li>
          <li><strong>{{ t('privacy.collect.items.booking.label') }}</strong> {{ t('privacy.collect.items.booking.body') }}</li>
          <li><strong>{{ t('privacy.collect.items.tech.label') }}</strong> {{ t('privacy.collect.items.tech.body') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.use.title') }}</h3>
        <ul>
          <li><strong>{{ t('privacy.use.items.inquiries.label') }}</strong> {{ t('privacy.use.items.inquiries.body') }}</li>
          <li><strong>{{ t('privacy.use.items.bookings.label') }}</strong> {{ t('privacy.use.items.bookings.body') }}</li>
          <li><strong>{{ t('privacy.use.items.security.label') }}</strong> {{ t('privacy.use.items.security.body') }}</li>
        </ul>
        <p>{{ t('privacy.use.note') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.bases.title') }}</h3>
        <ul>
          <li><strong>{{ t('privacy.bases.items.consent.label') }}</strong> {{ t('privacy.bases.items.consent.body') }}</li>
          <li><strong>{{ t('privacy.bases.items.contract.label') }}</strong> {{ t('privacy.bases.items.contract.body') }}</li>
          <li><strong>{{ t('privacy.bases.items.legit.label') }}</strong> {{ t('privacy.bases.items.legit.body') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.retention.title') }}</h3>
        <p>{{ t('privacy.retention.body') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.rights.title') }}</h3>
        <ul>
          <li><strong>{{ t('privacy.rights.items.access.label') }}</strong> {{ t('privacy.rights.items.access.body') }}</li>
          <li><strong>{{ t('privacy.rights.items.rect.label') }}</strong> {{ t('privacy.rights.items.rect.body') }}</li>
          <li><strong>{{ t('privacy.rights.items.erase.label') }}</strong> {{ t('privacy.rights.items.erase.body') }}</li>
          <li><strong>{{ t('privacy.rights.items.restrict.label') }}</strong> {{ t('privacy.rights.items.restrict.body') }}</li>
          <li><strong>{{ t('privacy.rights.items.port.label') }}</strong> {{ t('privacy.rights.items.port.body') }}</li>
        </ul>
        <p>{{ t('privacy.rights.footer') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.cookies.title') }}</h3>
        <p>{{ t('privacy.cookies.body') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.third.title') }}</h3>
        <p>{{ t('privacy.third.body') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('privacy.contact.title') }}</h3>
        <p>
          {{ t('privacy.contact.prefix') }}
          <router-link to="/contact">{{ t('privacy.contact.link') }}</router-link>
          {{ t('privacy.contact.suffix') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
</script>

<style scoped>
.policy { background: var(--q-primary); color: #fff; padding: 24px 0 60px; }
.inner { max-width: 980px; margin: 0 auto; padding: 0 18px; }
.title { font-size: 22px; margin: 12px 0 10px; }
.desc { color: #cfcfcf; margin-bottom: 18px; }
.section { margin-bottom: 18px; }
.subtitle { font-size: 18px; margin: 12px 0 6px; }
</style>
