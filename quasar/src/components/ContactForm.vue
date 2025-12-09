<template>
  <div class="contact-wrap">
    <h1 class="form-title">{{ t('contact.title') }}</h1>
    <p class="form-intro">{{ t('contact.formIntro') }}</p>
    <form class="contact-form" @submit.prevent="submit" novalidate>
      <div class="row">
        <label for="name">{{ t('contact.form.nameLabel') }}</label>
        <input id="name" v-model.trim="form.name" type="text" required :placeholder="t('contact.form.namePlaceholder')"
          :class="{ invalid: errors.name }" />
        <small v-if="errors.name" class="error">{{ t('contact.form.validation.nameRequired') }}</small>
      </div>

      <div class="row">
        <label for="email">{{ t('contact.form.emailLabel') }}</label>
        <input id="email" v-model.trim="form.email" type="email" required
          :placeholder="t('contact.form.emailPlaceholder')" :class="{ invalid: errors.email }" />
        <small v-if="errors.email" class="error">{{ t('contact.form.validation.emailRequired') }}</small>
      </div>

      <div class="row">
        <label for="subject">{{ t('contact.form.subjectLabel') }}</label>
        <input id="subject" v-model.trim="form.subject" type="text" required
          :placeholder="t('contact.form.subjectPlaceholder')" :class="{ invalid: errors.subject }" />
        <small v-if="errors.subject" class="error">{{ t('contact.form.validation.subjectRequired') }}</small>
      </div>

      <div class="row">
        <label for="message">{{ t('contact.form.messageLabel') }}</label>
        <textarea id="message" ref="messageEl" v-model.trim="form.message" rows="6" required
          :placeholder="t('contact.form.messagePlaceholder')" :class="{ invalid: errors.message }"
          @input="autoGrow"></textarea>
        <small v-if="errors.message" class="error">{{ t('contact.form.validation.messageRequired') }}</small>
      </div>

      <div class="actions">
        <button class="submit" type="submit" :disabled="loading || !captchaOk">{{ loading ? t('contact.form.sending') :
          t('contact.form.submit') }}</button>
        <div class="captcha-wrap">
          <div ref="recaptchaEl" class="recaptcha"></div>
          <small v-if="!captchaOk" class="captcha-hint">{{ t('contact.form.captchaHint') }}</small>
        </div>
        <p class="legal-tiny">
          {{ t('contact.form.legalPrefix') }}
          <router-link to="/terms">{{ t('contact.form.terms') }}</router-link>
          {{ t('contact.form.and') }}
          <router-link to="/privacy">{{ t('contact.form.privacy') }}</router-link>.
        </p>
        <p v-if="status === 'success'" class="status success">{{ t('contact.form.success') }}</p>
        <p v-if="status === 'error'" class="status error">{{ t('contact.form.error') }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = reactive({ name: '', email: '', subject: '', message: '' });
const errors = reactive<{ [k: string]: boolean }>({ name: false, email: false, subject: false, message: false });
const loading = ref(false);
const status = ref<'idle' | 'success' | 'error'>('idle');
const captchaOk = ref(false);
const recaptchaEl = ref<HTMLDivElement | null>(null);
let recaptchaWidgetId: number | null = null;
let recaptchaScriptEl: HTMLScriptElement | null = null;
let recaptchaToken: string | null = null;
const messageEl = ref<HTMLTextAreaElement | null>(null);
const defaultMinPx = 150;

function autoGrow() {
  const el = messageEl.value;
  if (!el) return;
  el.style.height = 'auto';
  const next = Math.max(el.scrollHeight, defaultMinPx);
  el.style.height = `${next}px`;
  el.style.minHeight = `${defaultMinPx}px`;
  el.style.overflowY = 'hidden';
}

onMounted(() => {
  autoGrow();
  loadRecaptcha();
});

watch(() => form.message, () => {
  requestAnimationFrame(autoGrow);
});
// No auto-resize; use native textarea behavior with CSS min-height and vertical resize

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate() {
  errors.name = !form.name;
  errors.email = !validateEmail(form.email);
  errors.subject = !form.subject;
  errors.message = !form.message;
  return !(errors.name || errors.email || errors.subject || errors.message);
}

async function submit() {
  status.value = 'idle';
  if (!validate()) return;
  if (!captchaOk.value || !recaptchaToken) return;
  loading.value = true;
  try {
    await axios.post('/api/contact', { ...form, recaptchaToken });
    status.value = 'success';
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
    if (recaptchaWidgetId !== null && (window as any).grecaptcha) {
      (window as any).grecaptcha.reset(recaptchaWidgetId);
    }
    recaptchaToken = null;
    captchaOk.value = false;
  } catch {
    status.value = 'error';
  } finally {
    loading.value = false;
  }
}

function loadRecaptcha() {
  if ((window as any).grecaptcha) {
    renderRecaptcha();
    return;
  }
  recaptchaScriptEl = document.createElement('script');
  recaptchaScriptEl.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
  recaptchaScriptEl.async = true;
  recaptchaScriptEl.defer = true;
  document.body.appendChild(recaptchaScriptEl);
  (window as any).onRecaptchaLoad = () => {
    renderRecaptcha();
  };
}

function renderRecaptcha() {
  const siteKey = (import.meta as any).env?.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.warn('Missing VITE_RECAPTCHA_SITE_KEY');
    return;
  }
  if (!recaptchaEl.value || !(window as any).grecaptcha) return;
  recaptchaWidgetId = (window as any).grecaptcha.render(recaptchaEl.value, {
    sitekey: siteKey,
    callback: onRecaptchaSuccess,
    'error-callback': onRecaptchaError,
    'expired-callback': onRecaptchaExpired,
    theme: 'dark',
    size: 'normal',
  });
}

function onRecaptchaSuccess(token: string) {
  recaptchaToken = token;
  captchaOk.value = true;
}
function onRecaptchaExpired() {
  recaptchaToken = null;
  captchaOk.value = false;
}
function onRecaptchaError() {
  recaptchaToken = null;
  captchaOk.value = false;
}

onBeforeUnmount(() => {
  if (recaptchaScriptEl) {
    recaptchaScriptEl.remove();
    recaptchaScriptEl = null;
  }
  (window as any).onRecaptchaLoad = undefined;
});
</script>

<style scoped lang="scss">
.contact-wrap {
  background-color: $primary;
  color: #fff;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.form-title {
  max-width: 760px;
  margin: 0 auto 8px;
  padding: 0 24px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.form-intro {
  max-width: 760px;
  margin: 0 auto 20px;
  padding: 0 24px;
  color: #d6e6d6;
  font-size: 15px;
  line-height: 1.55;
  /* Keep layout stable: prevent wrapping and ellipsize overflow */
  white-space: nowrap;
  overflow: show;
  text-overflow: ellipsis;
}

.contact-form {
  max-width: 760px;
  margin: 0 auto;
  padding: 16px 24px 0px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28), 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  transition: box-shadow 180ms ease, transform 160ms ease;
}

.contact-form .row {
  margin-bottom: 16px;
  display: grid;
  gap: 8px;
}

label {
  font-weight: 600;
}

input,
textarea {
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #e6e6e6;
  background-color: #111;
  border-radius: 12px;
  font-size: 15px;
  width: 100%;
  transition: box-shadow 200ms ease, border-color 180ms ease, transform 120ms ease, background 180ms ease;
}

input::placeholder,
textarea::placeholder {
  color: #9fb79f;
}

textarea {
  line-height: 1.5;
  min-height: 150px;
  resize: vertical;
  overflow: hidden;
}

input.invalid,
textarea.invalid {
  border-color: #e45757;
}

.error {
  color: #e45757;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.captcha-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.captcha-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.captcha-hint {
  color: #9fb79f;
}

.recaptcha {
  min-width: 304px;
  min-height: 78px;
}

button.submit {
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid rgba(57, 255, 20, 0.4);
  background: linear-gradient(180deg, #192019, #141914);
  color: #d8ffd8;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 120ms ease, box-shadow 160ms ease;
}

button.submit:hover:not(:disabled),
button.submit:focus-visible:not(:disabled) {
  background: linear-gradient(180deg, #1b241b, #161d16);
  border-color: rgba(57, 255, 20, 0.65);
  box-shadow: 0 0 0 0.18rem rgba(57, 255, 20, 0.18);
  transform: translateY(-1px);
}

button.submit:active:not(:disabled) {
  transform: translateY(0);
}

button.submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.status.success {
  color: #2e7d32;
}

.status.error {
  color: #c62828;
}

.legal-tiny {
  margin-top: 0;
  font-size: 12px;
  color: #9fb79f;
  flex-basis: 100%;
}

.legal-tiny a {
  color: #cfe8cf;
  text-decoration: underline;
}

.more-ways {
  max-width: 760px;
  margin: 32px auto 0;
  padding: 0 24px;
}

.more-ways h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

/* Glowing focus to match the site's search input aesthetic. Uses a soft green glow. */
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  /* Ring-only focus: thin outer ring without a large halo */
  box-shadow: 0 0 0 0.16rem rgba(57, 255, 20, 0.22);
  border-color: rgba(57, 255, 20, 0.6);
}

/* If field is invalid, keep the red invalid border to take precedence visually */
.contact-form input.invalid:focus,
.contact-form textarea.invalid:focus {
  box-shadow: none;
  border-color: #e45757;
}
</style>
