import { defineStore } from 'pinia'
// import authRepository from '~/repository/auth.repository'
import authAdminRepository from '~/repository/authAdmin.repository'
// import { UserClaims } from '~/types/dto/user.dto'
import { AdminInfoDto } from '~/types/dto/admin.dto'
import { SignInAdminDto } from '~/types/dto/auth.dto'

export const useAdminStore = defineStore('admin', () => {
  const user = ref<AdminInfoDto | null>(null)

  const setUser = (adminInfo: AdminInfoDto) => (user.value = adminInfo)

  const login = async (payload: SignInAdminDto) => {
    const data = await authAdminRepository.signIn(payload)

    return data
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
    console.log('fetchUserInfo > admin', response.data)
    response.data && setUser(response.data)
  }

  const refreshToken = async () => {
    const accessTokenCookie = useCookie('x-access-token', {
      maxAge: 60 * 60 * 24 * 2, // 2days
    })

    const refreshTokenCookie = useCookie('x-refresh-token', {
      maxAge: 60 * 60 * 24 * 7, // 7days
    })

    console.log('refresh token for admin')
    try {
      if (!refreshTokenCookie.value) throw new Error('No refresh token found')

      const data = await authAdminRepository.renew(
        refreshTokenCookie.value as string,
      )

      if (!data) throw new Error('Invalid refresh token')

      const { accessToken, refreshToken } = data
      accessTokenCookie.value = accessToken
      refreshTokenCookie.value = refreshToken

      fetchUserInfo()
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
    isSignedIn
  }
})
