import {AuthResponseDto, RenewDto, SignInDto, SignUpDto} from './../types/dto/auth.dto'
import {BaseCreateResponse} from "~/types/dto/base.dto";
import {BaseFetchResponse} from "~/types/dto/base.dto";
import {UserClaims} from "~/types/dto/user.dto";

const runtimeConfig = useRuntimeConfig()
const {BASE_URL} = runtimeConfig.public

const accessTokenCookie = useCookie('access-token')

export default {
    async signIn(signInDto: SignInDto): Promise<BaseFetchResponse<AuthResponseDto | null>> {
        const url = `${BASE_URL}/auth/sign-in`
        const {data, error} = await useFetch<AuthResponseDto>(url, {
            method: 'POST',
            body: signInDto
        })
        return {
            data: data.value,
            error: error.value?.data
        }
    },

    async connectStrava(code: number): Promise<AuthResponseDto | null> {
        if (!accessTokenCookie.value) {
            navigateTo('/signin')
        }
        const url = `${BASE_URL}/auth/connect/${code}`
        const {data} = await useFetch<AuthResponseDto>(url, {
            method: 'POST',
            headers: {Authorization: `Bearer ${accessTokenCookie.value}`},
        })
        return data.value
    },

    async renew(refreshToken: string): Promise<RenewDto | null> {
        const {data} = await useFetch<RenewDto>(`${BASE_URL}/auth/renew`, {
            method: 'POST',
            body: {
                refreshToken,
            },
        })
        return data.value
    },

    async signUp(signUpDto: SignUpDto): Promise<BaseFetchResponse<BaseCreateResponse | null>> {
        const {data, error} = await useFetch<BaseCreateResponse>(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            body: signUpDto,
        })
        return {
            data: data.value,
            error: error.value?.data
        }
    },

    async verify(capcha: string): Promise<BaseFetchResponse<UserClaims | null>> {
        const {data, error} = await useFetch<UserClaims>(`${BASE_URL}/auth/verify/${capcha}`, {
            method: 'PATCH',
        })
        return {
            data: data.value,
            error: error.value?.data
        }
    },

    async resendEmail(signInDto: SignInDto): Promise<BaseFetchResponse<BaseCreateResponse | null>> {
        const url = `${BASE_URL}/auth/resend-email`
        const {data, error} = await useFetch<BaseCreateResponse>(url, {
            method: 'POST',
            body: signInDto
        })
        return {
            data: data.value,
            error: error.value?.data
        }
    }
}
