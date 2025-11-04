<template>
    <div class="search-reminder q-pa-md">
        <span class="hero-search-reminder">
            {{ t('searchReminder.lookingFor') }}<br />
            {{ t('searchReminder.useSearchPrefix') }}
            <span class="search-link" @click="triggerSearch">{{ t('searchReminder.searchButton') }}</span>
            {{ t('searchReminder.useSearchSuffix') }}
        </span>
    </div>
    </template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

function triggerSearch() {
    // dispatch a global event so the header (or any listener) can open the search UI
    window.dispatchEvent(new CustomEvent('open-search'));
}
</script>

<style lang="scss" scoped>
.search-reminder {
    display: flex;
    flex-direction: column;
    background: $primary;
    text-align: center;
}

.hero-search-reminder {
    font-weight: bold;
    color: $accent;
    border-radius: 6px;
    font-size: 1.1rem;
}

.search-link {
    color: $light-accent;
    text-decoration: underline;
    cursor: pointer;
}
</style>
