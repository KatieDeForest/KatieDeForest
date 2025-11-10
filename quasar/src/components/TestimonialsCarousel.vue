<template>
    <section class="testimonials">
        <div class="testimonials-inner">
            <h2 class="section-title">Collectors & Curators</h2>
            <div class="carousel">
                <div v-for="(t, idx) in testimonials" :key="idx" class="testimonial"
                    :class="{ active: idx === active }">
                    <blockquote>
                        “{{ t.quote }}”
                    </blockquote>
                    <div class="author">— {{ t.author }}, {{ t.role }}</div>
                </div>
                <div class="controls">
                    <button class="ctrl" @click="prev" aria-label="Previous testimonial">‹</button>
                    <button class="ctrl" @click="next" aria-label="Next testimonial">›</button>
                </div>
                <div class="dots">
                    <span v-for="(t, i) in testimonials" :key="'dot-' + i" :class="['dot', { active: i === active }]"
                        @click="active = i" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface Testimonial { quote: string; author: string; role: string }
const testimonials: Testimonial[] = [
    { quote: 'Subtle, immersive, and beautifully printed. A calm presence in our collection.', author: 'Elena M.', role: 'Private Collector' },
    { quote: 'Her handling of low light and fog feels like visual poetry.', author: 'Gallery Nord', role: 'Curatorial Team' },
    { quote: 'A distinct voice in contemporary nature work—quiet yet confident.', author: 'Annika S.', role: 'Arts Writer' }
];
const active = ref(0);
function next() { active.value = (active.value + 1) % testimonials.length; }
function prev() { active.value = (active.value - 1 + testimonials.length) % testimonials.length; }
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.testimonials {
    background: linear-gradient(145deg, #161d17, #101010);
    padding: 3.5rem 1rem;
    color: #f3f7f5;
}

.testimonials-inner {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

.section-title {
    font-size: 1.7rem;
    margin-bottom: 2rem;
}

.carousel {
    position: relative;
}

.testimonial {
    opacity: 0;
    transform: translateY(16px);
    transition: all 420ms cubic-bezier(.2, .9, .2, 1);
    position: absolute;
    left: 0;
    right: 0;
}

.testimonial.active {
    opacity: 1;
    transform: translateY(0);
    position: relative;
}

blockquote {
    font-size: 1.2rem;
    line-height: 1.55;
    font-style: italic;
    margin: 0 0 1rem;
}

.author {
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    opacity: 0.85;
}

.controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    pointer-events: none;
}

.ctrl {
    pointer-events: auto;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    border: none;
    font-size: 1.8rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.25s;
}

.ctrl:hover {
    background: rgba(0, 0, 0, 0.6);
}

.dots {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.dot {
    width: 10px;
    height: 10px;
    background: #2e3a2e;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.25s, background 0.25s;
}

.dot.active {
    background: #49d789;
    transform: scale(1.6);
}
</style>
