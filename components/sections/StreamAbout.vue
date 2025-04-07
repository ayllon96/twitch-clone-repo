<script setup lang="ts">
  defineProps<{ user: any }>()
</script>

<template>
  <section class="stream-page__about">
    <h3>About {{ user.display_name }}</h3>
    <p>{{ user.description || 'No description available.' }}</p>
  </section>
</template>
