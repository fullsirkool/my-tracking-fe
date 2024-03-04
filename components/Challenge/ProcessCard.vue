<template>
  <UCard class="relative text-[#4B4B4B]" style="box-shadow: none">
    <div class="flex items-center gap-4">
      <UAvatar size="xl" :src="userActivities.profile" alt="Avatar"/>
      <div class="w-full">
        <NuxtLink
            class="hover:text-sky-900 font-semibold"
            :to="`/profile/${userActivities.id}`"
        >
          {{ `${userActivities.firstName} ${userActivities.lastName}` }}
        </NuxtLink>
      </div>
    </div>
    <div>{{ $t('total_distance') }}: {{ statistics.totalDistanceFormatted }}km</div>
    <div>
      <UProgress v-if="target" :value="process" size="md" :color="color">
        <template #indicator="{ percent }">
          <div class="text-right text-xs font-bold rounded-lg">
            <span :class="`text-${color}-500`"
            >{{ percent.toFixed(1) }}% {{ $t('completed') }}</span
            >
          </div>
        </template>
      </UProgress>
    </div>
    <div>
      <div class="flex items-center justify-between w-full mt-2">
        <div class="flex items-center gap-2">
          <Icon name="fa6-solid:route" width="1rem" height="1rem"/>
          <span>{{ statistics.distance }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="fa6-solid:stopwatch" width="1rem" height="1rem"/>
          <span>{{ statistics.avgPace }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="ic:outline-watch-later" width="1rem" height="1rem"/>
          <span>{{ statistics.movingTime }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import {useChallengeStore} from '~/stores/challenge.store'
import {ChallengeUser} from '~/types/dto/challenge.dto'

interface IChallengeProcessCardProps {
  userActivities: ChallengeUser
}

const {target} = useChallengeStore()

const props = withDefaults(defineProps<IChallengeProcessCardProps>(), {})

const statistics = computed(() => {
  if (!props.userActivities) {
    return {
      totalDistance: 0,
      distance: '0km',
      movingTime: '00:00:00',
      pace: '00:00',
    }
  }
  const {challengeDailyActivity} = props.userActivities

  let distanceStr = '0km'
  let movingTimeStr = '00:00:00'

  let totalDistance = 0
  let totalMovingTime = 0
  let avgPace = '00:00'

  challengeDailyActivity.forEach((item) => {
    const {distance, movingTime} = item
    totalDistance += distance
    totalMovingTime += movingTime
  })

  if (totalDistance !== 0) {
    distanceStr = `${(totalDistance / 1000).toFixed(2)}km`
  }

  if (totalMovingTime !== 0) {
    let hour = 0
    let minute = '00'
    let second = '00'
    hour = Math.floor(totalMovingTime / 3600)
    const remainingSecondAfterHour = totalMovingTime % 3600
    const remainingMinute = Math.floor(remainingSecondAfterHour / 60)
    const remainingSecond = remainingSecondAfterHour % 60

    minute = remainingMinute > 9 ? `${remainingMinute}` : `0${remainingMinute}`
    second = remainingSecond > 9 ? `${remainingSecond}` : `0${remainingSecond}`

    movingTimeStr = `${hour}:${minute}:${second}`
  }

  if (totalDistance !== 0 && totalMovingTime !== 0) {
    const avgPaceTime = totalMovingTime / (totalDistance / 1000) / 60
    const minute = Math.floor(avgPaceTime / 1)
    const second = ((avgPaceTime % 1) * 60).toFixed(0)
    avgPace = `${minute}:${+second > 9 ? second : '0' + second}`
  }

  return {
    totalDistance,
    totalDistanceFormatted: (totalDistance / 1000).toFixed(2),
    distance: distanceStr,
    movingTime: movingTimeStr,
    avgPace,
  }
})

const process = computed(() => {
  if (statistics.value.totalDistance === 0 || target === 0) {
    return 0
  }

  if (statistics.value.totalDistance > target) {
    return 100
  }

  return +((statistics.value.totalDistance * 100) / target).toFixed(1)
})

const color = computed(() => {
  switch (true) {
    case process.value < 25:
      return 'red'
    case process.value < 50:
      return 'orange'
    case process.value < 75:
      return 'yellow'
    case process.value < 100:
      return 'green'
    case process.value === 100:
      return 'blue'
    default:
      return 'red'
  }
})
</script>
