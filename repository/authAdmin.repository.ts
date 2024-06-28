import {
  AuthResponseDto,
  RenewDto,
  SignInAdminDto,
} from './../types/dto/auth.dto'
import { AdminInfoDto } from '~/types/dto/admin.dto'
import { BaseFetchResponse } from '~/types/dto/base.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public



export default {
  async signIn(
    signInDto: SignInAdminDto,
  ): Promise<BaseFetchResponse<AuthResponseDto | null>> {
    const url = `${BASE_URL}/auth/admin/sign-in`
    const { data, error } = await useFetch<AuthResponseDto>(url, {
      method: 'POST',
      body: signInDto,
    })
    return {
      data: data.value,
      error: error.value?.data,
    }
  },

  async renew(refreshToken: string): Promise<RenewDto | null> {
    const url = `${BASE_URL}/auth/admin/renew`
    const { data } = await useFetch<RenewDto>(url, {
      method: 'POST',
      body: {
        refreshToken,
      },
    })
    return data.value
  },

  async fetchInfo(): Promise<BaseFetchResponse<AdminInfoDto | null>> {
    const accessTokenCookie = useCookie('x-access-token')
    const url = `${BASE_URL}/auth/admin/self`
    const { data, error } = await useFetch<AdminInfoDto>(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
    })

    return {
      data: data.value,
      error: error.value?.data,
    }
  },
}
