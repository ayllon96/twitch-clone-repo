<template>
  <div class="stream-detail" v-if="stream">
    <h2 class="stream-detail__title">{{ stream.user_name }}</h2>

    <iframe
      class="stream-detail__player"
      :src="`https://player.twitch.tv/?channel=${stream.user_name}&parent=localhost`"
      height="480"
      width="800"
      allowfullscreen>
    </iframe>

    <p class="stream-detail__info">{{ stream.title }}</p>
  </div>

  <div v-else class="stream-detail__loading">
    <p>Cargando stream...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { TwitchAPI } from '@/lib/twitch-api'

const route = useRoute()
const stream = ref<any>(null)

onMounted(async () => {
  try {
    const api = await TwitchAPI.getInstance()
    const result = await api.getStreamByUserId(String(route.params.id))
    stream.value = result.data[0] || null
    console.log('STREAM DATA:', stream.value)
  } catch (err) {
    console.error('Error cargando el stream:', err)
  }
})
</script>

<style scoped lang="scss">
.stream-detail {
  color: white;
  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  &__player {
    border: none;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
  &__info {
    font-size: 1.2rem;
  }
  &__loading {
    color: white;
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
