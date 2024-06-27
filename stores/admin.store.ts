import { defineStore } from 'pinia'
// import authRepository from '~/repository/auth.repository'
import authAdminRepository from '~/repository/authAdmin.repository'
import { UserClaims } from '~/types/dto/user.dto'
import { SignInAdminDto } from '~/types/dto/auth.dto'

export const useAdminStore = defineStore('admin', () => {
  const user = ref<UserClaims | null>()

  const setUser = (userInfo: UserClaims) => (user.value = userInfo)

  const login = async (payload: SignInAdminDto) => {
    const data = await authAdminRepository.signIn(payload)

    return data
  }

  const logout = () => {
    const accessTokenCookie = useCookie('access-token')
    const refreshTokenCookie = useCookie('refresh-token')
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    user.value = null
  }

  const getUser = () => {
    return readonly(user)
  }

  const verifyUser = async () => {
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
      console.log('accessTokenCookie.value', accessTokenCookie.value)
      if (!accessTokenCookie.value) {
        const data = await authAdminRepository.renew(
          `${refreshTokenCookie.value}`,
        )
        if (data) {
          const { accessToken, refreshToken } = data
          accessTokenCookie.value = accessToken
          refreshTokenCookie.value = refreshToken
          console.log(data)
        }
      }
      // const loadedInfo = localStorage.getItem('user-info')
      // if (loadedInfo) {
      //   const loadedUser = JSON.parse(loadedInfo)
      //   if (loadedUser?.activated) {
      //     user.value = loadedUser
      //   } else {
      //     localStorage.removeItem('user-info')
      //   }
      // }

      // asign admin info
    } catch (error) {
      console.error(error)
    }
  }

  return {
    verifyUser,
    getUser,
    setUser,
    login,
    logout,
  }
})
