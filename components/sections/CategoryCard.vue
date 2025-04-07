<script setup lang="ts">
  defineProps<{ category: any }>()
</script>

<template>
  <div class="category-card">
    <img
      :src="category.box_art_url.replace('{width}', '285').replace('{height}', '380')"
      class="category-card__img"
    />
    <p class="category-card__name">{{ category.name }}</p>
  </div>
</template>

<style scoped lang="scss">
  .category-card {
    text-align: center;
    font-family: Inter, sans-serif;
    color: white;

    &__img {
      width: 100%;
      border-radius: 0.5rem;
    }

    &__name {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
</style>
