<template>
  <div>
    <UButton size="sm" color="orange" variant="solid" @click="handleConnect">
      <div class="flex items-center pr-2 gap-4">
        Connect With
        <img
          src="~/assets/icon/strava-ar21-cropped.svg"
          alt=""
          class="strava-character--small"
        />
      </div>
    </UButton>
  </div>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { STRAVA_CLIENT_ID, STRAVA_BASE_URL, BASE_REDIRECT_URL } =
  runtimeConfig.public
const handleConnect = () => {
  const url = `${STRAVA_BASE_URL}/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${BASE_REDIRECT_URL}/exchange-token&approval_prompt=force&scope=activity:read_all`
  window.location.href = url
}
</script>
<style>
.strava-character--small {
  width: 60px;
  height: 12px;
  margin: -5px -7px -5px -12px;
}
</style>
