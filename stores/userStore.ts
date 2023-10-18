import { defineStore } from "pinia";
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const dayjs = useDayjs();

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const setUser = (u) => {
    user.value = u;
  };

  const initValue = async () => {
    const accessTokenExpireTime = dayjs(new Date()).add(12, "hour");
    const refreshTokenExpireTime = dayjs(new Date()).add(1, "year");
    const accessTokenCookie = useCookie("access-token", {
      expires: accessTokenExpireTime,
    });
    const refreshTokenCookie = useCookie("refresh-token", {
      expires: refreshTokenExpireTime,
    });
    if (!accessTokenCookie.value && !refreshTokenCookie.value) {
      return;
    }

    if (!accessTokenCookie.value) {
      const { data } = await useFetch(`${BASE_URL}/activity/monthly`, {
        method: "POST",
        body: {
          refreshToken: refreshTokenCookie.value,
        },
      });
      const { accessToken, refreshToken } = data.value;
      accessTokenCookie.value = accessToken;
      refreshTokenCookie.value = refreshToken;
    }

    const loadedInfo = localStorage.getItem("user-info");
    if (typeof loadedInfo === "string") {
      user.value = JSON.parse(loadedInfo);
    }
  };

  const recallToken = async () => {
    const { data } = await useFetch(`${BASE_URL}/auth/renew`, {
      method: "POST",
      body: {},
    });
  };

  initValue();

  return {
    user,
    setUser,
  };
});
