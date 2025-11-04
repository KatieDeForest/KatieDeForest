<template>
        <div class="hero-banner q-pa-xl">
                <h1 class="hero-title q-mb-md">{{ title }}</h1>
                <p class="hero-description q-mb-lg">{{ description }}</p>
        </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import useCollections from 'src/composables/useCollections';

const route = useRoute();
const { findCollectionBySlug } = useCollections();

const slugFromRoute = computed(() => (route.params.collection as string) || '');

const { t } = useI18n();

const title = computed(() => {
    const meta = findCollectionBySlug(slugFromRoute.value);
    if (meta) return t(`collections.${meta.slug}.name`) || meta.name;
    return slugFromRoute.value ? slugFromRoute.value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : t('collection.defaultTitle');
});

const description = computed(() => {
    const meta = findCollectionBySlug(slugFromRoute.value);
    if (meta) return t(`collections.${meta.slug}.description`) || meta.description;
    return t('collection.defaultDescription');
});
</script>

<style lang="scss" scoped>
.hero-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $primary;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    min-height: 180px;
    border-bottom: 2px solid $accent;
}

.hero-title {
    color: #fff;
    font-size: 3.5rem;
    letter-spacing: 1px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.hero-description {
    color: #f2f2f2;
    text-align: center;
    font-size: 1.20rem;
    max-width: 650px;
    margin: 0 auto;
}
</style>

