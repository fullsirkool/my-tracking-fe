import { defineStore } from 'pinia'
import authRepository from '~/repository/auth.repository'
import { UserClaims } from '~/types/dto/user.dto'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserClaims | null>()

  const setUser = (userInfo: UserClaims) => {
    user.value = userInfo
  }

  const logout = () => {
    const accessTokenCookie = useCookie('access-token')
    const refreshTokenCookie = useCookie('refresh-token')
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    user.value = null
  }

  const refreshToken = async () => {
    const accessTokenCookie = useCookie('access-token', {
      maxAge: 60 * 60 * 24 * 2, // 2days
    })
    const refreshTokenCookie = useCookie('refresh-token', {
      maxAge: 60 * 60 * 24 * 7, // 7days
    })

    try {
      const data = await authRepository.renew(`${refreshTokenCookie.value}`)
      if (!data) throw new Error('Failed to refresh token')
      const { accessToken, refreshToken } = data
      accessTokenCookie.value = accessToken
      refreshTokenCookie.value = refreshToken
    } catch (error) {
      console.error(error)
    }
  }

  return {
    user: readonly(user),
    setUser,
    logout,
    refreshToken,
  }
})
