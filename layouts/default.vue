<template>
  <div class="layout">
    <Navbar />
    <div class="layout__body">
      <Sidebar />
      <main class="layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__body {
    display: flex;
    flex: 1;
  }

  &__content {
    flex: 1;
    padding: 2rem;
  }
}
</style>