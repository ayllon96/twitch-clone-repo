<script setup lang="ts">
  import { TwitchAPI } from '@/lib/twitch-api'

  const open = ref(false)
  const streams = ref([])

  onMounted(async () => {
    const api = await TwitchAPI.getInstance()
    const result = await api.getStreams()
    const topStreams = (result.data || []).slice(0, 5)

    const userIds = topStreams.map((s: any) => s.user_id)
    const users = await api.getUsersByIds(userIds)

    const userMap = Object.fromEntries(users.map((u: any) => [u.id, u]))

    streams.value = topStreams.map((stream: any) => ({
      ...stream,
      profile_image_url: userMap[stream.user_id]?.profile_image_url || '',
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
    background-color: color('body-black');
    padding: 1rem;

    &__header {
      @include flex;
    }

    &__toggle {
      background: color('body-black');
      color: color('font-white');
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
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
      color: color('font-white');
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
      color: color('font-white');
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
      background-color: color('button-red');
      border-radius: 50%;
    }

    &__viewers {
      font-size: 0.75rem;
      color: color('font-white');
    }

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      filter: brightness(0) invert(1);
      cursor: pointer;
    }
  }

  @include responsive(64em) {
    .sidebar {
      width: 100%;
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: column;

      &__header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      &__panel {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        overflow-x: auto;
        margin-top: 0;
      }

      &__item {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        min-width: 6rem;
      }

      &__info,
      &__status {
        display: none;
      }

      &__thumbnail {
        transform: none;
        animation: none;
      }
    }
  }
</style>
