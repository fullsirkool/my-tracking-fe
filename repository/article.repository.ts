import type { BaseFetchResponse } from '~/types/dto/base.dto'
import {
  type
  Article,
  type CreateArticleDto, type DeleteArticleDto,
  type FindArticleDto,
  type FindArticleResponse,
  type UpdateArticleDto
} from '~/types/dto/article.dto'
import { type BaseCreateResponse, type BaseUpdateResponse } from '~/types/dto/base.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async create(payload: CreateArticleDto) {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<BaseCreateResponse>(`${BASE_URL}/article`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      body: payload,
    })
    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async fetchList(params: FindArticleDto) : Promise<BaseFetchResponse<FindArticleResponse | null>> {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<FindArticleResponse>(`${BASE_URL}/article`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      params,
    })

    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async fetchOne({id}: {id: number}) : Promise<BaseFetchResponse<Article | null>> {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<Article>(`${BASE_URL}/article/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })

    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async update(payload: UpdateArticleDto) {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<BaseUpdateResponse>(`${BASE_URL}/article`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      body: payload
    })

    return {
      data: data?.value,
      error: error.value?.data,
    }
  },

  async delete(payload: DeleteArticleDto) {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<BaseUpdateResponse>(`${BASE_URL}/article`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      body: payload
    })

    return {
      data: data?.value,
      error: error.value?.data,
    }
  }
}