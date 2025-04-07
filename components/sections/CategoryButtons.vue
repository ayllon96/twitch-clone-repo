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
    @include flex(64em);

    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: color('twitch-blue');
      color: color('font-white');
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      cursor: pointer;

      img {
        width: 3rem;
        height: 3rem;
        transform: scale(1.1);
        filter: drop-shadow(0 0.125rem 0.25rem rgb(0 0 0 / 30%));
      }
    }
  }
</style>
