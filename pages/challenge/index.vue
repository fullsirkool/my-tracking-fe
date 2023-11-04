<template>
  <UContainer>
    <NuxtLink to="/challenge/create">
      <UButton :label="$t('create_challenge')" variant="solid" />
    </NuxtLink>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
      <div v-for="challenge in challenges" class="grid-span-1">
        <ChallengeCard :challenge="challenge"></ChallengeCard>
      </div>
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
</script>