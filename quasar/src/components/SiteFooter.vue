<template>
  <footer class="site-footer px-4 py-3 position-relative">
    <div class="footer-inner mx-auto d-flex flex-row justify-content-between align-items-start w-100">
      <div class="d-flex flex-column">
          <span class="footer-brand clickable" v-bind:style="footerBrandStyle" role="link" tabindex="0" @click="goHome" @keydown.enter="goHome">Katie De Forest</span>
        <span class="footer-description" v-html="footerDescription"></span>
      </div>
    <span class="footer-cvr">{{ t('footer.cvr') }}</span>
    <span class="footer-copyright">{{ copyright }}</span>
      <div class="footer-links-legal d-flex flex-row align-items-start">
        <nav class="footer-links d-flex flex-column align-items-end me-4">
          <router-link to="/gallery" class="footer-link">{{ t('footer.links.gallery') }}</router-link>
          <router-link to="/services" class="footer-link">{{ t('nav.services') }}</router-link>
          <router-link to="/about" class="footer-link">{{ t('footer.links.about') }}</router-link>
          <router-link to="/contact" class="footer-link">{{ t('footer.links.contact') }}</router-link>
        </nav>
        <nav class="footer-legal-links d-flex flex-column align-items-end">
          <router-link to="/privacy" class="footer-link legal">{{ t('footer.legal.privacy') }}</router-link>
          <router-link to="/terms" class="footer-link legal">{{ t('footer.legal.terms') }}</router-link>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { t } = useI18n();
const router = useRouter();
function goHome() { void router.push('/'); }

const footerBrandStyle = computed(() => ({
  fontFamily: 'CustomLeafFont, serif',
  fontWeight: 500,
  fontStyle: 'italic',
  letterSpacing: '0.08em',
  fontSize: '2rem',
  color: 'inherit',
  textShadow: '0 2px 0 #222, 0 6px 14px #000, 0 0 8px #39ff14, 0 0 2px #7fff7f',
  WebkitTextStroke: '0.5px #b5ffb5',
  transition: 'color 0.35s, text-shadow 0.35s',
  marginBottom: '0rem',
}));

const footerDescription = computed(() => t('footer.description').replace(/\n/g, '<br>'));
const year = new Date().getFullYear();
const copyright = computed(() => t('footer.copyright', { year }));
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

.site-footer {
  background: #181818;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  border-top: 2px solid $light-accent;
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
  margin-left: auto;
  margin-right: auto;
  gap: 1.2rem;
}

.footer-link { color: $accent; }

.footer-links-legal {
  display: flex;
  align-items: flex-start;
}

.footer-description {
  font-size: 1.08rem;
  color: $footer;
  font-family: 'Montserrat', 'Roboto', sans-serif;
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-top: 0.3rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.footer-link {
  color: $footer;
  text-decoration: none;
  font-size: 0.98rem;
  transition: color 0.2s;
  margin-bottom: 0.18rem;
}
.footer-link:hover {
  text-decoration: underline;
  color: #fff;
}

.footer-legal-group {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.footer-copyright {
  font-size: 0.85rem;
  color: $footer;
  text-align: center;
  letter-spacing: 0.02em;
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  width: max-content;
  margin: 0;
  z-index: 10;
  pointer-events: auto;
}

.footer-cvr {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2.6rem;
  color: $footer;
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
.clickable { cursor: pointer; }
</style>
