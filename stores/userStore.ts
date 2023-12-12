import {defineStore} from 'pinia'
import authRepository from '~/repository/auth.repository'
import {UserClaims} from '~/types/dto/user.dto'

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

    const initValue = async () => {
        const accessTokenExpireTime = new Date(
            new Date().getTime() + 48 * 60 * 60 * 1000,
        )
        const refreshTokenExpireTime = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

        const accessTokenCookie = useCookie('access-token', {
            expires: accessTokenExpireTime,
        })
        const refreshTokenCookie = useCookie('refresh-token', {
            expires: refreshTokenExpireTime,
        })
        if (!accessTokenCookie.value && !refreshTokenCookie.value) {
            localStorage.removeItem('user-info')
            return
        }

        try {
            if (!accessTokenCookie.value) {
                const data = await authRepository.renew(`${refreshTokenCookie.value}`)
                if (data) {
                    const {accessToken, refreshToken} = data
                    accessTokenCookie.value = accessToken
                    refreshTokenCookie.value = refreshToken
                }
            }
            const loadedInfo = localStorage.getItem('user-info')
            if (typeof loadedInfo === 'string') {
                user.value = JSON.parse(loadedInfo)
            }
        } catch (error) {
            localStorage.removeItem('user-info')
        }
    }

    initValue()

    return {
        user,
        setUser,
        logout,
        initValue,
    }
})
