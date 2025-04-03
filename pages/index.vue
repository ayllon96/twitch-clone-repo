<template>
  <div class="home-layout">
    <Navbar />
    <main class="home-layout__main"></main>
    <RecommendedChannels :show="showAside" @toggle="showAside = !showAside" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Navbar from '@/components/layout/Navbar.vue'
  import RecommendedChannels from '@/components/sections/RecommendedChannels.vue'

  const showAside = ref(true)
</script>

<style lang="scss" scoped>
  .aside-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1100;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    border: none;
    background-color: color('button-grey');
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 30%);

    img {
      width: 1.2rem;
      height: 1.2rem;
      filter: brightness(0) invert(1);
    }

    @include responsive(48em) {
      display: flex;
    }
  }
</style>
