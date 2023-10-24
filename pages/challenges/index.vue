<template>
  <UContainer>
    <NuxtLink to="/challenges/create">
      <UButton label="Create Challenge" variant="solid" />
    </NuxtLink>

    <div class="mt-10 grid grid-cols-3 gap-6">
      <ChallengeCard v-for="challenge in challenges" class="grid-span-1" :challenge="challenge"></ChallengeCard>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
import challengeRepository from '~/repository/challenge.repository';
import { PagingChallengeDto } from '~/types/dto/challenge.dto';

const paging = ref<PagingChallengeDto>({
  page: 1,
  size: 9
})


const { data } = await useAsyncData("challenges", () => challengeRepository.find(paging.value))
const challenges = ref(data.value?.data)
console.log('challenges', challenges.value)
</script>