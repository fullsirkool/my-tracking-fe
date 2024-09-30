import type {
  ChallengeDetailDto,
  ChallengeUserResponse,
  PagingChallengeDto,
  PagingChallengeResponse,
  Challenge,
  CreateChallengeDto,
  JoinChallengeResponse,
  ChallengeUserParam,
  CheckedJoinChallengeResponse,
  PagingTopChallengeDto,
  IChallengeIndividualRegisterInfo,
  ChallengeIndividualRegisterResponse,
  IChallengeGroupRegisterInfo,
  ChallengeGroupRegisterResponse,
} from '~/types/dto/challenge.dto'

import { type BaseFetchResponse } from '~/types/dto/base.dto'
import {type DeleteChallengeDto} from "~/types/dto/challenge.dto";
import {type BaseUpdateResponse} from "~/types/dto/base.dto";

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public
// const accessTokenCookie = useCookie('access-token')
// const adminAccessTokenCookie = useCookie('x-access-token')

export default {
  async createChallenge(body: CreateChallengeDto) {
    // : Promise<BaseFetchResponse<Challenge | null>>
    const adminAccessTokenCookie = useCookie('x-access-token')
    if (!adminAccessTokenCookie.value) {
      navigateTo('/admin/signin')
    }
    console.log('body', body)
    const url = `${BASE_URL}/challenge`
    const { data, error } = await useFetch<Challenge>(url, {
      method: 'post',
      body,
      headers: { Authorization: `Bearer ${adminAccessTokenCookie.value}` },
    })

    return {
      data: data.value,
      error: error.value?.data,
    }
  },

  async updateChallenge(body: CreateChallengeDto) {
    // : Promise<BaseFetchResponse<Challenge | null>>
    const adminAccessTokenCookie = useCookie('x-access-token')
    if (!adminAccessTokenCookie.value) {
      navigateTo('/admin/signin')
    }
    console.log('body', body)
    const url = `${BASE_URL}/challenge`
    const { data, error } = await useFetch<Challenge>(url, {
      method: 'put',
      body,
      headers: { Authorization: `Bearer ${adminAccessTokenCookie.value}` },
    })

    return {
      data: data.value,
      error: error.value?.data,
    }
  },

  async find(
    params: PagingChallengeDto,
  ): Promise<PagingChallengeResponse | null> {
    const url = `${BASE_URL}/challenge`
    if (!params.availability) delete params.availability
    const { data } = await useFetch<PagingChallengeResponse>(url, {
      method: 'get',
      params,
    })
    return data.value
  },

  async findTop(params: PagingTopChallengeDto): Promise<Challenge[] | null> {
    const url = `${BASE_URL}/challenge/top`
    const { data } = await useFetch<Challenge[]>(url, {
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

  async findChallengeUser(
    id: number,
    params: ChallengeUserParam,
  ): Promise<ChallengeUserResponse | null> {
    const url = `${BASE_URL}/challenge/${id}/user`
    const { data } = await useFetch<ChallengeUserResponse>(url, {
      method: 'get',
      params,
    })
    return data.value
  },

  async join(id: number): Promise<JoinChallengeResponse | null> {
    const accessTokenCookie = useCookie('access-token')
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

  async checkJoinedChallenge(
    id: number,
  ): Promise<CheckedJoinChallengeResponse | null> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/challenge/check-join/${id}`
    const { data } = await useFetch<CheckedJoinChallengeResponse>(url, {
      method: 'get',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })
    return data.value
  },

  async joinChallengeAsIndividual(
    payload: IChallengeIndividualRegisterInfo & { challengeId: number },
  ): Promise<any> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/challenge/join`
    const { data, error } = await useFetch<ChallengeIndividualRegisterResponse>(
      url,
      {
        method: 'post',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        body: {
          ...payload,
        },
      },
    )
    return { data, error }
  },

  async joinChallengeAsGroup(
    payload: IChallengeGroupRegisterInfo & { challengeId: number },
  ): Promise<any> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/challenge/join/group`
    const { data, error } = await useFetch<ChallengeGroupRegisterResponse>(
      url,
      {
        method: 'post',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        body: {
          ...payload,
        },
      },
    )

    return {
      data,
      error,
    }
  },

  async delete(payload: DeleteChallengeDto): Promise<BaseFetchResponse<BaseUpdateResponse | null>> {
    const adminAccessTokenCookie = useCookie('x-access-token')
    if (!adminAccessTokenCookie.value) {
      navigateTo('/admin/signin')
    }
    const url = `${BASE_URL}/challenge`
    const { data, error } = await useFetch<BaseUpdateResponse>(url, {
      method: 'DELETE',
      body: payload,
      headers: { Authorization: `Bearer ${adminAccessTokenCookie.value}` },
    })

    return {
      data: data.value,
      error: error.value?.data,
    }
  }
}
