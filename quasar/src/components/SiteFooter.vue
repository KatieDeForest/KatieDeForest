<template>
  <footer class="site-footer d-flex align-items-center px-4 py-3 position-relative">
    <nav class="footer-links d-flex align-items-center flex-grow-1 justify-content-start">
      <a href="#" class="footer-link mx-2">Home</a>
      <a href="#" class="footer-link mx-2">Gallery</a>
      <a href="#" class="footer-link mx-2">About</a>
      <a href="#" class="footer-link mx-2">Contact</a>
    </nav>
    <!-- Centered brand name, horizontally centered only -->
    <div class="footer-center-brand position-absolute start-50 translate-middle-x d-flex align-items-center justify-content-center" style="top: 0; bottom: 0; height: 100%; transform: translateX(-50%);">
      <span
        class="footer-brand"
        v-bind:style="footerBrandStyle"
      >Katie De Forest</span>
    </div>
    <div class="footer-actions d-flex align-items-center justify-content-end flex-grow-1">
      <button class="footer-icon-btn" aria-label="Search">
        <i class="fa fa-search"></i>
      </button>
      <button class="footer-icon-btn ms-2" aria-label="Account">
        <i class="fa fa-user"></i>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// Match header logo style
const footerBrandStyle = computed(() => ({
  fontFamily: 'CustomLeafFont, serif',
  fontWeight: 500,
  fontStyle: 'italic',
  letterSpacing: '0.08em',
  fontSize: '2.1rem',
  color: 'inherit',
  textShadow: '0 2px 0 #222, 0 6px 14px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f',
  WebkitTextStroke: '0.5px #b5ffb5',
  transition: 'color 0.35s, text-shadow 0.35s',
  // textTransform intentionally omitted for compatibility
}));
</script>

<style scoped>
.site-footer {
  background: #181818;
  color: #fff;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  border-top: 2px solid #2d6a4f;
  min-height: 64px;
  display: flex;
  align-items: center;
  position: relative;
}
.footer-center-brand {
  left: 50%;
  top: 0;
  bottom: 0;
  height: 100%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  pointer-events: none;
}
.footer-links {
  min-width: 0;
}
.footer-logo-img {
  display: none;
}
.footer-brand {
  margin-left: 0.5rem;
}
@font-face {
  font-family: 'CustomLeafFont';
  src: url('/fonts/leavesfont.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
.footer-link {
  color: #b5ffb5;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.footer-link:hover {
  color: #fff;
  text-decoration: underline;
}
.footer-actions {
  min-width: 0;
  justify-content: flex-end;
}
.footer-icon-btn {
  background: none;
  border: none;
  color: #b5ffb5;
  font-size: 1.5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.footer-icon-btn:hover {
  color: #fff;
}
</style>
