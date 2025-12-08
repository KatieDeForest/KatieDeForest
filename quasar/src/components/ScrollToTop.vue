<template>
  <transition name="stt-fade">
    <button
      v-show="visible"
      class="scroll-to-top"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" fill="currentColor" />
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const visible = ref(false);

// Show when near the bottom of the document (within `bottomThreshold` px)
const bottomThreshold = 80; // px from bottom

function onScroll() {
  const scrolled = window.innerHeight + window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const distanceFromBottom = docHeight - scrolled;
  visible.value = distanceFromBottom <= bottomThreshold;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped lang="scss">
.scroll-to-top {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 84px; /* closer to bottom; still above footer */
  z-index: 9999;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  cursor: pointer;
  transition: transform 160ms ease, opacity 160ms ease, background 200ms ease;
}
.scroll-to-top:hover { transform: translateX(-50%) translateY(-4px); background: rgba(0,0,0,0.75); }

.stt-fade-enter-active, .stt-fade-leave-active { transition: opacity 220ms ease, transform 220ms ease; }
.stt-fade-enter-from, .stt-fade-leave-to { opacity: 0; transform: translateY(8px) translateX(-50%); }
.stt-fade-enter-to, .stt-fade-leave-from { opacity: 1; transform: translateY(0) translateX(-50%); }
</style>
