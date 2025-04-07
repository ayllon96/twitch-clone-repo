<script setup lang="ts">
  import { TwitchAPI } from '@/lib/twitch-api'

  const open = ref(false)
  const streams = ref([])

  onMounted(async () => {
    const api = await TwitchAPI.getInstance()
    const result = await api.getStreams()
    const allStreams = result.data || []

    const validLoginRegex = /^[a-zA-Z0-9_]{4,25}$/

    const filteredStreams = allStreams.filter((stream: any) =>
      validLoginRegex.test(stream.user_name)
    )

    const topStreams = filteredStreams.slice(0, 5)

    const usernames = topStreams.map((stream: any) => stream.user_name.toLowerCase())
    const users = await api.getUsers(usernames)

    const userMap = Object.fromEntries(users.map((u: any) => [u.login.toLowerCase(), u]))

    streams.value = topStreams.map((stream: any) => ({
      ...stream,
      profile_image_url: userMap[stream.user_name.toLowerCase()]?.profile_image_url || '',
    }))
  })

  const formatViewers = (count: number): string => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`
  }
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <button class="sidebar__toggle" @click="open = !open">RECOMMENDED CHANNELS</button>
      <button>
        <img src="../public/icons/collapse.png" class="sidebar__icon" @click="open = !open" />
      </button>
    </div>

    <section class="sidebar__panel">
      <ul>
        <NuxtLink
          :to="`/stream/${stream.user_id}`"
          v-for="stream in streams"
          :key="stream.id"
          class="sidebar__item"
        >
          <img class="sidebar__thumbnail" :src="stream.profile_image_url" alt="User avatar" />

          <template v-if="open">
            <section class="sidebar__info">
              <p class="sidebar__username">{{ stream.user_name }}</p>
              <p class="sidebar__tags">{{ stream.tags?.join(', ') || 'No tags' }}</p>
            </section>

            <section class="sidebar__status">
              <span class="sidebar__live-dot"></span>
              <span class="sidebar__viewers">{{ formatViewers(stream.viewer_count) }}</span>
            </section>
          </template>
        </NuxtLink>
      </ul>
    </section>
  </aside>
</template>

<style lang="scss">
  @use '../assets/scss/variables';
  @use '../assets/scss/reset';

  @keyframes popIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .sidebar {
    width: 16rem;
    background-color: #0e0e10;
    padding: 1rem;

    &__header {
      @include flex;
    }

    &__toggle {
      background: color('body-black');
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
      font-family: Inter, sans-serif;
      font-size: 0.75rem;
    }

    &__panel {
      margin-top: 1rem;
      transition: all 0.3s ease;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      color: white;
      font-family: Inter, sans-serif;
      font-size: 0.8rem;
      text-decoration: none;
      justify-content: start;

      &:not(:has(.sidebar__info)) {
        justify-content: flex-start;
      }
    }

    &__thumbnail {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 62rem;
      object-fit: cover;
      flex-shrink: 0;
      transform: translateY(-1rem) scale(0.95);
      animation: popIn 0.3s ease forwards;
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      min-width: 0;
      transform: translateY(-1rem) scale(0.95);
      animation: popIn 0.3s ease forwards;
    }

    &__username {
      font-weight: 600;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__tags {
      font-size: 0.7rem;
      color: color('font-grey');
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__status {
      display: flex;
      align-items: center;
      gap: 0.3em;
      flex-shrink: 0;
      transform: translateY(-1rem) scale(0.95);
      animation: popIn 0.3s ease forwards;
    }

    &__live-dot {
      width: 0.5em;
      height: 0.5em;
      background-color: red;
      border-radius: 50%;
    }

    &__viewers {
      font-size: 0.75rem;
      color: white;
    }

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      filter: brightness(0) invert(1);
      cursor: pointer;
    }
  }
</style>
