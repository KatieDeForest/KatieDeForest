<script setup lang="ts">

const props = defineProps({
  title: { type: String, default: 'Welcome to the Forest' },
  subtitle: { type: String, default: 'Discover the beauty of nature' },
  background: { type: String, default: 'banner.jpg' },
});


</script>

<template>
  <section class="hero-banner d-flex flex-column justify-content-center align-items-center text-center">
    <img
      v-if="props.background"
      :src="`/Images/${props.background}`"
      alt="Hero background"
      class="hero-bg-img"
    />
    <h1 class="hero-title mb-2">{{ title }}</h1>
    <p class="hero-subtitle mb-4">{{ subtitle }}</p>
    <slot />
  </section>
</template>

<style scoped>
.hero-banner {
  min-height: 60vh;
  width: 100%;
  padding: 3rem 1rem;
  color: #fff;
  position: relative;
  background: #222;
  transition: background 0.4s;
  overflow: hidden;
}
.hero-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.7;
  pointer-events: none;
}
.hero-title {
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.45);
}
.hero-subtitle {
  font-size: 1.3rem;
  font-weight: 400;
  text-shadow: 0 1px 6px rgba(0,0,0,0.25);
}
</style>
