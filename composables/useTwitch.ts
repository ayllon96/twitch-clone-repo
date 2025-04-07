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

    const validLoginRegex = /^[a-zA-Z0-9_]{4,25}$/

    const filteredStreams = topStreams.filter((s: any) => validLoginRegex.test(s.user_name))

    const usernames = filteredStreams.map((s: any) => s.user_name.toLowerCase())
    const usersResult = await api.getUsers(usernames)

    const userMap = Object.fromEntries(usersResult.map((u: any) => [u.login.toLowerCase(), u]))

    streams.value = filteredStreams.map((stream: any) => ({
      ...stream,
      profile_image_url: userMap[stream.user_name.toLowerCase()]?.profile_image_url || '',
    }))
  }

  return { streams, categories, fetchData }
}
