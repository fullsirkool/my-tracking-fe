<template>
  <UCard class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]" style="box-shadow: none;">
    <div class="mt-10">
      <div class="grid grid-cols-3 gap-4">
        <ChallengeProcessCard v-for="item in getUserProcess" :user-activitites="item" :challenge="challengeDetail"
          class="grid-span-1">
        </ChallengeProcessCard>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChallengeStore } from '~/stores/challenge.store';
const challengeStore = useChallengeStore()
const { challengeDetail } = storeToRefs(challengeStore)

const getUserProcess = computed(() => {
  if (!challengeDetail.value) {
    return []
  }
  const { userActivitites } = challengeDetail.value
  return userActivitites
})
</script>