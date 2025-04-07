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
  <aside class="sidebar" role="complementary" aria-label="Recommended channels">
    <div class="sidebar__header">
      <button
        class="sidebar__toggle"
        @click="open = !open"
        :aria-expanded="open.toString()"
        aria-controls="recommended-channels"
        aria-label="Toggle recommended channels"
      >
        RECOMMENDED CHANNELS
      </button>

      <button
        @click="open = !open"
        :aria-expanded="open.toString()"
        aria-controls="recommended-channels"
        aria-label="Collapse sidebar"
      >
        <img
          src="../public/icons/collapse.png"
          class="sidebar__icon"
          alt="Collapse sidebar icon"
        />
      </button>
    </div>

    <section class="sidebar__panel" id="recommended-channels" aria-live="polite">
      <ul role="list">
        <li
          v-for="stream in streams"
          :key="stream.id"
          class="sidebar__item"
          role="listitem"
        >
          <NuxtLink
            :to="`/stream/${stream.user_id}`"
            class="sidebar__link"
            aria-label="Watch {{ stream.user_name }}'s stream"
          >
            <img
              class="sidebar__thumbnail"
              :src="stream.profile_image_url"
              :alt="`Avatar of ${stream.user_name}`"
            />

            <div class="sidebar__info" v-show="open">
              <p class="sidebar__username">{{ stream.user_name }}</p>
              <p class="sidebar__tags">{{ stream.tags?.join(', ') || 'No tags' }}</p>
            </div>

            <div class="sidebar__status" v-show="open">
              <span class="sidebar__live-dot" aria-hidden="true"></span>
              <span class="sidebar__viewers">
                {{ formatViewers(stream.viewer_count) }} viewers
              </span>
            </div>
          </NuxtLink>
        </li>
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__toggle {
    background: color('body-black');
    color: color('font-white');
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    filter: brightness(0) invert(1);
    cursor: pointer;
  }

  &__panel {
    margin-top: 1rem;
    transition: all 0.3s ease;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    color: color('font-white');
    font-size: 0.8rem;
    text-decoration: none;

    & .sidebar__thumbnail {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 62rem;
      object-fit: cover;
      flex-shrink: 0;
      animation: popIn 0.3s ease forwards;
    }

    & .sidebar__info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      animation: popIn 0.3s ease forwards;

      & .sidebar__username {
        font-weight: 600;
        color: color('font-white');
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .sidebar__tags {
        font-size: 0.7rem;
        color: color('font-grey');
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    & .sidebar__status {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      margin-left: auto;
      flex-shrink: 0;
      animation: popIn 0.3s ease forwards;

      & .sidebar__live-dot {
        width: 0.5em;
        height: 0.5em;
        background-color: color('button-red');
        border-radius: 50%;
      }

      & .sidebar__viewers {
        font-size: 0.75rem;
        color: color('font-white');
      }
    }
  }

  @include responsive(64em) {
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
      flex-direction: row;
      align-items: center;
      min-width: 12rem;


      & .sidebar__info,
      & .sidebar__status {
        display: flex;
      }

      & .sidebar__thumbnail {
        transform: none;
        animation: none;
      }
    }
  }
}


@keyframes popIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

</style>
