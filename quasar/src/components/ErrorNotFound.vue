<template>
  <div class="error-wrapper">
      <div class="error-header">{{ title }}</div>

      <div class="error-description">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
}>(), {
  title: '404: Page not found',
  description: 'Oops. Nothing here...'
});

const { title, description } = props;
</script>

<style scoped lang="scss">
.error-wrapper {
  /* absolutely center the content within the page without changing page height
     This positions the title/description in the middle of the viewport while
     keeping the overall layout (and other siblings like SearchReminder) intact. */
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $primary;
  color: #ffffff;
  padding: 16px;
  box-sizing: border-box;
}

.error-header {
  box-sizing: border-box;
  font-size: 6vh;
}

.error-description {
  font-size: 3vh;
  opacity: 0.4;
}
.error-btn:hover,
.error-btn:focus {
  background: #f4f4f4;
}
</style>
