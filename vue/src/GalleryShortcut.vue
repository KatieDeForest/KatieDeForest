

<template>
	<section class="gallery-shortcut bg-dark text-white py-5" aria-label="Gallery shortcuts">
		<div class="container">
			<div v-for="(item, idx) in items" :key="item.id" class="row align-items-center py-4">
				<div
					class="col-12 col-lg-6"
					:class="{ 'order-lg-2': idx % 2 === 0 }"
				>
					<div class="p-4">
						<h3 class="display-6 fw-bold">{{ item.title }}</h3>
						<p class="lead opacity-75">{{ item.description }}</p>
						<button class="btn btn-outline-light mt-3">View Gallery</button>
					</div>
				</div>
				<div class="col-12 col-lg-6" :class="{ 'order-lg-1': idx % 2 === 0 }">
					<div class="image-placeholder rounded shadow-sm mx-auto" :style="{ background: item.color }" role="img" :aria-label="item.title"></div>
				</div>
			</div>
		</div>
	</section>
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