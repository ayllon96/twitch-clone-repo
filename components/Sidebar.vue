<template>
    <aside class="sidebar">
      <button class="sidebar__toggle" @click="open = !open">Recomendados</button>
      <div class="sidebar__panel" v-if="open">
        <ul>
          <li v-for="stream in streams" :key="stream.id" class="sidebar__item">
            {{ stream.user_name }} ({{ stream.viewer_count }} viewers)
          </li>
        </ul>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { TwitchAPI } from '@/lib/twitch-api'
  
  const open = ref(false)
  const streams = ref([])
  
  onMounted(async () => {
    const api = await TwitchAPI.getInstance()
    const result = await api.getStreams()
    streams.value = result.data.slice(0, 5)
  })
  </script>
  
  <style lang="scss" scoped>
  .sidebar {
    width: 16rem;
    background-color: #0e0e10;
    padding: 1rem;
  
    &__toggle {
      background: #9147ff;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
    }
  
    &__panel {
      margin-top: 1rem;
    }
  
    &__item {
      color: white;
      margin-bottom: 0.5rem;
    }
  }
  </style>