<template>
  <section id="about-bio" class="about-bio">
    <div class="about-bio-inner">
      <div class="side-column">
        <div class="portrait">
        <template v-if="hasPortrait">
          <q-img :src="portraitSrc" alt="Artist portrait" ratio="4/3" class="portrait-img" />
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
        <div class="experience-block bio-section" data-label="Experience">
          <p>{{ yearsExperience }} years behind the lens</p>
        </div>
          <div class="bio-section" data-label="Quote">
            <p>
              - Love everyone until else has been proven.

            </p>
          </div>
      </div>
      <div class="bio-flow">
        <h2 class="section-title">About Katie</h2>
        <div class="bio-sections">
          <div class="bio-section" data-label="About">
            <p>
              I’m Katie, a 2000s kid from Denmark who feels most at home around nature, animals, open landscapes, and the
              kind of quiet that lets you breathe. Nature grounds me. Travel wakes me up. Photography sits right in the
              middle of those two things, giving me a place to explore and a place to rest.
            </p>
            <p>
              I’m a chill, respectful, easy-going trans woman who tends to see the world in textures and small details.
              My autism shapes how I notice things, how I slow down, and how I read the atmosphere around me. It isn’t a
              “superpower”, it’s simply part of how I move through the world, and it naturally shows up in my work.
            </p>
          </div>
          <div class="bio-section" data-label="Style">
            <p>
              My style leans toward the subtle and the understated. I like honest light, real expressions, and the moments
              that happen in between the expected ones.
              My attention often goes to things that feel overlooked or quiet: how a forest
              holds its breath right before sunrise, how an animal pauses when it thinks no one is watching, how a scene
              shifts the moment you stop trying to control it.
            </p>
          </div>
          <div class="bio-section" data-label="Approach">
            <p>
              I think in fragments and instinct. I follow curiosity wherever it pulls, even when the path isn’t obvious.
              That’s what guides my images. Sometimes the result is soft, sometimes raw, sometimes dreamlike, but it’s
              always sincere. I aim to make space for people who appreciate the offbeat, the gentle, and the quietly
              emotional.
            </p>
          </div>
          <div class="bio-section" data-label="Values">
            <p>
              I’m not interested in perfection as a goal. What interests me is authenticity, atmosphere, and the
              complexity of real moments.
              I believe people and places carry many layers, and that this depth is what makes them beautiful.
            </p>
            <p>
              If any of this resonates with you, then we’re already speaking the same language. I lead with softness, stay
              curious, and try to create work that feels quietly meaningful.
            </p>
          </div>
        </div>
        <div class="bullets">
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
  background: $primary;
  padding: 3.75rem 1.25rem 6rem;
  color: #f2f2f2;
  position: relative;
  overflow: hidden;
}

.about-bio-inner {
  /* Fill more of the screen on large displays, similar to GalleryGrid */
  width: 86%;
  max-width: 1200px; /* cap for typical 1080p so content doesn't over-expand */
  margin: 0 auto;
  display: grid;
  grid-template-columns: clamp(240px, 24vw, 360px) 1fr; /* portrait scales with viewport */
  gap: 2.5rem 3rem;
  align-items: start;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 2rem; /* a bit more space below title */
}

.bio-sections {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin-top: 0.25rem;
}

.bio-section {
  position: relative;
  padding: 0.55rem 0 0rem 0.85rem; /* more top padding so label chip clears text */
  border-left: 2px dashed #2b3a2b;
}

.bio-section::before {
  content: attr(data-label);
  position: absolute;
  top: -0.85rem; /* lift chip further up so it no longer overlaps */
  left: 0.65rem;
  background: #1b1b1b;
  border: 1px solid #2b3a2b;
  color: #dfeee6;
  font-size: 0.8rem;
  line-height: 1;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  box-shadow: 0 4px 10px #0007;
}

.bio-section p {
  margin: 0.4rem 0 0.65rem;
  line-height: 1.6;
}
/* remove alternating alignment classes */

/* remove mobile alt-flow adjustments (no longer needed) */

.bio-section p:last-child {
  margin-bottom: 0;
}

.portrait {
  position: relative;
  width: 100%;
}
.side-column {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

/* Add a bit more separation between the portrait and experience section */
.experience-block {
  margin-top: 0.75rem; /* subtle extra spacing below portrait */
}

.portrait-img {
  border-radius: 22px;
  box-shadow: 0 14px 36px -6px #000c, 0 0 0 1px #2a3a2a;
  position: relative;
  z-index: 1;
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
  gap: 1rem;
  margin-top: 1.25rem;
}

.bullet {
  background: #1b1b1b;
  border: 1px solid #2b3a2b;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 10px 24px #0009;
}

/* Readability silhouette behind the bio text */
.bio {
  position: relative;
}

/* legacy class retained (no longer used for layout) */
/* .bio-silhouette retained for potential future hooks */
/* (intentionally left without layout styles) */

.bio-flow .section-title {
  margin-top: 0;
}

/* old selector retained for backward compat */
/* legacy paragraph selector intentionally left blank */

@media (max-width: 900px) {
  .bio-silhouette {
    padding: 0;
  }
}

@media (max-width: 900px) {
  .about-bio-inner {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }
  .side-column {
    flex-direction: row;
    gap: 1.25rem;
    align-items: flex-start;
  }
  .portrait { max-width: 220px; }
  .about-bio { padding: 3rem 1rem 2.75rem; }
}
</style>
