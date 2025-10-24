<template>
    <div class="search-reminder q-pa-md">
        <span class="hero-search-reminder">
            Looking for something specific? (e.g Mountains)<br>
            Use the <span class="search-link" @click="triggerSearch">search button</span> in the
            top of the page, to find images by tag!
        </span>
    </div>
</template>

<script setup lang="ts">
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
