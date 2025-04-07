<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { TwitchAPI } from '@/lib/twitch-api'

  const stream = ref<any>(null)
  const user = ref<any>(null)
  const route = useRoute()

  onMounted(async () => {
    const api = await TwitchAPI.getInstance()
    const streamRes = await api.getStreamByUserId(String(route.params.id))
    stream.value = streamRes?.data?.[0] || null

    if (stream.value) {
      const userRes = await api.getUsers([stream.value.user_name])
      user.value = userRes?.[0] || null
    }
  })

  function getDuration(startedAt: string): string {
    const start = new Date(startedAt)
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000)
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
</script>

<template>
  <div class="stream-page" v-if="stream && user">
    <main class="stream-page__main">
      <iframe
        class="stream-page__player"
        :src="`https://player.twitch.tv/?channel=${stream.user_name}&parent=localhost`"
        allowfullscreen
      ></iframe>

      <div class="stream-page__actions">
        <button class="stream-page__button stream-page__button--follow">Follow</button>
        <button class="stream-page__button stream-page__button--subscribe">Subscribe</button>
      </div>

      <div class="stream-page__header">
        <img :src="user.profile_image_url" alt="Avatar" class="stream-page__avatar" />
        <div class="stream-page__meta">
          <div class="stream-page__meta-top">
            <h2 class="stream-page__name">{{ stream.user_name }}</h2>
            <span class="stream-page__live">LIVE</span>
          </div>

          <div class="stream-page__title-wrapper">
            <p class="stream-page__title">{{ stream.title }}</p>
            <div class="stream-page__stats">
              <span>
                <img
                  class="stream-page__stats--image"
                  src="../../public/icons/profile.png"
                  alt="views"
                />
                {{ stream.viewer_count.toLocaleString() }}
              </span>
              <span>⏱ {{ getDuration(stream.started_at) }}</span>
            </div>
          </div>

          <div class="stream-page__tags">
            <span v-for="tag in stream.tags" :key="tag" class="stream-page__tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <section class="stream-page__about">
        <h3>About {{ stream.user_name }}</h3>
        <p>{{ user.description || 'No description available.' }}</p>
      </section>
    </main>

    <aside class="stream-page__chat">
      <iframe
        :src="`https://www.twitch.tv/embed/${stream.user_name}/chat?parent=localhost&darkpopout`"
        class="stream-page__chat-iframe"
      ></iframe>
    </aside>
  </div>
</template>

<style scoped lang="scss">
  @use '../../assets/scss/variables';
  @use '../../assets/scss/reset';

  .stream-page {
    display: flex;
    background-color: color('body-black');
    color: color('font-white');
    min-height: 100vh;

    @include responsive(64em) {
      flex-direction: column;
    }

    &__main {
      flex: 1;
      padding: 2rem;
    }

    &__player {
      width: 100%;
      height: 34rem;
      border: none;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    &__button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.312rem;
      font-weight: bold;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s ease;

      &--follow {
        background-color: color('twitch-blue');
        color: color('font-white');

        &:hover {
          background-color: #98bcff;
        }
      }

      &--subscribe {
        background-color: color('button-grey');
        color: color('font-white');

        &:hover {
          background-color: #646464;
        }
      }
    }

    &__header {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    &__avatar {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      object-fit: cover;
    }

    &__meta {
      display: flex;
      flex-direction: column;
    }

    &__meta-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &__name {
      font-size: 1.25rem;
      font-weight: bold;
    }

    &__live {
      background-color: color('button-red');
      color: color('font-white');
      padding: 0.2rem 0.6rem;
      border-radius: 62.4rem;
      font-size: 0.75rem;
    }

    &__title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    &__title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0.5rem 0;
      flex: 1;
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 0.5rem;
    }

    &__tag {
      background-color: color('button-grey');
      padding: 0.3rem 0.7rem;
      border-radius: 62.4rem;
      font-size: 0.75rem;
    }

    &__stats {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.8rem;
      color: color('button-red');

      span {
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }

      &--image {
        width: 1rem;
        height: 1rem;
        filter: brightness(0) invert(1);
      }
    }

    &__about {
      background-color: color('button-grey');
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 2rem;
      font-size: 0.9rem;
    }

    &__chat {
      width: 26rem;
      background-color: color('body-black');
      padding: 0.5rem;
    }

    &__chat-iframe {
      width: 100%;
      height: 100vh;
      border: none;
      border-radius: 0.5rem;
    }
  }
</style>
