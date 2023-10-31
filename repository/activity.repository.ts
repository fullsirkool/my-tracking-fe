import {
  ActivityMontlyDto,
  DailyActivityDto,
  FindActivityDto,
  FindActivityResponse,
  StatisticsDto,
} from "./../types/dto/activity.dto";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export default {
  async fetchMonthlyActivities(
    params: ActivityMontlyDto
  ): Promise<DailyActivityDto[] | null> {
    const { data } = await useFetch<DailyActivityDto[]>(
      `${BASE_URL}/activity/monthly`,
      {
        params,
      }
    );

    return data.value;
  },

  async fetchStatistics(
    userId: string | number
  ): Promise<StatisticsDto | null> {
    const { data } = await useFetch<StatisticsDto>(
      `${BASE_URL}/activity/statistics/${userId}`
    );

    return data.value;
  },

  async fetchMonthlyActivitiesDetail(
    params: FindActivityDto
  ): Promise<FindActivityResponse | null> {
    const { data } = await useFetch<FindActivityResponse>(`${BASE_URL}/activity`, {
      params,
    });

    return data.value;
  },
};
