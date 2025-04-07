<template>
  <nav class="navbar">
    <section class="navbar__section navbar__section--left">
      <img src="../public/img/logo_twitch.png" alt="Logo de MIDUTCH" class="navbar__logo" />
      <NuxtLink to="/" class="navbar__title">MIDUTCH</NuxtLink>
      <img
        src="../public/icons/more.png"
        alt="Botón de más detalles"
        class="navbar__icon navbar__icon--more"
      />
    </section>

    <section class="navbar__section navbar__section--center">
      <div class="navbar__search-group">
        <input type="text" placeholder="Search..." class="navbar__search" />
        <button class="navbar__button navbar__button--search" aria-label="Search">
          <img
            src="../public/icons/search.png"
            alt="Search button"
            class="navbar__icon navbar__icon--search"
          />
        </button>
      </div>
    </section>

    <section class="navbar__section navbar__section--right">
      <img
        src="../public/icons/notification.png"
        alt="Notifications"
        class="navbar__icon navbar__icon--notif"
      />
      <button class="navbar__button navbar__button--login" aria-label="Log in">Log in</button>
      <button class="navbar__button navbar__button--signup" aria-label="Sign up">Sign Up</button>
      <img
        src="../public/icons/profile.png"
        alt="My Profile"
        class="navbar__icon navbar__icon--profile"
      />
    </section>
  </nav>
</template>

<style lang="scss">
  @use '../assets/scss/variables';
  @use '../assets/scss/reset';

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: color('nav-grey');
    max-width: 100vw;

    &__section {
      display: flex;
      align-items: center;

      &--left {
        justify-content: flex-start;
        gap: 0.1rem;
      }

      &--center {
        flex: 1;
        justify-content: center;
      }

      &--right {
        justify-content: flex-end;
        gap: 0.1rem;
      }
    }

    &__search-group {
      display: flex;
      align-items: center;
      background-color: color('button-grey');
      border-radius: 0.4rem;
      overflow: hidden;
      border: 0.06rem solid rgb(91 91 91);
    }

    &__search {
      flex: 1;
      padding: 0.5rem 0.75rem;
      border: none;
      background-color: color('nav-grey');
      color: white;
      font-family: Inter, sans-serif;
      max-width: 20em;
      width: 100%;

      &:focus {
        outline: none;
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      margin-left: 1rem;

      &--search {
        width: 2.5rem;
        height: 2.5rem;
        background-color: transparent;
        border: none;
        border-left: 0.02rem solid white;
        padding: 0.5rem;
        margin-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 1.5rem;
          height: 1.5rem;
          filter: brightness(0) invert(1);
        }
      }

      &--login {
        background-color: color('button-grey');
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.312rem;
        font-family: Inter, sans-serif;
      }

      &--signup {
        background-color: color('twitch-blue');
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.312rem;
        font-family: Inter, sans-serif;
      }
    }

    &__logo {
      width: 3em;
      height: 3em;
      margin-right: 1rem;
    }

    &__title {
      font-size: 1.5rem;
      color: white;
      font-family: Inter, sans-serif;
      text-decoration: none;
    }

    &__icon {
      width: 1.5em;
      height: 1.5em;
      filter: brightness(0) invert(1);
      cursor: pointer;

      &--more,
      &--notif,
      &--profile {
        margin-left: 1rem;
      }
    }

    @include responsive(48em) {
      .navbar {
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;

        &__section {
          width: 100%;
          justify-content: space-between;

          &--center {
            display: none;
          }

          &--right {
            display: none;
          }
        }

        &__logo {
          width: 2.5em;
          height: 2.5em;
        }

        &__title {
          font-size: 1.2rem;
        }

        &__icon--more {
          display: none;
        }
      }
    }
  }
</style>
