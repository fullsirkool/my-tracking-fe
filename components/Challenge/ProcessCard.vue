<template>
  <UCard>
  </UCard>
</template>
<script setup lang="ts">
import { ChallengeUserActivities } from '~/types/dto/challenge.dto';

interface IChallengeProcessCardProps {
  userActivitites: ChallengeUserActivities;
}

const props = withDefaults(defineProps<IChallengeProcessCardProps>(), {})

const totalDistance = computed(() => {
  if (!props.userActivitites) {
    return 0
  }
  const { user, statistics } = props.userActivitites
  return statistics.reduce((accumulator, currentValue) => accumulator + currentValue.distance, 0);
})
</script>