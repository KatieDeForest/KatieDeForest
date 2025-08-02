<script setup lang="ts">

const props = defineProps({
  title: { type: String, default: 'Welcome to the Forest' },
  subtitle: { type: String, default: 'Discover the beauty of nature' },
  background: { type: String, default: 'frontpagebanner.jpg' },
});


</script>

<template>
  <section
    class="hero-banner d-flex flex-column justify-content-center align-items-center text-center"
    :style="props.background ? { backgroundImage: `linear-gradient(rgba(34,34,34,0.3),rgba(34,34,34,0.3)), url('/images/${props.background}')`,
    backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' } : {}">
    <h1 class="hero-title mb-2">{{ title }}</h1>
    <p class="hero-subtitle mb-4">{{ subtitle }}</p>
    <slot />
  </section>
</template>

<style scoped>
 .hero-banner {
  min-height: 60vh;
  width: 100%;
  padding: 0 1rem;
  color: #fff;
  position: relative;
  transition: background 0.4s;
  overflow: hidden;
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
