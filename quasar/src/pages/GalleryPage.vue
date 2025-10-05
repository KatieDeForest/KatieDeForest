<script setup lang="ts">
const categories = [
	{ name: 'Featured Album', description: 'A showcase of the best works.' },
	{ name: 'Nature Collection', description: 'Landscapes, wildlife, and more.' },
	{ name: 'Urban Scenes', description: 'City life and architecture.' },
	{ name: 'Studio Works', description: 'Portraits and creative studio shots.' }
];
</script>

<template>
	<div class="gallery-page q-pa-xl flex flex-center column">
		<h1 class="text-h3 q-mb-lg">Gallery Categories</h1>
		<div class="row q-col-gutter-lg q-mb-xl">
			<div v-for="cat in categories" :key="cat.name" class="col-12 col-md-6 col-lg-4 flex flex-center">
				<q-card class="q-pa-md q-hoverable" style="width: 100%; max-width: 350px;">
					<q-card-section>
						<div class="text-h5 q-mb-sm">{{ cat.name }}</div>
						<div class="text-body2 text-grey-6">{{ cat.description }}</div>
					</q-card-section>
					<q-card-actions align="right">
						<q-btn color="primary" label="View" :to="`/gallery/${cat.name.replace(/\s+/g, '-').toLowerCase()}`" />
					</q-card-actions>
				</q-card>
			</div>
		</div>
	</div>
</template>

<style scoped>
.gallery-page {
	min-height: 80vh;
	background: #181818;
}
</style>
