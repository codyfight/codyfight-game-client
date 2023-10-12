import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'https://game.codyfight.com/'

export default class GameAPI {
  public statistics: {
    success: number[]
    error: number[]
    time: number | string
  }

  public apiURL: string
  public headers?: any
  public customParams?: any
  public hasStatistics?: boolean

  constructor(
    apiURL: string = API_URL,
    hasStatistics?: boolean,
    headers?: any,
    customParams?: any
  ) {
    this.apiURL = apiURL
    this.headers = headers
    this.customParams = customParams
    this.hasStatistics = hasStatistics

    this.statistics = {
      success: [],
      error: [],
      time: 0,
    }
  }

  public getGameConstants() {
    return {
      // Game constant
      // ...
    }
  }

  public getStatistics() {
    return {
      success: this.statistics.success.length,
      error: this.statistics.error.length,
      average_time: this.statistics.time,
    }
  }

  public async init(
    ckey: string,
    mode: 0 | 1 | 2 | 3,
    opponent: string
  ): Promise<any> {
    return await this.makeRequest('POST', { ckey, mode, opponent })
  }

  public async cast(
    ckey: string,
    skill_id: number,
    x: number,
    y: number
  ): Promise<any> {
    return await this.makeRequest('PATCH', { ckey, skill_id, x, y })
  }

  public async move(ckey: string, x: number, y: number): Promise<any> {
    return await this.makeRequest('PUT', { ckey, x, y })
  }

  public async check(ckey: string): Promise<any> {
    return await this.makeRequest('GET', { ckey })
  }

  private async makeRequest(method: string, params: any): Promise<any> {
    const config: AxiosRequestConfig = {
      method,
      url: this.apiURL,
      data: method === 'GET' ? {} : params,
      headers: this.headers ?? { 'Content-Type': 'application/json' },
    }

    if (method === 'GET') {
      const customParams = this.customParams
        ? Object.keys(this.customParams)
            .map((key) => `${key}=${this.customParams[key]}`)
            .join('&')
        : ''

      config.url = `${this.apiURL}?ckey=${params.ckey}${
        customParams ? `&${customParams}` : ''
      }`
    }

    const startTime = new Date().getTime()

    try {
      const res = await axios(config)
      const endTime = new Date().getTime()

      if (this.hasStatistics) {
        const requestDuration = endTime - startTime
        this.statistics.success.push(requestDuration)

        const sum = this.statistics.success.reduce((a, b) => a + b, 0)
        const avg = (this.statistics.time =
          sum / this.statistics.success.length)
        this.statistics.time = (avg / 1000).toFixed(3)
      }

      return res?.data
    } catch (err: any) {
      const endTime = new Date().getTime()

      if (this.hasStatistics) {
        const requestDuration = endTime - startTime
        this.statistics.error.push(requestDuration)
      }

      return err?.response?.data ?? { error: err.message }
    }
  }
}
