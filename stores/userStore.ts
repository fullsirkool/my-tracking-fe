import { defineStore } from "pinia";
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const setUser = (u) => {
    user.value = u;
  };

  const initValue = () => {
    const accessTokenCookie = useCookie("access-token");
    const refreshTokenCookie = useCookie("refresh-token");
    console.log('accessTokenCookie', accessTokenCookie)
    console.log('refreshTokenCookie', refreshTokenCookie)
    // if (!accessTokenCookie && !refreshTokenCookie) {
    //   return;
    // }

    // if (!accessTokenCookie) {
    // }

    const loadedInfo = localStorage.getItem("user-info");
    if (typeof loadedInfo === "string") {
      user.value = JSON.parse(loadedInfo);
    }
  };

  const recallToken = async () => {
    const { data } = await useFetch(`${BASE_URL}/auth/renew`, {
      method: "POST",
      body: {

      }
    });
  };

  initValue();

  return {
    user,
    setUser,
  };
});
