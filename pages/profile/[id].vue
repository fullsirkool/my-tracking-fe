<template>
  <UContainer>
    <div class="relative">
      <UCard
        class="flex justify-center p-10 pb-20 profile-header border-none rounded-3xl"
      >
        <div
          class="w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-semibold"
        >
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
        </div>
      </UCard>
      <div
        class="absolute rounded-full bg-white -translate-x-2/4 translate-y-2/4 z-[1] left-2/4 bottom-0"
      >
        <img
          src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/80656719/22257455/1/medium.jpg"
          class="h-44 w-44 rounded-full border-[5px] border-solid border-[white]"
        />
      </div>
    </div>
    <div class="mt-24 text-center">
      <h1 class="font-bold text-2xl">Tên Nè Hihi</h1>
      <div class="flex gap-3 items-center mx-auto my-2 w-fit">
        <CommonStravaIcon></CommonStravaIcon>
        <h3 class="text-md">Strava ID: {{ `9930596816` }}</h3>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="col-span-2">
        <profile-self-activity></profile-self-activity>
      </div>
      <div class="col-span-1 bg-[#f5f5f5]">CALENDAR</div>
    </div>
  </UContainer>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
const { BASE_URL } = runtimeConfig.public;
const { data } = await useAsyncData("activities", () =>
  $fetch(`${BASE_URL}/activity/monthly`, {
    params: {
      date: new Date().toISOString(),
    },
  })
);
console.log(data._rawValue)
</script>
<style scoped>
.profile-header {
  background: rgb(255, 244, 79);
  background: radial-gradient(
    circle,
    rgba(255, 244, 79, 1) 0%,
    rgba(224, 81, 49, 1) 100%
  );
}
</style>
