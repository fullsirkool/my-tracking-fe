import { UserClaims } from './../types/dto/user.dto'
const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async fetchUserInfo(id: string): Promise<UserClaims | null> {
    const { data } = await useFetch<UserClaims>(`${BASE_URL}/user/${id}`)
    return data.value
  },
}
