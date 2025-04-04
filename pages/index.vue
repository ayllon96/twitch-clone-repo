<template>
  <section class="home">
    <h2 class="home__heading">
      <span class="home__heading--highlight">Live channels</span>
      we think you'll like
    </h2>

    <section class="home__grid">
      <section v-for="stream in streams" :key="stream.id" class="home__card">
        <NuxtLink :to="`/stream/${stream.user_id}`">
          <img
            :src="stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')"
            alt="Stream thumbnail"
            class="home__thumb"
          />
          <section class="home__avatar-wrapper">
            <img :src="stream.profile_image_url" alt="User avatar" class="home__avatar" />
          </section>
          <section class="home__info">
            <p>{{ stream.title }}</p>

            <p class="home__title">{{ stream.user_name }}</p>
            <section class="home__tags">
              <p>{{ stream.tags }}</p>
            </section>
          </section>
        </NuxtLink>
      </section>
    </section>

    <h2 class="home__heading">
      <span class="home__heading--highlight">Categories</span>
      we think you'll like
    </h2>

    <section class="home__categories">
      <section v-for="category in categories" :key="category.id" class="home__category">
        <img
          :src="category.box_art_url.replace('{width}', '285').replace('{height}', '380')"
          alt="Category"
          class="home__category-img"
        />
        <p class="home__category-name">{{ category.name }}</p>
      </section>
    </section>
  </section>
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
      api.getCategories(),
    ])

    const topStreams = streamsResult.data
    categories.value = categoriesResult.data

    const usernames = topStreams.map((s: any) => s.user_name.toLowerCase())
    const usersResult = await api.getUsers(usernames)

    const userMap = Object.fromEntries(usersResult.map((u: any) => [u.login.toLowerCase(), u]))

    streams.value = topStreams.map((stream: any) => ({
      ...stream,
      profile_image_url: userMap[stream.user_name.toLowerCase()]?.profile_image_url || '',
    }))
  })
</script>

<style lang="scss" scoped>
  @use '../assets/scss/variables';
  @use '../assets/scss/reset';

  .home {
    &__heading {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 1rem;
      font-family: Inter, sans-serif;

      &--highlight {
        color: color('twitch-blue');
      }
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    &__card {
      background: #1f1f23;
      padding: 1rem;
      border-radius: 0.75rem;
      color: white;
      font-family: Inter, sans-serif;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
      }
    }

    &__thumb {
      width: 100%;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
    }

    &__avatar-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
    }

    &__avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
    }

    &__info {
      display: flex;
      text-decoration: none;
      flex-direction: column;
      text-align: left;
    }

    &__title {
      font-size: 0.95rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__tags {
      font-size: 0.75rem;
      color: color('font-grey');
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
