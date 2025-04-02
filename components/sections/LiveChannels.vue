<template>
  <section class="live-channels">
    <h2 class="live-channels__title">Live channels we think you’ll like</h2>
    <div class="live-channels__grid">
      <AppCard
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.title"
        :subtitle="`${channel.city} ${channel.id}`"
        :description="`${channel.language} · ${channel.category}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Channel {
  id: string;
  title: string;
  city: string;
  language: string;
  category: string;
}

const channels = ref<Channel[]>([
  {
    id: "01",
    title: "EL DÍA MÁS IMPORTANTE DE NUESTRA HISTORIA | NO...",
    city: "Madrid",
    language: "Español",
    category: "Despacionador",
  },
  // Más canales...
]);
</script>

<style lang="scss" scoped>
.live-channels {
  &__title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1.5rem;
  }
}
</style>
