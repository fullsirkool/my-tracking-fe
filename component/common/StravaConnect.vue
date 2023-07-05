<template>
  <div>
    <button @click="handleConnect">Connect</button>
  </div>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { STRAVA_CLIENT_ID, STRAVA_BASE_URL, BASE_REDIRECT_URL } = runtimeConfig.public;
const handleConnect = async () => {
  const url = `${STRAVA_BASE_URL}/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${BASE_REDIRECT_URL}/exchange-token&approval_prompt=force&scope=activity:read_all`;
  // const data = await useFetch(url, {
  //   method: "post",
  //   query: {
  //     client_id: STRAVA_CLIENT_ID,
  //     response_type: "code",
  //     redirect_uri: `http://localhost:3000/exchange-token&approval_prompt=force&scope=read_all`,
  //   },
  // });
  // console.log(data);
  window.location.href = url
};
</script>
<style></style>
