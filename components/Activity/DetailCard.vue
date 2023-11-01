
<template>
  <UCard class="rounded-2xl bg-white" style="box-shadow: none;">
    <div class="flex gap-2 items-center text-sm">
      <Icon name="mdi:calendar-month-outline" width="1.25rem" height="1.25rem" />
      <span>{{ getDateFormated }}</span>
    </div>
    <div class="text-lg font-semibold mt-2">
      <div class="flex gap-2 items-center ">
        <Icon name="fluent:run-16-filled" width="1.75rem" height="1.75rem" />
        <span class="text-orange-500">{{ activity.name }}</span>
      </div>
    </div>
    <div class="flex items-center justify-between text-sm mt-2">
      <div class="flex items-center gap-2">
        <Icon name="fa6-solid:route" width="1rem" height="1rem" />
        <span>{{ (activity.distance / 1000)?.toFixed(2) }} km</span>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="fa6-solid:stopwatch" width="1rem" height="1rem" />
        <span>{{ getAvgPace }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="ic:outline-watch-later" width="1rem" height="1rem" />
        <span>{{ getMovingTimeFormatted }}</span>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { ActivityDetail } from '~/types/dto/activity.dto';

interface IActivityDetailCardProps {
  activity: ActivityDetail;
}
const props = withDefaults(defineProps<IActivityDetailCardProps>(), {})

const dayjs = useDayjs()

const getDateFormated = computed(() => {
  const { startDateLocal } = props.activity
  return dayjs(startDateLocal).format('hh:mm, DD/MM/YYYY')
})

const getMovingTimeFormatted = computed(() => {
  const { movingTime } = props.activity
  if (!movingTime) {
    return '00:00:00'
  }
  let hour = 0
  let minute = '00'
  let second = '00'
  hour = Math.floor(props.activity.movingTime / 3600)
  const remainingSecondAfterHour = props.activity.movingTime % 3600
  const remainingMinute = Math.floor(remainingSecondAfterHour / 60)
  const remainingSecond = remainingMinute % 60

  minute = remainingMinute > 9 ? `${remainingMinute}` : `0${remainingMinute}`
  second = remainingSecond > 9 ? `${remainingSecond}` : `0${remainingSecond}`

  return `${hour}:${minute}:${second}`
})

const getAvgPace = computed(() => {
  const { elapsedTime, distance } = props.activity
  if (!elapsedTime) {
    return '00:00'
  }
  const paceTime = elapsedTime / (distance / 1000) / 60
  const minute = Math.floor(paceTime / 1)
  const second = ((paceTime % 1) * 60).toFixed(0)

  return `${minute}:${+second > 9 ? second : '0' + second}`
})
</script>