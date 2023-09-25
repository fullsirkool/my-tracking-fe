<template>
  <h1 class="text-cyan-700">{{ title }}</h1>
</template>
<script setup>
const { query } = useRoute();
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const { code } = query;

const exchangeToken = async () => {
  const url = `${BASE_URL}/auth/signin/${code}`;
  const res = await useFetch(url, {
    method: "post",
  });
  console.log("exchangeToken data", res);
  return res;
};

exchangeToken();

const title = ref("Exchange Token");
</script>
<style></style>
