<template>
  <UContainer>
    <div class="relative">
      <UCard
          class="flex justify-center p-10 pb-20 profile-header border-none rounded-3xl"
      >
        <div
            class="w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-semibold"
        >
          <div
              class="rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">{{ totalDistance }}</p>
            {{ $t('distance') }} (km)
          </div>
          <div
              class="rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">{{ getPaceMinute }}</p>
            {{ $t('pace') }}
          </div>
          <div
              class="rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">{{ count }}</p>
            {{ $t('activities') }}
          </div>
          <div
              class="rounded-2xl text-center p-3 border-[1px] bg-white border-none text-gray-700"
          >
            <p class="text-red-500 text-xl font-bold">
              {{ getTotalRuningMinute }}
            </p>
            {{ $t('time') }}
          </div>
        </div>
      </UCard>
      <div
          class="absolute rounded-full bg-white -translate-x-2/4 translate-y-2/4 z-[1] left-2/4 bottom-0"
      >
        <UAvatar v-if="!user.profile" size="4xl" :src="user.profile" alt="Avatar"
                 class="h-44 w-44 rounded-full border-[5px] border-solid border-[white]"/>
        <img v-else
             :src="user.profile"
             class="h-44 w-44 rounded-full border-[5px] border-solid border-[white]"
        />
      </div>
    </div>
    <div class="mt-24 text-center">
      <h1 class="font-bold text-2xl">{{ getFullName }}</h1>
      <div>
        <div v-if="showConnectStravaButton" class="mt-2">
          <CommonStravaConnect></CommonStravaConnect>
        </div>
        <div v-else class="flex gap-3 items-center mx-auto my-2 w-fit">
          <CommonStravaIcon></CommonStravaIcon>
          <h3 class="text-md">{{ $t('strava_id') }}: {{ user.stravaId ? user.stravaId : 'Not connected' }}</h3>
        </div>
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
    <div class="mt-24 text-center">
      <profile-detail-table></profile-detail-table>
    </div>
  </UContainer>
</template>
<script setup>
import activityRepository from '~/repository/activity.repository'
import {useProfileStore} from '~/stores/profile.store'
import {storeToRefs} from "pinia";
import {useUserStore} from '~/stores/userStore'

const profileStore = useProfileStore()
const {
  fetchMonthlyActivitiesDetail,
  fetchUserInfo,
  fetchDailyActivityStatistics,
  fetchCreatedChallenge,
  fetchJoinedChallenge,
} = profileStore


const {user} = storeToRefs(profileStore)
const {getUser} = useUserStore()

const {params} = useRoute()
const {id} = params

const {data} = await useAsyncData('profile', async () => {
  const [userInfor, dailyStatistics, statictics, dailyactivities] =
      await Promise.all([
        fetchUserInfo(id),
        fetchDailyActivityStatistics(),
        activityRepository.fetchStatistics(id),
        fetchMonthlyActivitiesDetail(id),
        fetchCreatedChallenge(id),
        fetchJoinedChallenge(id),
      ])

  return {
    userInfor,
    dailyStatistics,
    statictics,
    dailyactivities,
  }
})

const statistics = data.value.statictics

const avgPace = ref(statistics.pace.toFixed(2))
const totalDistance = ref((statistics.distance / 1000).toFixed(2))
const count = ref(statistics.count)
const totalMovingTime = ref((statistics.totalMovingTime / 3600).toFixed(2))

const getFullName = computed(
    () => `${user.value.firstName ? user.value.firstName : ''} ${user.value.lastName ? user.value.lastName : ''}`,
)
const getPaceMinute = computed(() => {
  const minutes = Math.floor(avgPace.value / 1)
  const seconds = (avgPace.value % 1) * 60
  return `${minutes}:${seconds.toFixed(0)}`
})
const getTotalRuningMinute = computed(() => {
  const minutes = Math.floor(totalMovingTime.value / 1)
  const seconds = (totalMovingTime.value % 1) * 60
  return `${minutes}:${seconds.toFixed(0)}`
})

const showConnectStravaButton = computed(() => {
  if (user.value.stravaId) {
    return false
  }
  const {id} = getUser()
  if (id !== user.value.id) {
    return false
  }
  return true
})
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
