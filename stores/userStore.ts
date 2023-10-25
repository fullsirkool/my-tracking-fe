import { defineStore } from "pinia";
import authRepository from "~/repository/auth.repository";
import { UserClaims } from "~/types/dto/user.dto";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserClaims>();

  const setUser = (u: UserClaims) => {
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
      try {
        const data = await authRepository.renew(`${refreshTokenCookie.value}`);

        if (data) {
          const { accessToken, refreshToken } = data;
          accessTokenCookie.value = accessToken;
          refreshTokenCookie.value = refreshToken;
          const loadedInfo = localStorage.getItem("user-info");
          if (typeof loadedInfo === "string") {
            user.value = JSON.parse(loadedInfo);
          }
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("user-info");
      }
    }
  };

  return {
    user,
    setUser,
    initValue,
  };
});
