<template>
  <nav class="navbar">
    <h1 class="navbar__logo">MIDITCH</h1>
    <AppInput class="navbar__search" placeholder="Search" />
    <div class="navbar__auth">
      <AppButton variant="outline">Log In</AppButton>
      <AppButton>Sign Up</AppButton>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-navbar);

  &__logo {
    font-size: 1.5rem;
    margin-right: 2rem;
  }

  &__search {
    flex-grow: 1;
    max-width: 30rem;
  }

  &__auth {
    display: flex;
    gap: 1rem;
  }
}
</style>
