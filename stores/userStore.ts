import { defineStore } from "pinia";
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const setUser = (u) => {
    user.value = u;
  };

  const initValue = async () => {
    const accessTokenExpireTime = new Date(
      new Date().getTime() + 12 * 60 * 60 * 1000
    );
    const refreshTokenExpireTime = new Date(new Date());
    refreshTokenExpireTime.setFullYear(new Date().getFullYear() + 1);

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
