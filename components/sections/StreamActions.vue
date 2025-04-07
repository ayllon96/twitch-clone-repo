<template>
  <div
    class="stream-page__actions"
    role="group"
    aria-label="Stream interaction actions"
  >
    <button
      class="stream-page__button stream-page__button--follow"
      aria-label="Follow this channel"
    >
      Follow
    </button>

    <button
      class="stream-page__button stream-page__button--subscribe"
      aria-label="Subscribe to this channel"
    >
      Subscribe
    </button>
  </div>
</template>


<style scoped lang="scss">
  .stream-page__actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stream-page__button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.312rem;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s ease;

    &--follow {
      background-color: color('twitch-blue');
      color: color('font-white');

      &:hover {
        background-color: #98bcff;
      }
    }

    &--subscribe {
      background-color: color('button-grey');
      color: color('font-white');

      &:hover {
        background-color: #646464;
      }
    }
  }
</style>
