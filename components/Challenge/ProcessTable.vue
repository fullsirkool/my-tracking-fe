<template>
  <div class="mt-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ChallengeProcessCard v-for="item in challengeUsers" :user-activitites="item" :challenge="challengeDetail"
        class="grid-span-1">
      </ChallengeProcessCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChallengeStore } from '~/stores/challenge.store';
const challengeStore = useChallengeStore()
const { challengeDetail, challengeUsers } = storeToRefs(challengeStore)
</script>