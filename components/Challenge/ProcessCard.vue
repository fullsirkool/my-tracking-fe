<template>
  <UCard class="relative" style="box-shadow: none;">
    <div class="flex items-center gap-4">
      <UAvatar size="xl" :src="userActivitites.profile" alt="Avatar" />
      <div class="w-full">
        <a class="text-lg font-semibold">{{ `${userActivitites.firstName} ${userActivitites.lastName}` }}</a>
      </div>
    </div>
    <div>
      <UProgress v-if="target" :value="process" size="md" :color="color">
        <template #indicator="{ percent }">
          <div class="text-right text-xs font-bold rounded-lg">
            <span v-if="process < 25" class="text-red-500 font-bold">{{ $t('progress_so_far_complete') }}</span>
            <span v-else-if="process < 50" class="text-orange-500">{{ $t('progress_nearly_half_complete') }}</span>
            <span v-else-if="process < 75" class="text-yellow-500">{{ $t('progress_half_complete') }}</span>
            <span v-else-if="process < 100" class="text-green-500">{{ $t('progress_nearly_complete') }}</span>
            <span v-else class="text-blue-500">{{ $t('progress_complete') }}</span>
          </div>
        </template>
      </UProgress>
    </div>
    <div>
      <div class="flex items-center justify-between w-full mt-2">
        <div class="flex items-center gap-2">
          <Icon name="fa6-solid:route" width="1rem" height="1rem" />
          <span>{{ statistics.distance }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="fa6-solid:stopwatch" width="1rem" height="1rem" />
          <span>{{ statistics.avgPace }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="ic:outline-watch-later" width="1rem" height="1rem" />
          <span>{{ statistics.movingTime }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { useChallengeStore } from '~/stores/challenge.store';
import { ChallengeUser } from '~/types/dto/challenge.dto';

interface IChallengeProcessCardProps {
  userActivitites: ChallengeUser;
}

const { target } = useChallengeStore()

const props = withDefaults(defineProps<IChallengeProcessCardProps>(), {})

const statistics = computed(() => {
  if (!props.userActivitites) {
    return {
      totalDistance: 0,
      distance: '0km',
      movingTime: '00:00:00',
      pace: '00:00'
    }
  }
  const { challengeDailyActivity } = props.userActivitites

  let movingTimeStr = '00:00:00'
  let distanceStr = '0km'

  let totalDistance = 0
  let totalMovingTime = 0
  let avgPace = '00:00'

  challengeDailyActivity.forEach(item => {
    const { distance, movingTime } = item
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
    const remainingSecond = remainingMinute % 60

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
    totalDistance: totalDistance,
    distance: distanceStr,
    movingTime: movingTimeStr,
    avgPace
  };
})

const color = computed(() => {
  switch (true) {
    case process.value < 25: return 'red'
    case process.value < 50: return 'orange'
    case process.value < 75: return 'yellow'
    case process.value < 100: return 'green'
    case process.value === 100: return 'blue'
    default: return 'red'
  }
})

const process = computed(() => {
  if (statistics.value.totalDistance === 0 || target === 0) {
    return 0
  }

  if (statistics.value.totalDistance > target) {
    return 100
  }

  return +(statistics.value.totalDistance * 100 / target).toFixed(1)
})
</script>