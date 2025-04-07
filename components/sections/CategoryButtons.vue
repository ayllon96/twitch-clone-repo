<script setup lang="ts">
  const buttons = [
    { label: 'Games', img: '/img/gaming.png' },
    { label: 'IRL', img: '/img/irl.png' },
    { label: 'Music & DJs', img: '/img/music.png' },
    { label: 'Creative', img: '/img/creative.png' },
    { label: 'Esports', img: '/img/esports.png' },
  ]
</script>

<template>
  <section class="category-buttons">
    <button v-for="(btn, i) in buttons" :key="i" class="category-buttons__button">
      {{ btn.label }}
      <img :src="btn.img" :alt="btn.label" />
    </button>
  </section>
</template>

<style scoped lang="scss">
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: color('twitch-blue');
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-family: Inter, sans-serif;
      cursor: pointer;

      img {
        width: 1.5rem;
        height: 1.5rem;
        transform: scale(1.1);
        filter: drop-shadow(0 0.125rem 0.25rem rgb(0 0 0 / 30%));
      }
    }
  }
</style>
