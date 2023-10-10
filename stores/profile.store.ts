import { defineStore } from "pinia";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export const useProfileStore = defineStore("profile", () => {
  const chartDate = ref(new Date());
  const activities = ref<any[]>([]);
  const stravaId: any = ref(null);
  const user = ref({});

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
      const { data } = await useFetch(`${BASE_URL}/activity/monthly`, {
        params: {
          date: chartDate.value.toISOString(),
          stravaId: stravaId.value,
        },
      });
      activities.value = data.value;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserInfo = async (id: any) => {
    try {
      if (id) {
        stravaId.value = id;
      }
      const { data } = await useFetch(`${BASE_URL}/user/${stravaId.value}`);
      user.value = data.value;
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
