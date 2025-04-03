<template>
  <div class="layout">
    <Navbar />
    <div class="layout__body">
      <RecommendedChannels class="layout__aside" />
      <main class="layout__content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    background-color: color('body-black');
    overflow-x: hidden;

    & > * {
      width: 100%;
      max-width: 100%;
    }

    &__body {
      display: grid;
      grid-template-columns: 18rem 1fr;
      gap: 2rem;
      width: 100%;
      max-width: 100%;
      padding: 2rem;
      box-sizing: border-box;

      @include responsive(48em) {
        grid-template-columns: 1fr;
        padding: 1rem;
      }
    }

    &__content {
      width: 100%;
      max-width: 75rem;
      margin: 0 auto;
      padding: 0;
    }

    &__aside {
      width: 18rem;

      @include responsive(48em) {
        display: none;
      }
    }
  }
</style>
