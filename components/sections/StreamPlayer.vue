<script setup lang="ts">
  defineProps<{ channel: string }>()
</script>

<template>
  <iframe
    class="stream-page__player"
    :src="`https://player.twitch.tv/?channel=${channel}&parent=bright-moonbeam-9789ec.netlify.app`"
    allowfullscreen
  ></iframe>
</template>

<style scoped lang="scss">
  .stream-page__player {
    width: 100%;
    height: 34rem;
    border: none;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
</style>
