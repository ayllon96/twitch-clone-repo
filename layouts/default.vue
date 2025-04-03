<template>
  <div class="layout">
    <Navbar />
    <main class="layout__content">
      <NuxtPage />
    </main>
    <RecommendedChannels class="layout__aside" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    min-height: 100vh;
    background-color: color('body-black');

    &__content {
      flex: 1;
      padding: 5rem 2vw 2rem;
    }

    &__aside {
      width: 20vw;
      min-width: 15rem;
    }

    @include responsive(48em) {
      flex-direction: column;

      &__aside {
        order: 3;
        width: 100%;
      }
    }
  }
</style>
