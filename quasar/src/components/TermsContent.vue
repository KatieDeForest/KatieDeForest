<template>
  <section class="terms">
    <div class="inner">
      <h2 class="title">{{ t('terms.title') }}</h2>
      <p class="desc">{{ t('terms.desc') }}</p>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.booking.title') }}</h3>
        <ul>
          <li>{{ t('terms.booking.items.confirm') }}</li>
          <li>{{ t('terms.booking.items.vat') }}</li>
          <li>{{ t('terms.booking.items.payment') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.reschedule.title') }}</h3>
        <ul>
          <li>{{ t('terms.reschedule.items.notice') }}</li>
          <li>{{ t('terms.reschedule.items.weather') }}</li>
          <li>{{ t('terms.reschedule.items.deposit') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.deliver.title') }}</h3>
        <ul>
          <li>{{ t('terms.deliver.items.scope') }}</li>
          <li>{{ t('terms.deliver.items.turnaround') }}</li>
          <li>{{ t('terms.deliver.items.delivery') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.rights.title') }}</h3>
        <ul>
          <li>{{ t('terms.rights.items.copyright') }}</li>
          <li>{{ t('terms.rights.items.license') }}</li>
          <li>{{ t('terms.rights.items.portfolio') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.conduct.title') }}</h3>
        <ul>
          <li>{{ t('terms.conduct.items.safe') }}</li>
          <li>{{ t('terms.conduct.items.supervise') }}</li>
        </ul>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.liability.title') }}</h3>
        <p>{{ t('terms.liability.body') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.privacy.title') }}</h3>
        <p>
          {{ t('terms.privacy.prefix') }}
          <router-link to="/privacy">{{ t('terms.privacy.link') }}</router-link>
          {{ t('terms.privacy.suffix') }}
        </p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.law.title') }}</h3>
        <p>{{ t('terms.law.body') }}</p>
      </div>

      <div class="section">
        <h3 class="subtitle">{{ t('terms.contact.title') }}</h3>
        <p>
          {{ t('terms.contact.prefix') }}
          <router-link to="/contact">{{ t('terms.contact.link') }}</router-link>
          {{ t('terms.contact.suffix') }}
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
.terms { background: var(--q-primary); color: #fff; padding: 24px 0 60px; }
.inner { max-width: 980px; margin: 0 auto; padding: 0 18px; }
.title { font-size: 22px; margin: 12px 0 10px; }
.desc { color: #cfcfcf; margin-bottom: 18px; }
.section { margin-bottom: 18px; }
.subtitle { font-size: 18px; margin: 12px 0 6px; }
</style>
