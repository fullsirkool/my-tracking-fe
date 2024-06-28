import { PaymentDto, PaymentQueryDto } from '~/types/dto/payment.dto'
import { FetchError } from 'ofetch'
import { BaseFetchResponse, BasePagingResponse } from '~/types/dto/base.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async fetchPaymentList(
    params: PaymentQueryDto,
  ): Promise<BaseFetchResponse<BasePagingResponse<PaymentDto> | null>> {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<BasePagingResponse<PaymentDto>>(
      `${BASE_URL}/payment`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
        params,
      },
    )
    return {
      data: data?.value,
      error: error.value?.data,
    }
  },
}
