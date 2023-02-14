import axios from 'axios'

import GameAPI from '../index'

jest.mock('axios')

describe('GameAPI', () => {
  let gameApi: GameAPI

  beforeEach(() => {
    gameApi = new GameAPI()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should set the API URL to the provided value', () => {
    const customApiUrl = 'https://custom.codyfight.com/'
    const gameApiWithCustomUrl = new GameAPI(customApiUrl)
    expect(gameApiWithCustomUrl.apiURL).toBe(customApiUrl)
  })

  it('should return game constants', () => {
    const gameConstants = gameApi.getGameConstants()
    expect(gameConstants).toEqual({})
  })

  it('should make a POST request on init', async () => {
    const ckey = 'abc'
    const mode = 2
    const opponent = 'def'
    const params = { ckey, mode, opponent }
    const response = { data: 'game init successful' }
    ;(axios as any).mockResolvedValueOnce(response)

    const result = await gameApi.init(ckey, mode, opponent)

    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      url: `https://game.codyfight.com/`,
      headers: { 'Content-Type': 'application/json' },
      data: params,
    })
    expect(result).toBe(response.data)
  })

  it('should make a PATCH request on cast', async () => {
    const ckey = 'abc'
    const skill_id = 1
    const x = 2
    const y = 3
    const params = { ckey, skill_id, x, y }
    const response = { data: 'skill cast successful' }
    ;(axios as any).mockResolvedValueOnce(response)

    const result = await gameApi.cast(ckey, skill_id, x, y)

    expect(axios).toHaveBeenCalledWith({
      method: 'PATCH',
      url: `https://game.codyfight.com/`,
      headers: { 'Content-Type': 'application/json' },
      data: params,
    })
    expect(result).toBe(response.data)
  })

  it('should make a PUT request on move', async () => {
    const ckey = 'abc'
    const x = 2
    const y = 3
    const params = { ckey, x, y }
    const response = { data: 'move successful' }
    ;(axios as any).mockResolvedValueOnce(response)

    const result = await gameApi.move(ckey, x, y)

    expect(axios).toHaveBeenCalledWith({
      method: 'PUT',
      url: `https://game.codyfight.com/`,
      headers: { 'Content-Type': 'application/json' },
      data: params,
    })
    expect(result).toBe(response.data)
  })

  it('should make a GET request on check', async () => {
    const ckey = 'abc'
    const response = { data: 'game state' }
    ;(axios as any).mockResolvedValueOnce(response)

    const result = await gameApi.check(ckey)

    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://game.codyfight.com/?ckey=${ckey}`,
      headers: { 'Content-Type': 'application/json' },
      data: {},
    })
    expect(result).toBe(response.data)
  })
})
