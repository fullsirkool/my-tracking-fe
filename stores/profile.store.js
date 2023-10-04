import { defineStore } from "pinia";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    chartDate: new Date(),
    series: [],
  }),
  actions: {
    async handleChangeMonth(sign) {
      if (sign === "+") {
        this.chartDate = new Date(this.chartDate.getFullYear(), this.chartDate.getMonth() + 1, 10)
      } else {
        this.chartDate = new Date(this.chartDate.getFullYear(), this.chartDate.getMonth() - 1, 10)
      }
      await this.fetchSeries()
    },
    async fetchSeries() {
      const { data } = await useFetch(`${BASE_URL}/activity/monthly`, {
        params: {
          date: this.chartDate.toISOString(),
        },
      });
      this.series = data;
    },
  },
});