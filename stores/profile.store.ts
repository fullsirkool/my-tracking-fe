import { defineStore } from "pinia";
import activityRepository from "~/repository/activity.repository";
import userRepository from "~/repository/user.repository";
import { ActivityDto, ActivityDetail } from "~/types/dto/activity.dto";
import { UserClaims } from "~/types/dto/user.dto";

export const useProfileStore = defineStore("profile", () => {
  const chartDate = ref(new Date());
  const activities = ref<ActivityDto[] | null>([]);
  const activitiesDetail = ref<ActivityDetail[] | null>([]);
  const stravaId = ref<string>("");
  const user = ref<UserClaims | null>(null);
  const detailPage = ref(1);
  const detailSize = ref(9);
  const totalDetailPage = ref(1);
  const totalActivities = ref(0);

  const handleChangeMonth = async (sign: string) => {
    if (sign === "+") {
      chartDate.value = new Date(
        chartDate.value.getFullYear(),
        chartDate.value.getMonth() + 1,
        10
      );
    } else {
      chartDate.value = new Date(
        chartDate.value.getFullYear(),
        chartDate.value.getMonth() - 1,
        10
      );
    }
    await fetchMonthlyActivitiesDetail({ page: 1 });
    await fetchDailyActivityStatistics();
  };
  const fetchDailyActivityStatistics = async () => {
    try {
      const data = await activityRepository.fetchMonthlyActivities({
        date: chartDate.value.toISOString(),
        stravaId: stravaId.value,
      });
      activities.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthlyActivitiesDetail = async (params: {
    fromWatch?: Boolean;
    page?: number;
  }) => {
    try {
      const { fromWatch, page } = params;
      if (!fromWatch && page) {
        detailPage.value = page;
      }
      const res = await activityRepository.fetchMonthlyActivitiesDetail({
        page: detailPage.value,
        size: detailSize.value,
        date: chartDate.value.toISOString(),
        stravaId: stravaId.value,
      });
      if (res) {
        const { data, page, size, totalPages, totalElement } = res;
        activitiesDetail.value = data;
        totalDetailPage.value = totalPages;
        totalActivities.value = totalElement;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInfo = async (id: any) => {
    try {
      if (id) {
        stravaId.value = id;
      }
      const data = await userRepository.fetchUserInfo(stravaId.value);
      user.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  watch(detailPage, async (newVal) => {
    console.log("change detailPage", newVal);
    await fetchMonthlyActivitiesDetail({ fromWatch: true });
  });

  return {
    chartDate,
    activities,
    stravaId,
    user,
    activitiesDetail,
    detailPage,
    detailSize,
    totalDetailPage,
    totalActivities,
    handleChangeMonth,
    fetchDailyActivityStatistics,
    fetchUserInfo,
  };
});
