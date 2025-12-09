<template>
  <article class="service-card">
    <h3 class="title">{{ title }}</h3>

    <div class="desc">
      <ul v-if="Array.isArray(description)">
        <li v-for="(line, i) in description" :key="i">{{ line }}</li>
      </ul>
      <p v-else>{{ description }}</p>
    </div>

    <div class="meta">{{ price }}</div>
  </article>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string | string[]; price?: string | undefined }>();
</script>

<style scoped>
.service-card {
  background: #0f1111;
  border: 1px solid rgba(255,255,255,0.04);
  padding: 18px;
  border-radius: 12px;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%; /* let card fill the grid cell */
  box-shadow: 0 6px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.02);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.55);
}
.service-card .title { margin: 0 0 10px; font-size: 1.18rem; letter-spacing: 0.01em; }
.service-card .desc { color: #cfcfcf; margin-bottom: 12px; flex: 1 1 auto; }
.service-card .desc p { margin: 0; color: #cfcfcf; }
.service-card .desc ul {
  margin: 0;
  padding: 0 0 0 1rem;
  list-style: none;
}
.service-card .desc ul li {
  position: relative;
  padding-left: 12px;
  margin-bottom: 8px;
  line-height: 1.38;
  color: #d7d7d7;
}
.service-card .desc ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 7px;
  height: 7px;
  background: #9adf9a;
  border-radius: 50%;
  transform: translateY(-50%);
}
.service-card .meta {
  color: #9adf9a;
  font-weight: 700;
  margin-top: 14px;
  margin-left: 0;
  align-self: flex-start;
  background: rgba(154,223,154,0.06);
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 0.98rem;
}
</style>
