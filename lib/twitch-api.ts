export class TwitchAPI {
  private static instance: TwitchAPI
  private accessToken: string = ''
  private clientId: string = 'va7xnqwslf474s8s228l5gxo1dljuh'
  private clientSecret: string = 'my380gbru8ll7r7njcbd8iqu720tuw'
  private apiBase = 'https://api.twitch.tv/helix'

  private constructor() {}

  public static async getInstance(): Promise<TwitchAPI> {
    if (!TwitchAPI.instance) {
      const api = new TwitchAPI()
      await api.fetchAccessToken()
      TwitchAPI.instance = api
    }
    return TwitchAPI.instance
  }

  private async fetchAccessToken() {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
      { method: 'POST' }
    )
    const data = await res.json()
    this.accessToken = data.access_token
  }

  private getHeaders() {
    return {
      'Client-ID': this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
    }
  }

  public async getStreams() {
    const res = await fetch(`${this.apiBase}/streams?first=10`, {
      headers: this.getHeaders(),
    })
    const json = await res.json()
    return json
  }

  public async getCategories() {
    const res = await fetch(`${this.apiBase}/games/top`, {
      headers: this.getHeaders(),
    })
    return res.json()
  }

  public async getStreamByUserId(userId: string) {
    const res = await fetch(`${this.apiBase}/streams?user_id=${userId}`, {
      headers: this.getHeaders(),
    })
    return res.json()
  }

  public async getUsers(usernames: string[]): Promise<any[]> {
    const validUsernameRegex = /^[a-zA-Z0-9_]{4,25}$/

    const sanitizedUsernames = usernames
      .filter(Boolean)
      .map((u) => u.trim())
      .filter((u) => validUsernameRegex.test(u))

    if (sanitizedUsernames.length === 0) {
      console.warn('No hay usernames válidos para consultar:', usernames)
      return []
    }

    try {
      const query = sanitizedUsernames.map((u) => `login=${encodeURIComponent(u)}`).join('&')

      const res = await fetch(`${this.apiBase}/users?${query}`, {
        headers: this.getHeaders(),
      })

      const json = await res.json()

      if (!res.ok) {
        console.warn('Error de la API:', json)
        return []
      }

      return Array.isArray(json.data) ? json.data : []
    } catch (err) {
      console.error('Fallo en getUsers:', err)
      return []
    }
  }
}
