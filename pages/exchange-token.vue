<template>
  <div class="text-center">
    <h1 class="text-cyan-700">{{ title }}</h1>
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/userStore";
const userStore = useUserStore();
const { setUser } = userStore;

const { query } = useRoute();
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const { code } = query;

const accessTokenCookie = useCookie("access-token");
const refreshTokenCookie = useCookie("refresh-token");

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
  console.log("userStore", JSON.stringify(user));
  console.log("userStore 2", JSON.stringify(user.value));
  localStorage.setItem("user-info", JSON.stringify(user));
  navigateTo("/profile");
};

exchangeToken();

const title = ref("Thanks for signing. App will be available soon!");
</script>
<style></style>
