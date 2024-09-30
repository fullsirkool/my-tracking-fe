import { defineStore } from 'pinia'
// import authRepository from '~/repository/auth.repository'
import authAdminRepository from '~/repository/authAdmin.repository'
// import { UserClaims } from '~/types/dto/user.dto'
import type { AdminInfoDto } from '~/types/dto/admin.dto'
import type { SignInAdminDto } from '~/types/dto/auth.dto'

export const useAdminStore = defineStore('admin', () => {
  const user = ref<AdminInfoDto | null>(null)

  const setUser = (adminInfo: AdminInfoDto) => (user.value = adminInfo)

  const login = (payload: SignInAdminDto) => {
    return authAdminRepository.signIn(payload)
  }

  const logout = () => {
    const accessTokenCookie = useCookie('x-access-token')
    const refreshTokenCookie = useCookie('x-refresh-token')
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    user.value = null
  }

  const fetchUserInfo = async () => {
    const response = await authAdminRepository.fetchInfo()
    response.data && setUser(response.data)
  }

  const refreshToken = async () => {
    const accessTokenCookie = useCookie('x-access-token')
    const refreshTokenCookie = useCookie('x-refresh-token')
    try {
      if (!refreshTokenCookie.value) throw new Error('No refresh token found')

      const data = await authAdminRepository.renew(
        refreshTokenCookie.value as string,
      )

      if (!data) throw new Error('Invalid refresh token')

      const { accessToken, refreshToken } = data
      accessTokenCookie.value = accessToken
      refreshTokenCookie.value = refreshToken

      await fetchUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  const isSignedIn = computed(() => !!user.value)

  return {
    setUser,
    user: readonly(user),
    login,
    logout,
    fetchUserInfo,
    refreshToken,
    isSignedIn,
  }
})
