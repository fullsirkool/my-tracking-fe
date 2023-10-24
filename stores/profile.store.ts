import { defineStore } from "pinia";
import activityRepository from "~/repository/activity.repository";
import userRepository from "~/repository/user.repository";
import { DailyActivityDto } from "~/types/dto/activity.dto";
import { UserClaims } from "~/types/dto/user.dto";

export const useProfileStore = defineStore("profile", () => {
  const chartDate = ref(new Date());
  const activities = ref<DailyActivityDto[] | null>([]);
  const stravaId = ref<string>("");
  const user = ref<UserClaims | null>(null);

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
    await fetchActivities();
  };
  const fetchActivities = async () => {
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

  return {
    chartDate,
    activities,
    stravaId,
    user,
    handleChangeMonth,
    fetchActivities,
    fetchUserInfo,
  };
});
