<template>
  <h1 class="text-cyan-700">{{ title }}</h1>
</template>
<script setup>
const { query } = useRoute();
const runtimeConfig = useRuntimeConfig();
const { STRAVA_CLIENT_ID, STRAVA_BASE_URL, STRAVA_CLIENT_SECRET } = runtimeConfig.public;
const { code } = query;

const exchangeToken = async () => {
  const url = `${STRAVA_BASE_URL}/oauth/token`;
  console.log("code", code);
  const { data } = await useFetch(url, {
    method: "post",
    query: {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: `authorization_code`,
    },
  });
  console.log("exchangeToken data", data._rawValue);
  return data._rawValue;
};

exchangeToken();

const title = ref("Exchange Token");
</script>
<style></style>
