<template>
  <NuxtLink :to="`/stream/${stream.user_id}`" class="stream-card">
    <img :src="stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')" alt="Thumbnail" class="stream-card__thumb" />
    <div class="stream-card__body">
      <img :src="stream.profile_image_url" alt="Avatar" class="stream-card__avatar" />
      <div class="stream-card__info">
        <p class="stream-card__title">{{ stream.title }}</p>
        <p class="stream-card__user">{{ stream.user_name }}</p>
        <div class="stream-card__tags">
          <span v-for="tag in stream.tags" :key="tag" class="stream-card__tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ stream: any }>()
</script>

<style scoped lang="scss">
.stream-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: color("body-black");
  padding: 1rem;
  border-radius: 0.75rem;
  color: white;
  text-decoration: none;
  font-family: Inter, sans-serif;

  &__thumb {
    width: 100%;
    border-radius: 0.5rem;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 600;
  }

  &__user {
    font-size: 0.9rem;
    color: #b3b3b3;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  &__tag {
    background: #26262c;
    padding: 0.3rem 0.7rem;
    font-size: 0.75rem;
    border-radius: 999px;
  }
}
</style>
