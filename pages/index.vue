<script setup lang="ts">
  import { useTwitch } from '@/composables/useTwitch'
  import StreamCard from '@/components/sections/StreamCard.vue'
  import CategoryCard from '@/components/sections/CategoryCard.vue'
  import CategoryButtons from '@/components/sections/CategoryButtons.vue'

  const { streams, categories, fetchData } = useTwitch()

  onMounted(() => {
    fetchData()
  })
</script>

<template>
  <section class="home">
    <h2 class="home__heading">
      <span class="home__heading--highlight">Live channels</span>
      we think you'll like
    </h2>

    <section class="home__grid">
      <StreamCard v-for="stream in streams" :key="stream.id" :stream="stream" />
    </section>

    <h2 class="home__heading">
      <span class="home__heading--highlight">Categories</span>
      we think you'll like
    </h2>

    <section class="home__categories">
      <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
    </section>

    <CategoryButtons />
  </section>
</template>

<style scoped lang="scss">
  .home {
    padding: 2rem;

    &__heading {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: white;
      font-family: Inter, sans-serif;

      &--highlight {
        color: color('twitch-blue');
      }
    }

    &__grid,
    &__categories {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
  }
</style>
