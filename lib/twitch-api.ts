// lib/twitch-api.ts
export class TwitchAPI {
    private static instance: TwitchAPI;
    private accessToken: string = '';
    private clientId: string = 'va7xnqwslf474s8s228l5gxo1dljuh';
    private clientSecret: string = 'my380gbru8ll7r7njcbd8iqu720tuw';
    private apiBase = 'https://api.twitch.tv/helix';
  
    private constructor() {}
  
    public static async getInstance(): Promise<TwitchAPI> {
      if (!TwitchAPI.instance) {
        const api = new TwitchAPI();
        await api.fetchAccessToken();
        TwitchAPI.instance = api;
      }
      return TwitchAPI.instance;
    }
  
    private async fetchAccessToken() {
      const res = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
        { method: 'POST' }
      );
      const data = await res.json();
      this.accessToken = data.access_token;
    }
  
    private getHeaders() {
      return {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${this.accessToken}`
      };
    }
  
    public async getStreams() {
      const res = await fetch(`${this.apiBase}/streams`, {
        headers: this.getHeaders()
      });
      return res.json();
    }
  
    public async getCategories() {
      const res = await fetch(`${this.apiBase}/games/top`, {
        headers: this.getHeaders()
      });
      return res.json();
    }
  
    public async getStreamByUserId(userId: string) {
      const res = await fetch(`${this.apiBase}/streams?user_id=${userId}`, {
        headers: this.getHeaders()
      });
      return res.json();
    }
  
  }
  