<template>
  <div class="home-layout">
    <Navbar />
    <h2>Videos we think you'll like</h2>
    <main class="home-layout__main"></main>
    <section class="streams-grid">
      <StreamCard v-for="stream in streams" :key="stream.id" :stream="stream" />
    </section>
    <RecommendedChannels :show="showAside" @toggle="showAside = !showAside" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Navbar from '@/components/layout/Navbar.vue'
  import StreamCard from '@/components/sections/StreamCard.vue'
  import RecommendedChannels from '@/components/sections/RecommendedChannels.vue'

  type Stream = {
    id: string
    user_name: string
    title: string
    thumbnail_url: string
    viewer_count: number
  }

  const streams = ref<Stream[]>([])

  onMounted(async () => {
    const res = await fetch('/api/streams')
    const data = await res.json()
    streams.value = data
  })
  const showAside = ref(true)
</script>

<style lang="scss" scoped>
  .streams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1.5rem;
    max-width: 75rem;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;

    @include responsive(48em) {
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
      padding: 1rem;
    }
  }

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
