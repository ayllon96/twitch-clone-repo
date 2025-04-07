<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { TwitchAPI } from '@/lib/twitch-api'
  import StreamPlayer from '../components/sections/StreamPlayer.vue'
  import StreamActions from '../components/sections/StreamActions.vue'
  import StreamHeader from '../components/sections/StreamHeader.vue'
  import StreamAbout from '../components/sections/StreamAbout.vue'
  import StreamChat from '../components/sections/StreamChat.vue'

  const route = useRoute()
  const stream = ref(null)
  const user = ref(null)

  const getDuration = (start: string) => {
    const diff = Date.now() - new Date(start).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m`
  }

  onMounted(async () => {
    const userId = route.params.id as string
    const api = await TwitchAPI.getInstance()

    const [userResult, streamResult] = await Promise.all([
      api.getUsersByIds([userId]),
      api.getStreamByUserId(userId),
    ])

    user.value = userResult?.[0] || null
    stream.value = streamResult?.data?.[0] || null
  })
</script>

<template>
  <div class="stream-page" v-if="user" aria-label="Stream page">
    <main class="stream-page__main" role="main" aria-label="Stream content">
      <StreamPlayer
        v-if="stream"
        :channel="stream.user_name"
        aria-label="Live stream player"
      />
      
      <p v-else class="stream-page__title" role="alert" aria-live="assertive">
        This channel is currently offline.
      </p>

      <StreamActions
        v-if="stream"
        aria-label="Stream interaction actions"
      />
      
      <StreamHeader
        :stream="stream"
        :user="user"
        :duration="getDuration"
        aria-label="Stream information"
      />
      
      <StreamAbout
        :user="user"
        aria-label="Streamer biography and info"
      />
    </main>

    <StreamChat
      v-if="stream"
      :channel="stream.user_name"
      role="complementary"
      aria-label="Live chat"
    />
  </div>
</template>


<style scoped lang="scss">
  .stream-page {
    display: flex;
    background-color: color('body-black');
    color: color('font-white');
    min-height: 100vh;

    @media (width <= 64em) {
      flex-direction: column;
    }
  }

  .stream-page__main {
    flex: 1;
    padding: 2rem;
  }

  .stream-page__chat {
    flex: 0 1 26rem;
  }
</style>
