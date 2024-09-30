import {
  TicketDto,
  TicketGroupDto,
  TicketOfGroupPagingDto,
  TicketPagingDto,
  ITicketRegistrationInfo, IUpdateTicketInformation, IUpdateGroupTicketInformation
} from '~/types/dto/ticket.dto'
import type {
  BaseFetchResponse,
  BasePagingResponse,
} from '~/types/dto/base.dto'
import {
  ChallengeGroupRegisterResponse,
  ChallengeIndividualRegisterResponse,
  IChallengeIndividualRegisterInfo
} from '~/types/dto/challenge.dto'
import { UnwrapNestedRefs } from 'vue'
// import * as TicketDto from '~/types/dto/ticket.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async fetchGroupTicket(
    params: TicketPagingDto,
  ): Promise<BaseFetchResponse<BasePagingResponse<TicketGroupDto> | null>> {
    const accessTokenCookie = useCookie('access-token')
    const { data, error } = await useFetch<BasePagingResponse<TicketGroupDto>>(
      `${BASE_URL}/ticket/group`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        params,
      },
    )
    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async fetchTicketOfGroup(
    groupId: number,
    params: TicketOfGroupPagingDto,
  ): Promise<BaseFetchResponse<BasePagingResponse<TicketDto> | null>> {
    const accessTokenCookie = useCookie('access-token')
    const { data, error } = await useFetch<BasePagingResponse<TicketDto>>(
      `${BASE_URL}/ticket/group/list/${groupId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        params,
      },
    )
    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async fetchIndividualTicket(
    params: TicketPagingDto,
  ): Promise<BaseFetchResponse<BasePagingResponse<TicketDto> | null>> {
    const accessTokenCookie = useCookie('access-token')
    const { data, error } = await useFetch<BasePagingResponse<TicketDto>>(
      `${BASE_URL}/ticket/individual`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        params,
      },
    )
    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async updateTicketIndividual(
    payload: UnwrapNestedRefs<Partial<IUpdateTicketInformation>> & {}
  ): Promise<any> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/ticket/individual`
    const { data, error } = await useFetch<ChallengeIndividualRegisterResponse>(
      url,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        body: {
          ...payload,
        },
      },
    )
    return { data, error }
  },

  async fetchOneTicketIndividual(ticketId: number): Promise<BaseFetchResponse<TicketDto | null>> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/ticket/individual/${ticketId}`
    const { data, error } = await useFetch<TicketDto>(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })

    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async fetchOneTicketGroup(ticketId: number): Promise<BaseFetchResponse<TicketGroupDto | null>> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/ticket/group/${ticketId}`
    const { data, error } = await useFetch<TicketGroupDto | null>(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })

    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async updateTicketGroup(
    payload: UnwrapNestedRefs<Partial<IUpdateGroupTicketInformation>> & {}
  ): Promise<any> {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/ticket/group`
    const { data, error } = await useFetch<ChallengeGroupRegisterResponse>(
      url,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        body: {
          ...payload,
        },
      },
    )
    return { data, error }
  },

  async getTicketInfo(ticketCode: string) {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/ticket/${ticketCode}`
    const { data, error } = await useFetch<any>(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })

    return { data, error }
  },

  async completeRegistrationByTicket(payload: ITicketRegistrationInfo) {
    const accessTokenCookie = useCookie('access-token')
    const url = `${BASE_URL}/ticket`
    const { data, error } = await useFetch<ITicketRegistrationInfo>(url, {
      method: 'post',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      body: payload,
    })

    return { data, error }
  },
}
