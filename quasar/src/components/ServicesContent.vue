<template>
  <div class="content-wrapper">
    <div class="content">
      <h2 class="section-title">{{ t('servicesContent.title') }}</h2>
      <p class="lead">{{ t('servicesContent.lead1') }}</p>
      <p class="lead">{{ t('servicesContent.lead2') }}</p>
      <p class="student-note" v-html="t('servicesContent.studentNote')"></p>
      <div class="services-list">
        <h3 class="subsection-title">{{ t('servicesContent.mainTitle') }}</h3>
        <p class="vat-note">{{ t('servicesContent.vatNote') }}</p>
        <div class="grid main-packages">
          <ServiceCard
            v-for="s in mainPackages"
            :key="s.id"
            :title="s.title"
            :description="s.description"
            :price="s.price"
          />
        </div>

        <h3 class="subsection-title" style="margin-top: 50px">{{ t('servicesContent.addonsTitle') }}</h3>
        <p class="vat-note">{{ t('servicesContent.vatNote') }}</p>
        <p class="lead" style="margin-top: 6px; margin-bottom: 10px; color: #d6d6d6">{{ t('servicesContent.addonsLead') }}</p>
        <div class="grid addons">
          <ServiceCard
            v-for="a in addons"
            :key="a.id"
            :title="a.title"
            :description="a.description"
            :price="a.price"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceCard from './ServiceCard.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const i18n = useI18n({ useScope: 'global' });
const t = ((...args: Parameters<typeof i18n.t>) => i18n.t(...args)) as typeof i18n.t;
const tm = ((...args: Parameters<typeof i18n.tm>) => i18n.tm(...args)) as typeof i18n.tm;

// Build variables from translation files, using your exact package/add-on content
const mainPackages = computed(() => [
  {
    id: 'portraits',
    title: t('servicesContent.packages.portraits.title'),
    description: tm('servicesContent.packages.portraits.description'),
    price: t('servicesContent.packages.portraits.price'),
  },
  {
    id: 'couple-portraits',
    title: t('servicesContent.packages.couplePortraits.title'),
    description: tm('servicesContent.packages.couplePortraits.description'),
    price: t('servicesContent.packages.couplePortraits.price'),
  },
  {
    id: 'pet',
    title: t('servicesContent.packages.pet.title'),
    description: tm('servicesContent.packages.pet.description'),
    price: t('servicesContent.packages.pet.price'),
  },
  {
    id: 'commercial',
    title: t('servicesContent.packages.commercial.title'),
    description: tm('servicesContent.packages.commercial.description'),
    price: t('servicesContent.packages.commercial.price'),
  },
]);

const addons = computed(() => [
  {
    id: 'extra-images',
    title: t('servicesContent.addons.extraImage.title'),
    description: tm('servicesContent.addons.extraImage.description'),
    price: t('servicesContent.addons.extraImage.price'),
  },
  {
    id: 'rush',
    title: t('servicesContent.addons.rush.title'),
    description: tm('servicesContent.addons.rush.description'),
    price: t('servicesContent.addons.rush.price'),
  },
  {
    id: 'extra-editing',
    title: t('servicesContent.addons.extraEditing.title'),
    description: tm('servicesContent.addons.extraEditing.description'),
    price: t('servicesContent.addons.extraEditing.price'),
  },
  {
    id: 'real-deal',
    title: t('servicesContent.addons.realDeal.title'),
    description: tm('servicesContent.addons.realDeal.description'),
    price: t('servicesContent.addons.realDeal.price'),
  },
  {
    id: 'extended-time',
    title: t('servicesContent.addons.extendedTime.title'),
    description: tm('servicesContent.addons.extendedTime.description'),
    price: t('servicesContent.addons.extendedTime.price'),
  },
]);
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.content-wrapper {
  color: #fff;
  background: $primary;
  min-height: 100vh;
  padding: 24px 0 60px; /* prevent margin-collapse gap by using padding-top */
}

.content {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 18px;
}
.section-title {
  font-size: 22px;
  margin: 12px 0;
}
.lead {
  color: #cfcfcf;
  margin-bottom: 18px;
}
.student-note {
  color: #ddd;
  margin-bottom: 50px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 5px 15px;
  border-radius: 8px;
}
.student-note strong {
  font-weight: 700;
  color: #fff;
}
.vat-note {
  color: #cfcfcf;
  font-size: 13px;
  margin: -5px 0 10px; /* sit under the main packages title with light spacing */
}
.subsection-title {
  font-size: 18px;
  margin: 8px 0 6px;
  color: #fff;
  font-weight: 600;
}
/* Grid layout for service cards (restore previous look) */
.services-list .grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: stretch; /* ensure grid tracks allow children to stretch */
  margin-top: 22px;
}
.services-list .grid > * {
  width: 100%;
  display: flex; /* make each grid cell a flex container so its child card can stretch */
}
.services-list .addons {
  margin-bottom: 18px;
}
</style>
