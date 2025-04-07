<script setup lang="ts">
  defineProps<{ channel: string }>()
</script>

<template>
  <aside class="stream-page__chat">
    <iframe
      :src="`https://www.twitch.tv/embed/${channel}/chat?parent=localhost&darkpopout`"
      class="stream-page__chat-iframe"
    ></iframe>
  </aside>
</template>

<style scoped lang="scss">
  .stream-page__chat {
    width: 26rem;
    background-color: color('body-black');
    padding: 0.5rem;

    @media (width <= 64em) {
      width: 100%;
      max-width: 100%;
      height: auto;
      margin-top: 1rem;
    }
  }

  .stream-page__chat-iframe {
    width: 100%;
    height: 100vh;
    border: none;
    border-radius: 0.5rem;

    @media (width <= 64em) {
      height: 30rem;
    }
  }
</style>
