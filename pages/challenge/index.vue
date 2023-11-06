<template>
  <UContainer>
    <NuxtLink to="/challenge/create">
      <UButton :label="$t('create_challenge')" variant="solid" />
    </NuxtLink>
    <div v-if="challenges" class="grid grid-cols-1 gap-6">
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
        <div v-for="challenge in challenges" class="grid-span-1">
          <ChallengeCard :challenge="challenge"></ChallengeCard>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <UPagination v-model="paging.page" :total="challenges.length" />
      </div>
    </div>

  </UContainer>
</template>
<script setup lang="ts">
import challengeRepository from '~/repository/challenge.repository';
import { Challenge, PagingChallengeDto } from '~/types/dto/challenge.dto';

const paging = ref<PagingChallengeDto>({
  page: 1,
  size: 9
})
const challenges = ref<Challenge[]>([])

const fetchChallenges = async () => {
  const res = await challengeRepository.find(paging.value)
  if (res) {
    challenges.value = res.data
  }
}

await useAsyncData("challenges", () => fetchChallenges())

watch(paging.value, () => {
  fetchChallenges()
}, { deep: true })
</script>