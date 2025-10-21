<template>
  <div class="error-notfound">
    <div>
      <div class="error-code">404</div>

      <div class="error-message">Oops. Nothing here...</div>

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
//
</script>

<style scoped lang="scss">
/* Replicate Quasar utility classes used previously: fullscreen bg-blue text-white text-center q-pa-md flex flex-center */
.error-notfound {
  height: 100%; /* ensure it fills the viewport */
  box-sizing: border-box;
  width: 100%;
  background-color: $primary; 
  color: #ffffff;
  text-align: center;
  padding: 10px; /* approximate q-pa-md */
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.error-code {
  font-size: 24vh; /* large code size, adjust as needed */
  line-height: 1;
}

.error-message {
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
