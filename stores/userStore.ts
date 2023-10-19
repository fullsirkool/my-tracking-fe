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
    const accessTokenExpireTime = dayjs(new Date()).add(12, "hour").toDate();
    const refreshTokenExpireTime = dayjs(new Date()).add(1, "year").toDate();
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
      const { accessToken, refreshToken } = await recallToken(
        refreshTokenCookie.value
      );
      accessTokenCookie.value = accessToken;
      refreshTokenCookie.value = refreshToken;
    }

    const loadedInfo = localStorage.getItem("user-info");
    if (typeof loadedInfo === "string") {
      user.value = JSON.parse(loadedInfo);
    }
  };

  const recallToken = async (refreshToken: string) => {
    const { data } = await useFetch(`${BASE_URL}/auth/renew`, {
      method: "POST",
      body: {
        refreshToken: refreshToken,
      },
    });

    return data;
  };

  initValue();

  return {
    user,
    setUser,
  };
});
