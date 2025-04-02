<template>
  <div class="layout">
    <Navbar />
    <main class="layout__main">
      <slot />
    </main>
    <Sidebar />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  background-color: var(--color-bg);

  &__main {
    padding: 1.5rem;
  }
}
</style>
