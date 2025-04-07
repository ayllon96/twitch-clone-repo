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
