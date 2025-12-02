<template>
  <div class="ig-grid" v-if="images.length > 0">
    <div v-for="img in images" :key="img.id" class="ig-item">
      <a :href="img.permalink" target="_blank" rel="noopener">
        <img :src="img.media_url" alt="Instagram image" loading="lazy" />
      </a>
    </div>
  </div>

  <div class="ig-loading" v-else>
    Loading Instagram…
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type IgItem = {
  id: string
  media_url: string
  permalink: string
}

const images = ref<IgItem[]>([])

async function loadFeed(): Promise<void> {
  const apiUrl = 'https://instagram-scraper-stable-api.p.rapidapi.com/get_ig_user_posts.php'

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'instagram-scraper-stable-api.p.rapidapi.com',
      'x-rapidapi-key': 'YHe6sSB2Mtmsh4vfTkqDHXP85YBEp1IBpI5jsnBeSWiRy6p2JQ'
    }
  })

  const data = await response.json()

  // API returns posts under "data.user.edge_owner_to_timeline_media.edges"
  const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges ?? []

  images.value = edges.map((edge: any) => ({
    id: edge.node.id,
    media_url: edge.node.display_url,
    permalink: `https://instagram.com/p/${edge.node.shortcode}`
  }))
}

onMounted(() => {
  void loadFeed()
})
</script>

<style scoped>
.ig-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  padding: 20px;
  background: #0d0d0d;
}

.ig-item img {
  width: 100%;
  border-radius: 8px;
  background: #111;
  object-fit: cover;
  display: block;
}

.ig-loading {
  padding: 40px;
  text-align: center;
  color: #aaa;
}
</style>
