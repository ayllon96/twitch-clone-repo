<template>
  <div class="watch-page">
    <iframe
      :src="`https://player.twitch.tv/?channel=${channelName}&parent=localhost`"
      frameborder="0"
      allowfullscreen
      class="watch-player"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'

  const route = useRoute()
  const streamId = route.params.id
  const channelName = ref('')

  onMounted(async () => {
    const res = await fetch(`/api/stream/${streamId}`)
    const data = await res.json()
    channelName.value = data.user_name
  })
</script>
