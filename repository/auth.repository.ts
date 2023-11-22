import { RenewDto, SignInDto } from './../types/dto/auth.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async signIn(code: number): Promise<SignInDto | null> {
    const url = `${BASE_URL}/auth/signin/${code}`
    const { data } = await useFetch<SignInDto>(url, {
      method: 'post',
    })
    return data.value
  },

  async renew(refreshToken: string): Promise<RenewDto | null> {
    const { data } = await useFetch<RenewDto>(`${BASE_URL}/auth/renew`, {
      method: 'POST',
      body: {
        refreshToken,
      },
    })
    return data.value
  },
}
