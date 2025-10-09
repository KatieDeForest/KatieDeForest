
<script lang="ts">
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
</script>


<template>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const items = reactive([
	{ id: 1, title: 'Featured Album', description: 'A short intro to the first gallery section.', color: 'linear-gradient(135deg,#2d6a4f,#134e4a)' },
	{ id: 2, title: 'Nature Collection', description: 'A short intro to the second gallery section.', color: 'linear-gradient(135deg,#1b4332,#0f5132)' },
	{ id: 3, title: 'Urban Scenes', description: 'A short intro to the third gallery section.', color: 'linear-gradient(135deg,#40916c,#265b48)' },
	{ id: 4, title: 'Studio Works', description: 'A short intro to the fourth gallery section.', color: 'linear-gradient(135deg,#52b788,#2f8a63)' }
]);
</script>

<style scoped>
.gallery-shortcut { background-color: #111; }
.image-placeholder {
	width: 100%;
	height: 260px;
	background-size: cover;
	background-position: center;
}
@media (min-width: 992px) {
	.image-placeholder { height: 320px; }
}
</style>