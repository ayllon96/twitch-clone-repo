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
