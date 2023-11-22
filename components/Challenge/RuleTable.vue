<template>
  <UContainer class="text-lg text-[#4B4B4B]">
    <div class="p-2">
      <label for="">{{ $t('start_date') }}: </label>
      <span>{{ startDateFormatted }}</span>
    </div>
    <div class="p-2">
      <label for="">{{ $t('end_date') }}: </label>
      <span>{{ endDateFormatted }}</span>
    </div>
    <div class="p-2">
      <label for="">{{ $t('target') }}: </label>
      <span>{{ targetFormatted }}</span>
    </div>
    <div v-if="minDistance" class="p-2">
      <label for="">{{ $t('min_distance') }}: </label>
      <span>{{ minDistanceFormatted }}</span>
    </div>
    <div v-if="maxDistance" class="p-2">
      <label for="">{{ $t('max_distance') }}: </label>
      <span>{{ maxDistanceFormatted }}</span>
    </div>
    <div v-if="minPace" class="p-2">
      <label for="">{{ $t('min_pace') }}: </label>
      <span>{{ minPaceFormatted }}</span>
    </div>
    <div v-if="maxPace" class="p-2">
      <label for="">{{ $t('max_pace') }}: </label>
      <span>{{ maxPaceFormatted }}</span>
    </div>
    <i class="text-sm"
      >*{{ $t('min_pace_and_max_pace_will_be_applied_to_every_single_km') }}</i
    >
  </UContainer>
</template>
<script setup lang="ts">
import { useChallengeStore } from '~/stores/challenge.store'
const dayjs = useDayjs()

const {
  maxDistance,
  minDistance,
  minPace,
  maxPace,
  targetFormatted,
  minDistanceFormatted,
  maxDistanceFormatted,
  minPaceFormatted,
  maxPaceFormatted,
  startDate,
  endDate,
} = useChallengeStore()
const startDateFormatted = computed(() => {
  if (!startDate) {
    return
  }
  return dayjs(startDate).format('YYYY-MM-DD')
})
const endDateFormatted = computed(() => {
  if (!endDate) {
    return
  }
  return dayjs(endDate).subtract(1, 'days').format('YYYY-MM-DD')
})
</script>
