<template>
  <footer class="site-footer px-4 py-3 position-relative">
    <div class="footer-inner mx-auto d-flex flex-row justify-content-between align-items-start w-100">
      <div class="d-flex flex-column">
        <span class="footer-brand" v-bind:style="footerBrandStyle">Katie De Forest</span>
        <span class="footer-description mt-2" v-html="footerDescription"></span>
      </div>
    <span class="footer-cvr">{{ t('footer.cvr') }}</span>
    <span class="footer-copyright">{{ copyright }}</span>
      <div class="footer-links-legal d-flex flex-row align-items-start">
        <nav class="footer-links d-flex flex-column align-items-end me-4">
          <a href="#" class="footer-link">{{ t('footer.links.gallery') }}</a>
          <a href="#" class="footer-link">{{ t('footer.links.about') }}</a>
          <a href="#" class="footer-link">{{ t('footer.links.contact') }}</a>
          <router-link to="/services" class="footer-link">{{ t('nav.services') }}</router-link>
        </nav>
        <nav class="footer-legal-links d-flex flex-column align-items-end">
          <a href="#" class="footer-link legal">{{ t('footer.legal.privacy') }}</a>
          <a href="#" class="footer-link legal">{{ t('footer.legal.terms') }}</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const footerBrandStyle = computed(() => ({
  fontFamily: 'CustomLeafFont, serif',
  fontWeight: 500,
  fontStyle: 'italic',
  letterSpacing: '0.08em',
  fontSize: '1.6rem',
  color: 'inherit',
  textShadow: '0 2px 0 #222, 0 6px 14px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f',
  WebkitTextStroke: '0.5px #b5ffb5',
  transition: 'color 0.35s, text-shadow 0.35s',
}));

const footerDescription = computed(() => t('footer.description').replace(/\n/g, '<br>'));
const year = new Date().getFullYear();
const copyright = computed(() => t('footer.copyright', { year }));
</script>

<style lang="scss" scoped>
.footer-copyright {
  font-size: 0.85rem;
  color: #b5ffb5;
  text-align: center;
  letter-spacing: 0.02em;
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  width: max-content;
  margin: 0;
  z-index: 10;
}
.site-footer {
  background: #181818;
  color: #fff;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  border-top: 2px solid #2d6a4f;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}
.footer-inner {
  max-width: 1300px;
  gap: 1.2rem;
}
.footer-links-legal {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.5rem;
}
.footer-description {
  font-size: 1.08rem;
  color: #b5ffb5;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-weight: 400;
  letter-spacing: 0.01em;
  margin-top: 0.3rem;
}
.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.footer-link {
  color: #7fff7f;
  text-decoration: none;
  font-size: 0.98rem;
  transition: color 0.2s;
  margin-bottom: 0.18rem;
}
.footer-link:hover {
  color: #fff;
  text-decoration: underline;
}
.footer-legal-group {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.footer-link-item {
  color: #b5ffb5;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
  margin-bottom: 0.25rem;
}
.footer-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 2;
}
.footer-copyright {
  font-size: 0.85rem;
  color: #b5ffb5;
  text-align: center;
  letter-spacing: 0.02em;
  pointer-events: auto;
}
.footer-divider {
  border: none;
  border-top: 1.2px solid #39ff14;
  width: 80%;
  margin: 0 auto 0.3rem auto;
}
.footer-brand {
  font-size: 1.6rem;
  font-family: 'CustomLeafFont', serif;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0.08em;
  color: inherit;
  text-shadow: 0 2px 0 #222, 0 6px 14px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f;
  -webkit-text-stroke: 0.5px #b5ffb5;
  transition: color 0.35s, text-shadow 0.35s;
  margin-bottom: 0.3rem;
}
.footer-cvr {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2.6rem; /* sits just above the copyright line */
  color: #b5ffb5;
  font-size: 0.95rem;
  pointer-events: auto;
  z-index: 10;
}
@font-face {
  font-family: 'CustomLeafFont';
  src: url('/fonts/leavesfont.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
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
