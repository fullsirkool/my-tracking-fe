import { defineStore } from 'pinia'
import authRepository from '~/repository/auth.repository'
import { UserClaims } from '~/types/dto/user.dto'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserClaims | null>()

  const setUser = (u: UserClaims) => {
    user.value = u
  }

  const logout = () => {
    const accessTokenCookie = useCookie('access-token')
    const refreshTokenCookie = useCookie('refresh-token')
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    localStorage.removeItem('user-info')
    user.value = null
  }

  const getUser = () => {
    return user.value
  }

  const initValue = async () => {
    const accessTokenExpireTime = new Date(
      new Date().getTime() + 48 * 60 * 60 * 1000,
    )
    const refreshTokenExpireTime = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    )

    const accessTokenCookie = useCookie('access-token', {
      expires: accessTokenExpireTime,
    })
    const refreshTokenCookie = useCookie('refresh-token', {
      expires: refreshTokenExpireTime,
    })

    try {
      if (!accessTokenCookie.value) {
        const data = await authRepository.renew(`${refreshTokenCookie.value}`)
        if (data) {
          const { accessToken, refreshToken } = data
          accessTokenCookie.value = accessToken
          refreshTokenCookie.value = refreshToken
        }
      }
      const loadedInfo = localStorage.getItem('user-info')
      if (loadedInfo) {
        const loadedUser = JSON.parse(loadedInfo)
        if (loadedUser?.activated) {
          user.value = loadedUser
        } else {
          localStorage.removeItem('user-info')
        }
      }
    } catch (error) {
      localStorage.removeItem('user-info')
    }
  }

  initValue()

  return {
    user,
    getUser,
    setUser,
    logout,
    initValue,
  }
})
