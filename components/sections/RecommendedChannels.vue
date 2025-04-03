<template>
  <aside class="recommended">
    <div class="recommended__header">
      <h2 class="recommended__title">Recommended Channels</h2>
      <button class="recommended__toggle" @click="$emit('toggle')">
        <img :src="show ? '/icons/collapse.png' : '/icons/down.png'" alt="Toggle" />
      </button>
    </div>

    <div v-show="show" class="recommended__content">
      <ul class="recommended__list">
        <li v-for="channel in channels" :key="channel.name" class="recommended__item">
          <img :src="channel.avatar" :alt="channel.name" class="recommended__avatar" />
          <div class="recommended__info">
            <p class="recommended__name">{{ channel.name }}</p>
            <p class="recommended__description">{{ channel.description }}</p>
          </div>
          <div class="recommended__status">
            <span class="recommended__live-indicator"></span>
            <span class="recommended__viewers">{{ channel.viewers }}</span>
          </div>
        </li>
      </ul>

      <button class="recommended__more">Show More</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
  defineProps<{ show: boolean }>()
  defineEmits(['toggle'])

  const channels = [
    {
      name: 'Miduncy',
      avatar: '/img/midu-1.jpg',
      description: 'Coding Live',
      viewers: '2.3K',
    },
    {
      name: 'Miduxokas',
      avatar: '/img/midu-2.webp',
      description: 'Debugging Sessions',
      viewers: '1.1K',
    },
    {
      name: 'Midubai',
      avatar: '/img/midu-3.png',
      description: 'Frontend Fun',
      viewers: '50K',
    },
    {
      name: 'Miduelcapo',
      avatar: '/img/midu-4.webp',
      description: 'Backend Magic',
      viewers: '1.2K',
    },
    {
      name: 'Miduplay',
      avatar: '/img/midu-6.jpg',
      description: 'JavaScript World',
      viewers: '1.1K',
    },
    {
      name: 'MiduVENANT',
      avatar: '/img/midu-1.jpg',
      description: 'Rust Adventures',
      viewers: '1.5K',
    },
  ]
</script>

<style scoped lang="scss">
  .recommended {
    position: absolute;
    top: 4.5rem;
    left: 0;
    width: 14rem;
    background-color: color('nav-grey');
    padding: 1rem;
    font-family: Inter, Arial, sans-serif;
    color: color('font-white');
    z-index: 100;
    border-radius: 0 0 0.5rem;
    box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 30%);

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    &__toggle {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;

      img {
        width: 1rem;
        height: 1rem;
        filter: brightness(0) invert(1);
      }
    }

    &__subsection {
      font-size: 0.75rem;
      font-weight: bold;
      color: color('font-grey');
      text-transform: uppercase;
      margin: 1.5rem 0 0.5rem;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
      padding-right: 1rem;
    }

    &__avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &__info {
      flex: 1;
      min-width: 0;

      .recommended__name {
        font-size: 0.85rem;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .recommended__description {
        font-size: 0.75rem;
        color: color('font-grey');
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__status {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      white-space: nowrap;
    }

    &__live-indicator {
      width: 0.5rem;
      height: 0.5rem;
      background-color: red;
      border-radius: 50%;
    }

    &__viewers {
      font-size: 0.75rem;
      font-weight: 500;
    }

    &__more {
      margin-top: 1rem;
      background: none;
      border: none;
      color: color('twitch-blue');
      font-size: 0.8rem;
      cursor: pointer;
    }

    @include responsive(48em) {
      display: none;
    }
  }
</style>
