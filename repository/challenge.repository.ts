import {
  ChallengeDetailDto,
  ChallengeUser,
  PagingChallengeDto,
  PagingChallengeResponse,
  Challenge,
  CreateChallengeDto,
  JoinChallengeResponse,
} from './../types/dto/challenge.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public
const accessTokenCookie = useCookie('access-token')

export default {
  async createChallenge(body: CreateChallengeDto): Promise<Challenge | null> {
    if (!accessTokenCookie.value) {
      navigateTo('/signin')
    }
    const url = `${BASE_URL}/challenge`
    const { data } = await useFetch<Challenge>(url, {
      method: 'post',
      body,
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })
    return data.value
  },

  async find(
    params: PagingChallengeDto,
  ): Promise<PagingChallengeResponse | null> {
    const url = `${BASE_URL}/challenge`
    const { data } = await useFetch<PagingChallengeResponse>(url, {
      method: 'get',
      params,
    })
    return data.value
  },

  async findOne(id: number): Promise<ChallengeDetailDto | null> {
    const url = `${BASE_URL}/challenge/${id}`
    const { data } = await useFetch<ChallengeDetailDto>(url, {
      method: 'get',
    })
    return data.value
  },

  async findChallengeUser(id: number): Promise<ChallengeUser[] | null> {
    const url = `${BASE_URL}/challenge/${id}/user`
    const { data } = await useFetch<ChallengeUser[]>(url, {
      method: 'get',
    })
    return data.value
  },

  async join(id: number): Promise<JoinChallengeResponse | null> {
    if (!accessTokenCookie.value) {
      navigateTo('/signin')
    }
    const url = `${BASE_URL}/challenge/join/${id}`
    const { data } = await useFetch<JoinChallengeResponse | null>(url, {
      method: 'post',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })
    return data.value
  },

  async findJoinedChallenge(
    id: string,
    params: PagingChallengeDto,
  ): Promise<PagingChallengeResponse | null> {
    const url = `${BASE_URL}/challenge/user/joined/${id}`
    const { data } = await useFetch<PagingChallengeResponse>(url, {
      method: 'get',
      params,
    })
    return data.value
  },

  async findCreatedChallenge(
    id: string,
    params: PagingChallengeDto,
  ): Promise<PagingChallengeResponse | null> {
    const url = `${BASE_URL}/challenge/user/created/${id}`
    const { data } = await useFetch<PagingChallengeResponse>(url, {
      method: 'get',
      params,
    })
    return data.value
  },
}
