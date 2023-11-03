<template>
  <UContainer>
    <div>
      <img :src="image" alt="" class="h-[600px] w-full object-cover rounded-3xl">
    </div>
    <UContainer class="p-6 flex items-center justify-center">
      <UButton color="red" size="xl" @click="handleJoinChallenge">{{ $t('join_challenge') }}</UButton>
    </UContainer>
    <ChallengeDetailTable></ChallengeDetailTable>
  </UContainer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import challengeRepository from '~/repository/challenge.repository';
import { useChallengeStore } from '~/stores/challenge.store';
import { useUserStore } from '~/stores/userStore';
const toast = useToast()
const { t } = useI18n()

const challengeStore = useChallengeStore();
const { user } = useUserStore();
const { fetchChallengeDetail, fetchChallengeUsers } = challengeStore
const { image } = storeToRefs(challengeStore)
const { params, fullPath } = useRoute();
const { id } = params;

await useAsyncData('challenge', () => fetchChallengeDetail(+id))
await useAsyncData('challenge-user', () => fetchChallengeUsers())

const handleJoinChallenge = async () => {
  if (isEmpty(user) || !user) {
    localStorage.setItem("saved-path", fullPath);
    navigateTo('/login')
    return
  }
  const res = await challengeRepository.join(+id)
  if (res) {
    toast.add({ id: "copy-challenge", icon: 'i-heroicons-check-circle', timeout: 4000, title: t('join_challenge_successfully') })
    fetchChallengeDetail(+id)
  } else {
    toast.add({ id: "copy-challenge", icon: 'i-heroicons-exclamation-circle', color: 'red', timeout: 4000, title: t('you_have_joined_this_challenge') })
  }
}
</script>