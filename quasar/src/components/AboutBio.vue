<template>
  <section id="about-bio" class="about-bio">
    <div class="about-bio-inner">
      <div class="portrait">
        <template v-if="hasPortrait">
          <q-img :src="portraitSrc" alt="Artist portrait" ratio="4/5" class="portrait-img" />
        </template>
        <template v-else>
          <div class="portrait-placeholder" aria-label="Portrait placeholder">
            <div class="placeholder-inner">
              <div class="circle"></div>
              <div class="line line-1"></div>
              <div class="line line-2"></div>
              <div class="hint-text">Portrait coming soon</div>
            </div>
          </div>
        </template>
      </div>
      <div class="bio">
        <h2 class="section-title">About Katie</h2>
        <p class="lead">I’m a nature-first fine art photographer exploring the soft geometry of light and the stories
          found in stillness.</p>
        <p>
          Based in Scandinavia, my work blends contemplative landscape with intimate details—driftwood, moss,
          fog—seeking the quiet moments between seasons.
          I create limited series prints and collections for galleries and private collectors.
        </p>
        <div class="bullets">
          <div class="bullet"><q-icon name="photo_camera" class="q-mr-sm" /> {{ yearsExperience }} years behind the lens
          </div>
          <div class="bullet"><q-icon name="diversity_3" class="q-mr-sm" /> Neurodivergent & LGBTQIA+ affirming safe
            space
          </div>
          <div class="bullet"><q-icon name="tonality" class="q-mr-sm" /> Soft natural light; minimal retouching</div>
          <div class="bullet"><q-icon name="handshake" class="q-mr-sm" /> Collaborative, transparent process</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

interface Props {
  portraitUrl?: string;
}
const props = defineProps<Props>();

const portraitSrc = computed(() => props.portraitUrl || '');
const hasPortrait = computed(() => !!portraitSrc.value);

// Start date: July 15, 2019 (month is 0-indexed)
const startDate = new Date(2019, 6, 15);
const now = ref(new Date());

const yearsExperience = computed(() => {
  let years = now.value.getFullYear() - startDate.getFullYear();
  const anniversaryThisYear = new Date(now.value.getFullYear(), startDate.getMonth(), startDate.getDate());
  if (now.value < anniversaryThisYear) years--;
  return years < 0 ? 0 : years; // safety guard
});

let timer: number | undefined;
onMounted(() => {
  // Schedule an update right after the next anniversary passes.
  function scheduleNextUpdate() {
    const current = new Date();
    const hasPassedAnniversary = (
      current.getMonth() > startDate.getMonth() ||
      (current.getMonth() === startDate.getMonth() && current.getDate() >= startDate.getDate())
    );
    const targetYear = hasPassedAnniversary ? current.getFullYear() + 1 : current.getFullYear();
    const nextAnniversary = new Date(targetYear, startDate.getMonth(), startDate.getDate(), 0, 0, 5); // add 5s buffer
    const msUntil = nextAnniversary.getTime() - current.getTime();
    timer = window.setTimeout(() => {
      now.value = new Date();
      scheduleNextUpdate();
    }, msUntil);
  }
  scheduleNextUpdate();
});

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer);
});
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.about-bio {
  background: linear-gradient(90deg, #0c0c0c 50%, #1e241e, #121212 50%);
  padding: 3.75rem 1.25rem 3.5rem;
  color: #f2f2f2;
  position: relative;
  overflow: hidden;
}

.about-bio:before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50%, rgba(90, 190, 140, 0.28), transparent 50%);
  pointer-events: none;
}

.about-bio-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr 1.25fr;
  align-items: center;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
}

.lead {
  font-size: 1.125rem;
  opacity: 0.92;
}

.portrait {
  position: relative;
}

.portrait-img {
  border-radius: 22px;
  box-shadow: 0 14px 36px -6px #000c, 0 0 0 1px #2a3a2a;
  position: relative;
  z-index: 1;
}

.portrait:before {
  content: '';
  position: absolute;
  inset: -8%;
  background: radial-gradient(circle at 50% 40%, rgba(80, 180, 130, 0.42), transparent 70%);
  filter: blur(38px) opacity(.7);
  z-index: 0;
}

.portrait-placeholder {
  position: relative;
  width: 100%;
  padding-top: 125%;
  border-radius: 22px;
  background: linear-gradient(135deg, #1c1f1c, #121412 60%, #181818);
  box-shadow: 0 14px 36px -6px #000c, 0 0 0 1px #2a3a2a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-placeholder:before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, rgba(80, 180, 130, 0.32), transparent 70%);
  filter: blur(36px) opacity(.55);
}

.placeholder-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  z-index: 2;
  color: #d6e9dc;
  font-size: .85rem;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #232323;
  box-shadow: 0 0 0 2px #2a3a2a, 0 6px 16px #000a;
  margin-bottom: 1.1rem;
}

.line {
  width: 80%;
  height: 6px;
  border-radius: 3px;
  background: #202820;
  margin-bottom: .5rem;
  position: relative;
  overflow: hidden;
}

.line:after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(80, 180, 130, 0), rgba(80, 180, 130, 0.35), rgba(80, 180, 130, 0));
  animation: shimmer 2.4s linear infinite;
}

.line-1 {
  width: 70%;
}

.line-2 {
  width: 55%;
  margin-bottom: 1.2rem;
}

.hint-text {
  opacity: .55;
  font-weight: 600;
  letter-spacing: .08em;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.bullets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.bullet {
  background: #1f1f1f;
  border: 1px solid #2e3c2e;
  padding: 0.75rem 1rem;
  border-radius: 12px;
}

@media (max-width: 900px) {
  .about-bio-inner {
    grid-template-columns: 1fr;
  }

  .about-bio {
    padding: 3rem 1rem 2.75rem;
  }

  .portrait:before {
    inset: -12%;
  }

  .portrait-placeholder {
    padding-top: 125%;
  }
}
</style>
