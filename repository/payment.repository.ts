import { PaymentDto, PaymentQueryDto, UpdatePaymentStatus } from '~/types/dto/payment.dto'
import type {BaseFetchResponse, BasePagingResponse} from '~/types/dto/base.dto'

const runtimeConfig = useRuntimeConfig()
const {BASE_URL} = runtimeConfig.public

export default {
    async fetchPaymentList(
        params: PaymentQueryDto,
    ): Promise<BaseFetchResponse<BasePagingResponse<PaymentDto> | null>> {
        const accessTokenCookie = useCookie('x-access-token')
        const {data, error} = await useFetch<BasePagingResponse<PaymentDto>>(
            `${BASE_URL}/payment`,
            {
                method: 'GET',
                headers: {Authorization: `Bearer ${accessTokenCookie.value}`},
                params,
            },
        )
        return {
            data: data?.value,
            error: error.value?.data,
        }
    },
    async updatePaymentStatus(payload: UpdatePaymentStatus) {
        const accessTokenCookie = useCookie('x-access-token')
        const {data, error} = await useFetch<BasePagingResponse<PaymentDto>>(
            `${BASE_URL}/payment/status`,
            {
                method: 'PATCH',
                headers: {Authorization: `Bearer ${accessTokenCookie.value}`},
                body: payload
            },
        )
        return {
            data: data?.value,
            error: error.value?.data,
        }
    }


}
