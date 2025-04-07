import { TwitchAPI } from '@/lib/twitch-api'

export function useTwitch() {
  const streams = ref<any[]>([])
  const categories = ref<any[]>([])

  const fetchData = async () => {
    const api = await TwitchAPI.getInstance()
    const [streamsResult, categoriesResult] = await Promise.all([
      api.getStreams(),
      api.getCategories(),
    ])

    const topStreams = streamsResult.data || []
    categories.value = categoriesResult.data || []

    const userIds = topStreams.map((s: any) => s.user_id)
    const usersResult = await api.getUsersByIds(userIds)

    const userMap = Object.fromEntries(usersResult.map((u: any) => [u.id, u]))

    streams.value = topStreams.map((stream: any) => ({
      ...stream,
      profile_image_url: userMap[stream.user_id]?.profile_image_url || '',
    }))
  }

  return { streams, categories, fetchData }
}
