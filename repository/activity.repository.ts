import type {
  ActivityMontlyDto,
  DailyActivityDto,
  FindActivityDto,
  FindActivityResponse,
  ManualCreateActivityDto,
  StatisticsDto,
} from '~/types/dto/activity.dto'
import type { BaseCreateResponse } from '~/types/dto/base.dto'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

export default {
  async fetchMonthlyActivities(
    params: ActivityMontlyDto,
  ): Promise<DailyActivityDto[] | null> {
    const { data } = await useFetch<DailyActivityDto[]>(
      `${BASE_URL}/activity/monthly`,
      {
        params,
      },
    )

    return data.value
  },

  async fetchStatistics(
    userId: string | number,
  ): Promise<StatisticsDto | null> {
    const { data } = await useFetch<StatisticsDto>(
      `${BASE_URL}/activity/statistics/${userId}`,
    )

    return data.value
  },

  async fetchMonthlyActivitiesDetail(
    params: FindActivityDto,
  ): Promise<FindActivityResponse | null> {
    const { data } = await useFetch<FindActivityResponse>(
      `${BASE_URL}/activity`,
      {
        params,
      },
    )

    return data.value
  },

  async manualCreate(
    body: ManualCreateActivityDto,
  ): Promise<BaseCreateResponse | null> {
    const accessTokenCookie = useCookie('access-token')
    if (!accessTokenCookie.value) {
      navigateTo('/signin')
    }
    const { data } = await useFetch<BaseCreateResponse>(
      `${BASE_URL}/activity/manual`,
      {
        method: 'POST',
        body,
        headers: { Authorization: `Bearer ${accessTokenCookie.value}` },
      },
    )

    return data.value
  },
}
