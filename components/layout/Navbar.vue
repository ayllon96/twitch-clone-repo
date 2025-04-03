<template>
  <header class="navbar">
    <a href="/" class="navbar__branding" aria-label="Home">
      <img class="navbar__logo-img" src="/img/logo_twitch.png" alt="Twitch Logo" />
      <h1 class="navbar__logo-text">MIDUTCH</h1>
      <img class="navbar__logo-more" src="/icons/more.png" alt="More information" />
    </a>

    <form class="navbar__search" role="search">
      <input id="search" type="text" placeholder="Search" class="navbar__search-input" />
      <button class="navbar__search-button" type="submit" aria-label="Search">
        <img src="/icons/search.png" alt="Search Image" />
      </button>
    </form>

    <nav class="navbar__menu" aria-label="User actions">
      <ul class="navbar__list">
        <li>
          <a class="navbar__icon" aria-label="Inbox">
            <img src="/icons/notification.png" alt="Inbox" />
            <span class="navbar__badge">99</span>
          </a>
        </li>
        <li>
          <button class="navbar__btn navbar__btn--login">Log In</button>
        </li>
        <li>
          <button class="navbar__btn navbar__btn--signup">Sign Up</button>
        </li>
        <li>
          <a class="navbar__profile" aria-label="Profile">
            <img src="/icons/profile.png" alt="Profile" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: color('nav-grey');
    padding: 1rem 2vw;

    @include flex(row, center, space-between);

    &__branding {
      @include flex(row, center, flex-start, nowrap, 0.5rem);

      text-decoration: none;

      & > .navbar__logo-img {
        width: 2rem;
        height: auto;
      }

      & > .navbar__logo-text {
        font-size: 1.25rem;
        font-weight: bold;
        color: color('font-white');
        font-family: Inter, Arial, sans-serif;
      }

      & > .navbar__logo-more {
        width: 1em;
        height: 1em;
        filter: brightness(0) invert(1);
      }
    }

    &__search {
      @include flex(row, center);

      flex: 1;
      max-width: 50vw;
      margin: 0 2vw;

      &-input {
        flex: 1;
        padding: 0.6em;
        background-color: color('nav-grey');
        color: color('twitch-white');
        border-radius: 0.3em 0 0 0.3em;
        border: 0.05em solid rgb(183 176 176);
      }

      &-button {
        background-color: color('button-grey');
        border: none;
        padding: 0.6em;
        border-radius: 0 0.3em 0.3em 0;
        cursor: pointer;

        img {
          width: 1em;
          height: 1em;
          filter: brightness(0) invert(1);
        }
      }
    }

    &__menu {
      @include flex(row, center);
    }

    &__list {
      @include flex(row, center, flex-end, nowrap, 1rem);

      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__icon {
      position: relative;
      display: flex;
      align-items: center;

      img {
        width: 1.5rem;
        height: 1.5rem;
        filter: brightness(0) invert(1);
      }
    }

    &__badge {
      cursor: pointer;
      position: absolute;
      top: -0.4em;
      right: -0.5em;
      background-color: red;
      color: white;
      font-size: 0.65rem;
      padding: 0.15em 0.4em;
      border-radius: 62.4275em;
    }

    &__btn {
      padding: 0.5em 1em;
      border-radius: 0.4rem;
      font-weight: bold;
      border: none;
      cursor: pointer;

      &--login {
        background-color: color('button-grey');
        color: white;
      }

      &--signup {
        background-color: color('twitch-blue');
        color: white;
      }
    }

    &__profile {
      cursor: pointer;
      width: 1.75rem;
      height: 1.75rem;
      filter: brightness(0) invert(1);
    }

    @include responsive(48em) {
      flex-wrap: wrap;
      justify-content: center;
      padding: 0.5rem;

      &__branding {
        justify-content: center;
        width: 100%;
        margin-bottom: 0.5rem;
      }

      &__search {
        order: 3;
        width: 100%;
        margin: 0.5rem 0;
      }

      &__menu {
        order: 2;
        justify-content: center;
        width: 100%;
      }

      &__list {
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }
    }
  }
</style>
