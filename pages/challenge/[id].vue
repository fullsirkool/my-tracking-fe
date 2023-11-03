<template>
  <UContainer>
    <UContainer class="text-center">
      <h1 class="text-3xl font-semibold text-[#4b4b4b] mb-4">{{ $t('challenge_activity_chart') }}</h1>
      <ChallengeActivityChart></ChallengeActivityChart>
    </UContainer>
    <UContainer class="p-6 flex items-center justify-center">
      <UButton color="red" size="xl" @click="handleJoinChallenge">{{ $t('join_challenge') }}</UButton>
    </UContainer>
    <UContainer>
      <ChallengeProcessTable></ChallengeProcessTable>
    </UContainer>
  </UContainer>
</template>
<script setup lang="ts">
import challengeRepository from '~/repository/challenge.repository';
import { useChallengeStore } from '~/stores/challenge.store';
import { useUserStore } from '~/stores/userStore';
const toast = useToast()
const { t } = useI18n()

const challengeStore = useChallengeStore();
const { user } = useUserStore();
const { fetchChallengeDetail } = challengeStore
const { params, fullPath } = useRoute();
const { id } = params;

await useAsyncData('challenge', () => fetchChallengeDetail(+id))

const handleJoinChallenge = async () => {
  if (isEmpty(user) || !user) {
    localStorage.setItem("saved-path", fullPath);
    navigateTo('/login')
    return
  }
  try {
    await challengeRepository.join(+id)
    toast.add({ id: "copy-challenge", icon: 'i-heroicons-check-circle', timeout: 4000, title: t('join_challenge_successfully') })
    fetchChallengeDetail(+id)
  } catch (error: any) {
    console.log(error)
    const { message } = error
    toast.add({ id: "copy-challenge", icon: 'i-heroicons-exclamation-circle', color: 'red', timeout: 4000, title: message })
  }

}
</script>