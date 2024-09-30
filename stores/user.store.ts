import { defineStore } from 'pinia'
import authRepository from '~/repository/auth.repository'
import userRepository from '~/repository/user.repository'
import type { UserClaims } from '~/types/dto/user.dto'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserClaims | null>(null)

  const accessTokenCookie = useCookie('access-token', {
    maxAge: 60 * 60 * 24 * 2,
  })
  const refreshTokenCookie = useCookie('refresh-token', {
    maxAge: 60 * 60 * 24 * 7,
  })

  const setUser = (userInfo: UserClaims) => {
    user.value = userInfo
  }

  const logout = () => {
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    user.value = null
  }

  const fetchUserInfo = async () => {
    try {
      const response = await authRepository.fetchUserInfo()
      if (!response) throw new Error('Fail')
      const { data, error } = response
      if (data) setUser(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const refreshToken = async () => {
    try {
      const data = await authRepository.renew(`${refreshTokenCookie.value}`)
      if (!data) throw new Error('Failed to refresh token')
      const { accessToken, refreshToken } = data
      accessTokenCookie.value = accessToken
      refreshTokenCookie.value = refreshToken
      await fetchUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  const isSignedIn = computed(() => !!user.value)

  const userId = computed(() => user.value?.id)

  return {
    userId,
    user: readonly(user),
    setUser,
    logout,
    refreshToken,
    fetchUserInfo,
    isSignedIn,
  }
})
