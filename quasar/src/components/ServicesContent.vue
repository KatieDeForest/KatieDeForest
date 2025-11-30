<template>
  <div class="content-wrapper">
    <div class="content">
      <h2 class="section-title">My Services</h2>
      <p class="lead">I offer a range of on-location photography services tailored to your needs. I travel to your chosen place for shoots — below are some of the core packages. I also offer bespoke work and licensing.</p>
      <p class="student-note"><strong>Student discount:</strong> If you have a valid student card, you are eligible for a student discount — please contact me for details.</p>
      <div class="services-list">
        <h3 class="subsection-title">Main packages</h3>
        <div class="grid main-packages">
          <ServiceCard v-for="s in mainPackages" :key="s.id" :title="s.title" :description="s.description" :price="s.price" />
        </div>

        <h3 class="subsection-title" style="margin-top: 28px">Add-ons</h3>
        <p class="lead" style="margin-top:6px; margin-bottom:10px; color:#d6d6d6">Optional extras you can add to any main package.</p>
        <div class="grid addons">
          <ServiceCard v-for="a in addons" :key="a.id" :title="a.title" :description="a.description" :price="a.price" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ServiceCard from './ServiceCard.vue';

const mainPackages = [
  {
    id: 'portraits',
    title: 'Portrait Session',
    description: [
      '45–60 minute on-location session',
      'Natural light, candid and posed shots',
      '1–2 outfit changes recommended',
      '10 professionally retouched high-resolution images included',
      'Optional prints and add-ons available',
    ],
    price: 'From DKK 1500',
  },
  {
    id: 'pet',
    title: 'Pet Session',
    description: [
      '30–45 minute relaxed session focused on your pet',
      'In-home or outdoor location — wherever your pet is most comfortable',
      'Owner can join for shared portraits',
      'Treats/toys encouraged to capture personality',
      '8 edited high-resolution images included',
    ],
    price: 'From DKK 1000',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: [
      'On-location brand and product shoots tailored to your brief',
      'Pre-shoot consultation and shotlist planning',
      'Styling and prop coordination (when required)',
      'Flexible image licensing and usage options',
      'Contact for a bespoke quote',
    ],
    price: 'Contact for quote',
  },
  {
    id: 'landscape',
    title: 'Landscape & Location',
    description: [
      'Location-led shoots timed for optimal light (golden hour/sunrise/sunset)',
      'Scouting and planning for the best viewpoints',
      'Long-exposure and compositional techniques when appropriate',
      'Digital delivery of selected, edited images',
      'Travel included within agreed radius',
    ],
    price: 'From DKK 1200',
  },
];

const addons = [
  {
    id: 'extra-images',
    title: 'Extra edited images',
    description: ['Add 5 additional fully retouched images to your package'],
    price: 'DKK 400',
  },
  {
    id: 'rush',
    title: 'Rush delivery',
    description: ['Faster turnaround — receive edited images within 48 hours'],
    price: 'DKK 800',
  },
  {
    id: 'print-pack',
    title: 'Print pack',
    description: ['High-quality print pack (set of 5) with optional framing'],
    price: 'From DKK 650',
  },
  {
    id: 'extended-time',
    title: 'Extended shoot time',
    description: ['Extend your session by 30 minutes for extra coverage'],
    price: 'DKK 500',
  },
];
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.content-wrapper {
  color: #fff;
  background: $primary;
  min-height: 100vh;
  padding: 24px 0 60px; /* prevent margin-collapse gap by using padding-top */
}

.content { max-width: 980px; margin: 0 auto; padding: 0 18px; }
.section-title { font-size: 22px; margin: 12px 0; }
.lead { color: #cfcfcf; margin-bottom: 18px; }
.student-note { color: #ddd; margin-bottom: 18px; }
.subsection-title { font-size: 18px; margin: 8px 0 6px; color: #fff; font-weight: 600; }
/* Grid layout for service cards (restore previous look) */
.services-list .grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: stretch; /* ensure grid tracks allow children to stretch */
  margin-top: 12px;
}
.services-list .grid > * {
  width: 100%;
  display: flex; /* make each grid cell a flex container so its child card can stretch */
}
.services-list .addons { margin-bottom: 18px; }
</style>
