<template>
  <UCard class="relative" style="box-shadow: none;">
    <div class="absolute text-sm font-bold p-1 rounded-lg top-2 right-2">
      <span v-if="process < 25" class="text-red-500 font-bold">{{ $t('progress_so_far_complete') }}</span>
      <span v-else-if="process < 50" class="text-orange-500">{{ $t('progress_nearly_half_complete') }}</span>
      <span v-else-if="process < 75" class="text-yellow-500">{{ $t('progress_half_complete') }}</span>
      <span v-else-if="process < 100" class="text-green-500">{{ $t('progress_nearly_complete') }}</span>
      <span v-else class="text-blue-500">{{ $t('progress_complete') }}</span>
    </div>
    <div class="flex items-center gap-4">
      <UAvatar size="xl" :src="userActivitites.user.profile" alt="Avatar" />
      <div class="w-full">
        <a class="text-lg font-semibold">{{ `${userActivitites.user.firstName} ${userActivitites.user.lastName}` }}</a>
        <div>
          <UProgress v-if="target" :value="process" size="md" :color="color">
          </UProgress>
        </div>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { Challenge, ChallengeUserActivities } from '~/types/dto/challenge.dto';

interface IChallengeProcessCardProps {
  userActivitites: ChallengeUserActivities;
  challenge?: Challenge;
}

const props = withDefaults(defineProps<IChallengeProcessCardProps>(), {})

const statistics = computed(() => {
  if (!props.userActivitites) {
    return {
      totalDistance: 0,
      totalMovingTime: 0
    }
  }
  const { user, statistics } = props.userActivitites
  let totalDistance = 0
  let totalMovingTime = 0

  statistics.forEach(item => {
    const { distance, movingTime } = item
    totalDistance += distance
    totalMovingTime += movingTime
  })
  return {
    totalDistance,
    totalMovingTime
  };
})

const target = computed(() => {
  if (!props.challenge) {
    return 0
  }

  const { rule } = props.challenge
  // return rule.target
  return 10000
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
  if (statistics.value.totalDistance === 0 || target.value === 0) {
    return 0
  }

  if (statistics.value.totalDistance > target.value) {
    return 100
  }

  return +(statistics.value.totalDistance * 100 / target.value).toFixed(1)
})
</script>