<template>
  <div class="contact-wrap">
  <section class="hero">
    <h1>Contact Me</h1>
    <p>If you have a question, a collaboration idea, or want to book a shoot, send me a message and I’ll get back to you.</p>
  </section>
  <form class="contact-form" @submit.prevent="submit" novalidate>
    <div class="row">
      <label for="name">Name</label>
      <input id="name" v-model.trim="form.name" type="text" required :class="{ invalid: errors.name }" />
      <small v-if="errors.name" class="error">Please enter your name.</small>
    </div>

    <div class="row">
      <label for="email">Email</label>
      <input id="email" v-model.trim="form.email" type="email" required :class="{ invalid: errors.email }" />
      <small v-if="errors.email" class="error">Please enter a valid email.</small>
    </div>

    <div class="row">
      <label for="subject">Subject</label>
      <input id="subject" v-model.trim="form.subject" type="text" required :class="{ invalid: errors.subject }" />
      <small v-if="errors.subject" class="error">Please enter a subject.</small>
    </div>

    <div class="row">
      <label for="message">Message</label>
      <textarea id="message" v-model.trim="form.message" rows="6" required :class="{ invalid: errors.message }"></textarea>
      <small v-if="errors.message" class="error">Please enter your message.</small>
    </div>

    <div class="actions">
      <button class="submit" type="submit" :disabled="loading">{{ loading ? 'Sending…' : 'Send Message' }}</button>
      <p v-if="status==='success'" class="status success">Thanks! Your message has been sent.</p>
      <p v-if="status==='error'" class="status error">Sorry, something went wrong. Please try again later.</p>
    </div>
  </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios from 'axios';

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

<style scoped>
.contact-wrap {
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 80px; /* keep space above footer when content grows */
  box-sizing: border-box;
}
.hero { max-width: 760px; margin: 0 auto 24px; padding: 0 24px; }
.hero h1 { margin: 0 0 8px; font-size: 28px; }
.hero p { color: #bbb; margin: 0 0 24px; }
.contact-form { max-width: 760px; margin: 0 auto; padding: 0 24px; }
.contact-form .row { margin-bottom: 16px; display: grid; gap: 6px; }
label { font-weight: 600; }
input, textarea { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; width: 100%; }
textarea { line-height: 1.4; min-height: 140px; resize: vertical; overflow: auto; }
input.invalid, textarea.invalid { border-color: #e45757; }
.error { color: #e45757; }
.actions { display: flex; align-items: center; gap: 12px; }
button.submit {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #8a8a8a;
  background: #141414;
  color: #fff;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 120ms ease;
}
button.submit:hover:not(:disabled),
button.submit:focus-visible:not(:disabled) {
  background: #1a1a1a;
  border-color: #b0b0b0;
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
</style>
