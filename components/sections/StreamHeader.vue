<script setup lang="ts">
  defineProps<{ stream: any; user: any; duration: (s: string) => string }>()
</script>

<template>
  <div class="stream-page__header">
    <img :src="user.profile_image_url" alt="Avatar" class="stream-page__avatar" />
    <div class="stream-page__meta">
      <div class="stream-page__meta-top">
        <h2 class="stream-page__name">{{ user.display_name }}</h2>
        <span v-if="stream" class="stream-page__live">LIVE</span>
      </div>

      <div v-if="stream" class="stream-page__title-wrapper">
        <p class="stream-page__title">{{ stream.title }}</p>
        <div class="stream-page__stats">
          <span>
            <img class="stream-page__stats--image" src="/icons/profile.png" alt="views" />
            {{ stream.viewer_count.toLocaleString() }}
          </span>
          <span>⏱ {{ duration(stream.started_at) }}</span>
        </div>
      </div>

      <div v-if="stream?.tags?.length" class="stream-page__tags">
        <span v-for="tag in stream.tags" :key="tag" class="stream-page__tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .stream-page__header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .stream-page__avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .stream-page__meta {
    display: flex;
    flex-direction: column;
  }

  .stream-page__meta-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stream-page__name {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .stream-page__live {
    background-color: color('button-red');
    color: color('font-white');
    padding: 0.2rem 0.6rem;
    border-radius: 62.4rem;
    font-size: 0.75rem;
  }

  .stream-page__title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .stream-page__title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;
    flex: 1;
  }

  .stream-page__stats {
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

  .stream-page__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .stream-page__tag {
    background-color: color('button-grey');
    padding: 0.3rem 0.7rem;
    border-radius: 62.4rem;
    font-size: 0.75rem;
  }
</style>
