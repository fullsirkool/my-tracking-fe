import type {
  IAthleteRecord,
  IAthleteListResponse,
  IAthleteFilter,
} from '~/types/dto/athletes.dto'

import type {
  BaseFetchResponse,
  BasePagingResponse,
  BasePagingDto,
} from '~/types/dto/base.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

type AthletesParamsRequest = BasePagingDto & IAthleteFilter

export default {
  async fetchAtheleList(
    params: AthletesParamsRequest,
  ): Promise<BaseFetchResponse<BasePagingResponse<IAthleteRecord> | null>> {
    const accessTokenCookie = useCookie('x-access-token')
    const { data, error } = await useFetch<
      BasePagingResponse<IAthleteRecord>
    >(`${BASE_URL}/challenge/${params.id}/players`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      params,
    })
    return {
      data: data?.value,
      error: error.value?.data,
    }
  },
}
