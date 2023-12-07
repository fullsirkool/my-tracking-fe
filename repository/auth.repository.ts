import {RenewDto, SignInDto, SignUpDto} from './../types/dto/auth.dto'
import {BaseCreateResponse} from "~/types/dto/base.dto";
import {BaseFetchResponse} from "~/types/dto/base.dto";

const runtimeConfig = useRuntimeConfig()
const {BASE_URL} = runtimeConfig.public

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
        })
        return data.value
    },

    async signUp(signUpDto: SignUpDto): Promise<BaseFetchResponse<BaseCreateResponse | null> | null> {
        const {data, error} = await useFetch<BaseCreateResponse>(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            body: signUpDto,
        })
        console.log('sign up', error.value?.data)
        return {
            data: data.value,
            error: error.value?.data
        }
    }
}
