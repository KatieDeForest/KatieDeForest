<template>
  <section class="gear-list">
    <div class="gear-inner">
      <h2 class="section-title">Field Kit</h2>
      <div class="grid">
        <div v-for="g in gear" :key="g.name" class="gear-item">
          <div class="top">
            <q-icon :name="g.icon" />
            <div class="name">{{ g.name }}</div>
          </div>
          <div class="desc">{{ g.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Gear { name: string; desc: string; icon: string }
const gear: Gear[] = [
  { name: 'ASP-C body', desc: 'High dynamic range for pre-dawn scenes.', icon: 'photo_camera' },
  { name: '24–70mm f/2.8', desc: 'Walkabout lens for evolving light.', icon: 'lens' },
  { name: '70–200mm', desc: 'Compression for fog layers and distant forms.', icon: 'center_focus_strong' },
  { name: 'Prime 50mm', desc: 'For intimate textures and series consistency.', icon: 'filter_center_focus' },
  { name: 'Carbon tripod', desc: 'Long exposures without compromise.', icon: 'hdr_strong' },
  { name: 'ND + CPL filters', desc: 'Control reflections and extend time.', icon: 'tonality' }
];
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.gear-list {
  background: $primary;
  padding: 3rem 1rem;
  color: #f2f2f2;
}

.gear-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.7rem;
  margin-bottom: 1.25rem;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.gear-item {
  background: #1b1b1b;
  border: 1px solid #2b3a2b;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 10px 24px #0009;
}

.top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.name {
  font-weight: 600;
}

.desc {
  opacity: 0.9;
}
</style>
