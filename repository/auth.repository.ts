import {CompleteDto, RenewDto, SignInDto} from './../types/dto/auth.dto'
import {UserClaims} from "~/types/dto/user.dto";

const runtimeConfig = useRuntimeConfig()
const {BASE_URL} = runtimeConfig.public

const accessTokenCookie = useCookie('access-token')

export default {
    async signIn(code: number): Promise<SignInDto | null> {
        const url = `${BASE_URL}/auth/signin/${code}`
        const {data} = await useFetch<SignInDto>(url, {
            method: 'post',
        })
        return data.value
    },

    async renew(refreshToken: string): Promise<RenewDto | null> {
        const {data} = await useFetch<RenewDto>(`${BASE_URL}/auth/renew`, {
            method: 'POST',
            body: {
                refreshToken,
            },
            headers: {Authorization: `Bearer ${accessTokenCookie.value}`},
        })
        return data.value
    },

    async complete(completeDto: CompleteDto): Promise<UserClaims | null> {
        const {data} = await useFetch<UserClaims>(`${BASE_URL}/auth/complete`, {
            method: 'PATCH',
            body: completeDto,
            headers: {Authorization: `Bearer ${accessTokenCookie.value}`},
        })
        return data.value
    },
}
