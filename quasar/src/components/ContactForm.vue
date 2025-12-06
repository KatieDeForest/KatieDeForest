<template>
  <div class="contact-wrap">
  <h1 class="form-title">{{ t('contact.title') }}</h1>
  <p class="form-intro">{{ t('contact.formIntro') }}</p>
  <form class="contact-form" @submit.prevent="submit" novalidate>
    <div class="row">
  <label for="name">{{ t('contact.form.nameLabel') }}</label>
  <input id="name" v-model.trim="form.name" type="text" required :placeholder="t('contact.form.namePlaceholder')" :class="{ invalid: errors.name }" />
  <small v-if="errors.name" class="error">{{ t('contact.form.validation.nameRequired') }}</small>
    </div>

    <div class="row">
  <label for="email">{{ t('contact.form.emailLabel') }}</label>
  <input id="email" v-model.trim="form.email" type="email" required :placeholder="t('contact.form.emailPlaceholder')" :class="{ invalid: errors.email }" />
  <small v-if="errors.email" class="error">{{ t('contact.form.validation.emailRequired') }}</small>
    </div>

    <div class="row">
  <label for="subject">{{ t('contact.form.subjectLabel') }}</label>
  <input id="subject" v-model.trim="form.subject" type="text" required :placeholder="t('contact.form.subjectPlaceholder')" :class="{ invalid: errors.subject }" />
  <small v-if="errors.subject" class="error">{{ t('contact.form.validation.subjectRequired') }}</small>
    </div>

    <div class="row">
  <label for="message">{{ t('contact.form.messageLabel') }}</label>
  <textarea id="message" v-model.trim="form.message" rows="6" required :placeholder="t('contact.form.messagePlaceholder')" :class="{ invalid: errors.message }"></textarea>
  <small v-if="errors.message" class="error">{{ t('contact.form.validation.messageRequired') }}</small>
    </div>

    <div class="actions">
  <button class="submit" type="submit" :disabled="loading">{{ loading ? t('contact.form.sending') : t('contact.form.submit') }}</button>
  <p v-if="status==='success'" class="status success">{{ t('contact.form.success') }}</p>
  <p v-if="status==='error'" class="status error">{{ t('contact.form.error') }}</p>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = reactive({ name: '', email: '', subject: '', message: '' });
const errors = reactive<{[k:string]: boolean}>({ name: false, email: false, subject: false, message: false });
const loading = ref(false);
const status = ref<'idle'|'success'|'error'>('idle');
// Provide your recent Instagram post URLs here (the permalink URLs)
// Using profile embed; no post URL list needed here

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
  loading.value = true;
  try {
    await axios.post('/api/contact', { ...form });
    status.value = 'success';
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
  } catch {
    status.value = 'error';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.contact-wrap {
  background-color: $primary;
  color: #fff;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 80px; /* keep space above footer when content grows */
  box-sizing: border-box;
}
.form-title { max-width: 760px; margin: 0 auto 8px; padding: 0 24px; font-size: 26px; font-weight: 700; letter-spacing: 0.01em; }
.form-intro { max-width: 760px; margin: 0 auto 20px; padding: 0 24px; color: #d6e6d6; font-size: 15px; line-height: 1.55; }
.contact-form { max-width: 760px; margin: 0 auto; padding: 16px 24px 20px; background: rgba(0,0,0,0.22); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; box-shadow: 0 14px 28px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.04); transition: box-shadow 180ms ease, transform 160ms ease; }
.contact-form .row { margin-bottom: 16px; display: grid; gap: 8px; }
label { font-weight: 600; }
input, textarea { padding: 12px 14px; border: 1px solid rgba(255,255,255,0.22); color: #e6e6e6; background-color: #111; border-radius: 12px; font-size: 15px; width: 100%; transition: box-shadow 200ms ease, border-color 180ms ease, transform 120ms ease, background 180ms ease; }
input::placeholder, textarea::placeholder { color: #9fb79f; }
textarea { line-height: 1.5; min-height: 150px; resize: vertical; overflow: auto; }
input.invalid, textarea.invalid { border-color: #e45757; }
.error { color: #e45757; }
.actions { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
button.submit {
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid rgba(57,255,20,0.4);
  background: linear-gradient(180deg, #192019, #141914);
  color: #d8ffd8;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 120ms ease, box-shadow 160ms ease;
}
button.submit:hover:not(:disabled),
button.submit:focus-visible:not(:disabled) {
  background: linear-gradient(180deg, #1b241b, #161d16);
  border-color: rgba(57,255,20,0.65);
  box-shadow: 0 0 0 0.18rem rgba(57,255,20,0.18);
  transform: translateY(-1px);
}
button.submit:active:not(:disabled) {
  transform: translateY(0);
}
button.submit:disabled { opacity: 0.6; cursor: default; }
.status.success { color: #2e7d32; }
.status.error { color: #c62828; }
.more-ways { max-width: 760px; margin: 32px auto 0; padding: 0 24px; }
.more-ways h2 { font-size: 20px; margin-bottom: 8px; }

/* Glowing focus to match the site's search input aesthetic. Uses a soft green glow. */
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  /* Ring-only focus: thin outer ring without a large halo */
  box-shadow: 0 0 0 0.16rem rgba(57,255,20,0.22);
  border-color: rgba(57,255,20,0.6);
}

/* If field is invalid, keep the red invalid border to take precedence visually */
.contact-form input.invalid:focus,
.contact-form textarea.invalid:focus {
  box-shadow: none;
  border-color: #e45757;
}
</style>
