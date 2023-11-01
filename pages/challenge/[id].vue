<template>
  <UContainer>
    <div>
      <ChallengeActivityChart></ChallengeActivityChart>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChallengeStore } from '~/stores/challenge.store';
const challengeStore = useChallengeStore();
const { challengeDetail } = storeToRefs(challengeStore)
const { fetchChallengeDetail } = challengeStore
const { params } = useRoute();
const { id } = params;

await useAsyncData('challenge', () => fetchChallengeDetail(+id))
</script>