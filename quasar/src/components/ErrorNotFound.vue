<template>
  <div class="error-wrapper">
    <div class="error-inner">
      <div class="error-header">{{ title }}</div>

      <div class="error-description">{{ description }}</div>

      <q-btn
        class="error-btn"
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
}>(), {
  title: '404',
  description: 'Oops. Nothing here...'
});

const { title, description } = props;
</script>

<style scoped lang="scss">
/* Replicate Quasar utility classes used previously: fullscreen bg-blue text-white text-center q-pa-md flex flex-center */
.error-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: $primary;
  color: #ffffff;
  padding: 0;
  z-index: 10;
}

.error-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 16px;
  box-sizing: border-box;
}

.error-header {
  box-sizing: border-box;
  font-size: 24vh; /* large code size, adjust as needed */
}

.error-description {
  opacity: 0.4;
}

/* Button styles for the 404 page (replicate unelevated white button with blue text) */
.error-btn {
  margin-top: 1.25rem; /* approximate q-mt-xl */
  background: #ffffff;
  color: #027be3; /* quasar blue */
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-transform: none; /* replicate no-caps */
  box-shadow: none; /* unelevated */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.error-btn:hover,
.error-btn:focus {
  background: #f4f4f4;
}
</style>
