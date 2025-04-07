<script setup lang="ts">
  defineProps<{ channel: string }>()
</script>

<template>
  <iframe
    class="stream-page__player"
    :src="`https://player.twitch.tv/?channel=${channel}&parent=localhost`"
    allowfullscreen
  ></iframe>
</template>
