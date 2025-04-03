<template>
  <article class="stream-card" @click="goToStream">
    <img :src="stream.thumbnail_url" alt="Thumbnail" class="stream-card__thumbnail" />
    <div class="stream-card__info">
      <h3 class="stream-card__title">{{ stream.title }} title</h3>
      <p class="stream-card__user">{{ stream.user_name }} user</p>
      <p class="stream-card__viewers">{{ stream.viewer_count }} viewers</p>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const props = defineProps<{
    stream: {
      id: string
      user_name: string
      title: string
      thumbnail_url: string
      viewer_count: number
    }
  }>()

  const router = useRouter()

  function goToStream() {
    router.push(`/watch/${props.stream.id}`)
  }
</script>

<style scoped lang="scss">
  .stream-card {
    width: 100%;
    max-width: 20rem;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: color('font-white');
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }

    &__thumbnail {
      width: 100vw;
      height: auto;
      display: block;
    }

    &__info {
      padding: 0.8rem;

      & > * {
        margin: 0.2rem 0;
      }

      &__title {
        font-weight: bold;
        color: color('font-white');
      }

      &__user,
      &__viewers {
        font-size: 0.85rem;
        color: color('font-grey');
      }
    }
  }
</style>
