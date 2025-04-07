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
  <section class="home" role="main" aria-label="Home page content">
    <section class="home__section" aria-labelledby="live-channels-heading">
      <h2 id="live-channels-heading" class="home__heading">
        <span class="home__heading--highlight">Live channels</span>
        we think you'll like
      </h2>

      <section class="home__grid" role="list" aria-label="Live channel list">
        <StreamCard
          v-for="stream in streams"
          :key="stream.id"
          :stream="stream"
          role="listitem"
        />
      </section>
    </section>

    <section class="home__section" aria-labelledby="categories-heading">
      <h2 id="categories-heading" class="home__heading">
        <span class="home__heading--highlight">Categories</span>
        we think you'll like
      </h2>

      <section class="home__categories" role="list" aria-label="Category list">
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :category="category"
          role="listitem"
        />
      </section>
    </section>

    <CategoryButtons aria-label="Filter categories" />
  </section>
</template>


<style scoped lang="scss">
  .home {
    padding: 2rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;

    &__heading {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: color('font-white');

      &--highlight {
        color: color('twitch-blue');
      }
    }

    &__grid {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    &__categories {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    @include responsive(48em) {
      padding: 1rem;

      &__grid,
      &__categories {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      &__heading {
        font-size: 1.25rem;
      }
    }
  }
</style>
