<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
  import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <Navbar />
  <div class="layout">
    <div class="layout__body">
      <Sidebar />
      <main class="layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    background-color: color('body-black');
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    box-sizing: border-box;

    &__body {
      display: flex;
      flex: 1;
    }

    &__content {
      flex: 1;
      padding: 2rem;
    }

    @include responsive(64em) {
      .sidebar {
        display: none;
      }

      .layout__content {
        padding: 1rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .layout__body {
        flex-direction: column;
      }
    }
  }
</style>
