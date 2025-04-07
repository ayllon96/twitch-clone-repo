<script setup lang="ts">
  defineProps<{ user: any }>()
</script>

<template>
  <section
    class="stream-page__about"
    role="region"
    :aria-labelledby="`about-${user.id}`"
  >
    <h3 :id="`about-${user.id}`">About {{ user.display_name }}</h3>
    <p>{{ user.description || 'No description available.' }}</p>
  </section>
</template>


<style scoped lang="scss">
  .stream-page__about {
    background-color: color('button-grey');
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    font-size: 0.9rem;
  }
</style>
