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
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">168.0</p>
            Khoảng cách (km)
          </div>
          <div
            class="w-fit rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
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
          :src="user.profile"
          class="h-44 w-44 rounded-full border-[5px] border-solid border-[white]"
        />
      </div>
    </div>
    <div class="mt-24 text-center">
      <h1 class="font-bold text-2xl">{{ getFullName }}</h1>
      <div class="flex gap-3 items-center mx-auto my-2 w-fit">
        <CommonStravaIcon></CommonStravaIcon>
        <h3 class="text-md">Strava ID: {{ user.stravaId }}</h3>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
      <div class="col-span-2">
        <profile-self-activity></profile-self-activity>
      </div>
      <div class="col-span-1">
        <profile-activity-calendar></profile-activity-calendar>
      </div>
    </div>
  </UContainer>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/profile.store";
const store = useProfileStore();
const { user } = storeToRefs(store);
const { params } = useRoute();
const { id } = params;
await useAsyncData("user", () => store.fetchUserInfo(+id));
await useAsyncData("activity", () => store.fetchActivities());

const getFullName = computed(() => `${user.value.firstName} ${user.value.lastName}`);
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
