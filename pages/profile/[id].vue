<template>
  <UContainer>
    <div class="relative">
      <UCard
        class="custom-cover flex justify-center p-10 pb-20 border-none rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600"
        :style="{
          background: `url(${bgImage})`,
        }"
      >
        <ProfileStatistic
          :distance="totalDistance"
          :pace="getPaceMinute"
          :activity="count"
          :time="getTotalRuningMinute"
        />
      </UCard>
      <div
        class="absolute rounded-full bg-white -translate-x-2/4 translate-y-2/4 z-[1] left-2/4 bottom-0"
      >
        <UAvatar
          v-if="!user.profile"
          size="4xl"
          :src="user.profile"
          alt="Avatar"
          class="sm:h-44 sm:w-44 rounded-full border-[5px] border-solid border-[white]"
        />
        <img
          v-else
          :src="user.profile"
          class="sm:h-44 sm:w-44 rounded-full border-[5px] border-solid border-[white]"
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
          <h3 class="text-md">
            {{ $t('strava_id') }}:
            {{ user.stravaId ? user.stravaId : 'Not connected' }}
          </h3>
        </div>
      </div>
    </div>
    <ProfileStatisticMobile
      :distance="totalDistance"
      :pace="getPaceMinute"
      :activity="count"
      :time="getTotalRuningMinute"
    />
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
definePageMeta({
  middleware: ['authentication'],
})
import { storeToRefs } from 'pinia'
import activityRepository from '~/repository/activity.repository'
import { useProfileStore } from '~/stores/profile.store'
import { useUserStore } from '~/stores/user.store'
import bgImage0 from '~/assets/bg-0.avif'
import bgImage1 from '~/assets/bg-1.avif'
import bgImage2 from '~/assets/bg-2.avif'

const profileStore = useProfileStore()
const {
  fetchUserInfo,
  fetchMonthlyActivitiesDetail,
  fetchDailyActivityStatistics,
  fetchJoinedChallenge,
} = profileStore

const { user } = storeToRefs(profileStore)
const userStore = useUserStore()

const { params } = useRoute()
const { id } = params

const { data } = await useAsyncData('profile', async () => {
  const [userInfor, dailyStatistics, statictics, dailyactivities] =
    await Promise.all([
      fetchUserInfo(id),
      fetchDailyActivityStatistics(),
      activityRepository.fetchStatistics(id),
      fetchMonthlyActivitiesDetail(id),
    ])

  return {
    userInfor,
    dailyStatistics,
    statictics,
    dailyactivities,
  }
})

const statistics = data.value.statictics

const avgPace = ref(statistics?.pace.toFixed(2) || '0.00')
const totalDistance = ref(((statistics?.distance || 0) / 1000).toFixed(2))
const count = ref(statistics?.count || 0)
const totalMovingTime = ref(
  ((statistics?.totalMovingTime || 0) / 3600).toFixed(2),
)

const getFullName = computed(() => `${user.value.name ? user.value.name : ''}`)
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
  const currentUser = userStore.user
  if (!currentUser || currentUser.id !== user.value.id) {
    return false
  }
  return true
})

function getRandomValueFromArray(arr) {
  if (arr.length === 0) {
    return undefined // Handle empty array case if necessary
  }
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const bgImage = ref('')
onMounted(() => {
  bgImage.value = getRandomValueFromArray([bgImage0, bgImage1, bgImage2])
})
</script>
<style scoped>

</style>
