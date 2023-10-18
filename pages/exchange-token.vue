<template>
  <div class="text-center">
    <h1 class="text-cyan-700">{{ title }}</h1>
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/userStore";
const dayjs = useDayjs();
const userStore = useUserStore();
const { setUser } = userStore;

const { query } = useRoute();
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const { code } = query;

const accessTokenExpireTime = dayjs(new Date()).add(12, "hour");
const refreshTokenExpireTime = dayjs(new Date()).add(1, "year");
const accessTokenCookie = useCookie("access-token", {
  expires: accessTokenExpireTime,
});
const refreshTokenCookie = useCookie("refresh-token", {
  expires: refreshTokenExpireTime,
});

const exchangeToken = async () => {
  const url = `${BASE_URL}/auth/signin/${code}`;
  const { data } = await useFetch(url, {
    method: "post",
  });
  console.log(data.value);
  const { accessToken, refreshToken, user } = data.value;
  accessTokenCookie.value = accessToken;
  refreshTokenCookie.value = refreshToken;
  setUser(user);
  localStorage.setItem("user-info", JSON.stringify(user));
  navigateTo("/profile");
};

exchangeToken();

const title = ref("Thanks for signing. App will be available soon!");
</script>
<style></style>
