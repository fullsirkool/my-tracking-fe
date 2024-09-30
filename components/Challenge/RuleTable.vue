<template>
  <div class="text-slate-700">
<!--      -->
    <div class="flex justify-between md:block mb-2.5">
      <label>{{ $t('start_date') }}: </label>
      <span>{{ startDateFormatted }}</span>
    </div>
    <div class="flex justify-between md:block mb-2.5">
      <label>{{ $t('end_date') }}: </label>
      <span>{{ endDateFormatted }}</span>
    </div>
<!--    <div class="flex justify-between md:block mb-2.5">-->
<!--      <label>{{ $t('challenge_type') }}: </label>-->
<!--      <span>{{ $t(`${challengeType}`.toLowerCase()) }}</span>-->
<!--    </div>-->
    <div v-if="minDistance" class="flex justify-between md:block mb-2.5">
      <label>{{ $t('min_distance') }}: </label>
      <span>{{ minDistanceFormatted }}</span>
    </div>
    <div v-if="maxDistance" class="flex justify-between md:block mb-2.5">
      <label>{{ $t('max_distance') }}: </label>
      <span>{{ maxDistanceFormatted }}</span>
    </div>
    <div v-if="minPace" class="flex justify-between md:block mb-2.5">
      <label>{{ $t('min_pace') }}: </label>
      <span>{{ minPaceFormatted }}</span>
    </div>
    <div v-if="maxPace" class="flex justify-between md:block mb-2.5">
      <label>{{ $t('max_pace') }}: </label>
      <span>{{ maxPaceFormatted }}</span>
    </div>
    <i v-if="maxPace || minPace" class="text-sm">
      *{{ $t('min_pace_and_max_pace_will_be_applied_to_every_single_km') }}
    </i>
  </div>
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
  ticketPrice,
  challengeType
} = useChallengeStore()
const startDateFormatted = computed(() => {
  if (!startDate) {
    return
  }
  return dayjs(startDate).tz('Asia/Bangkok').format('HH:mm, DD MMMM YYYY')
})
const endDateFormatted = computed(() => {
  if (!endDate) {
    return
  }
  return dayjs(endDate).tz('Asia/Bangkok').format('HH:mm, DD MMMM YYYY')
})
</script>
