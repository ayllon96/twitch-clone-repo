<template>
  <div class="home">
    <h2 class="home__heading">Streams Recomendados</h2>
    <div class="home__grid">
      <div v-for="stream in streams" :key="stream.id" class="home__card">
        <NuxtLink :to="`/stream/${stream.user_id}`">
          <img :src="stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')" alt="Stream" class="home__thumb" />
          <p class="home__title">{{ stream.user_name }}</p>
        </NuxtLink>
      </div>
    </div>

    <h2 class="home__heading">Categorías Populares</h2>
    <div class="home__categories">
      <div v-for="category in categories" :key="category.id" class="home__category">
        <img :src="category.box_art_url.replace('{width}', '285').replace('{height}', '380')" alt="Category" class="home__category-img" />
        <p class="home__category-name">{{ category.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/lib/twitch-api'

const streams = ref([])
const categories = ref([])

onMounted(async () => {
  const api = await TwitchAPI.getInstance()
  const [streamsResult, categoriesResult] = await Promise.all([
    api.getStreams(),
    api.getCategories()
  ])

  streams.value = streamsResult.data
  categories.value = categoriesResult.data
})
</script>

<style lang="scss" scoped>
.home {
  &__heading {
    font-size: 2rem;
    color: white;
    margin-bottom: 1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  &__card {
    background: #1f1f23;
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
    text-align: center;
  }

  &__thumb {
    width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: 1rem;
  }

  &__categories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1.5rem;
  }

  &__category {
    text-align: center;
    color: white;
  }

  &__category-img {
    width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  &__category-name {
    font-size: 1rem;
  }
}
</style>