import { defineStore } from "pinia";

const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

const accessToken = useCookie('access-token')

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {},
  }),
  actions: {
    async fetchUserInfo() {
      try {
        const { data } = await useFetch(`${BASE_URL}/auth`, {
          headers: {
          }
        });
        this.activities = data.value;
        this.isLoadingActivities = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
