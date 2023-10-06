import { defineStore } from "pinia";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    chartDate: new Date(),
    activities: [],
    isLoadingActivities: false,
    stravaId: null,
    user: {},
  }),
  actions: {
    async handleChangeMonth(sign) {
      if (sign === "+") {
        this.chartDate = new Date(
          this.chartDate.getFullYear(),
          this.chartDate.getMonth() + 1,
          10
        );
      } else {
        this.chartDate = new Date(
          this.chartDate.getFullYear(),
          this.chartDate.getMonth() - 1,
          10
        );
      }
      await this.fetchActivities();
    },
    async fetchActivities(stravaId) {
      try {
        if (this.isLoadingActivities) {
          return;
        }
        this.isLoadingActivities = true;
        if (stravaId) {
          this.stravaId = stravaId;
        }
        const { data } = await useFetch(`${BASE_URL}/activity/monthly`, {
          params: {
            date: this.chartDate.toISOString(),
            stravaId: this.stravaId,
          },
        });
        this.activities = data.value;
        this.isLoadingActivities = false;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserInfo(stravaId) {
      try {
        if (this.isLoadingActivities) {
          return;
        }
        this.isLoadingActivities = true;
        if (stravaId) {
          this.stravaId = stravaId;
        }
        const { data } = await useFetch(`${BASE_URL}/user/${stravaId}`);
        this.user = data.value;
        this.isLoadingActivities = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
