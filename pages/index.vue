<template>
  <UContainer>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 items-center item py-[50px] lg:pb-[200px]"
    >
      <div class="h-fit text-center lg:text-left">
        <div class="font-bold text-6xl">
          Take on challenges, fulfill yourself
        </div>
        <div class="text-h5 my-6 text-2xl">
          Compete with others in the running challenges to become a better
          version of yourself
        </div>
      </div>
      <div class="h-fit p-12 flex items-center justify-center">
        <ChallengeCard :challenge="challenges[0]"></ChallengeCard>
      </div>
    </div>
    <div>
      <p class="text-center font-bold text-4xl m-8">Top Challenge</p>
      <ChallengeImageSlider :challenges="challenges"></ChallengeImageSlider>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
import challengeRepository from '~/repository/challenge.repository'
import { Challenge } from '~/types/dto/challenge.dto'
import { useChallengeStore } from '~/stores/challenge.store'

definePageMeta({
  layout: 'home',
})

const { setTopChallenge } = useChallengeStore()

localStorage.setItem('nuxt-color-mode', 'light')

const { data } = await useAsyncData('challenge', () =>
  challengeRepository.find({ size: 4, page: 1 }),
)
const challenges = ref<Challenge[]>([])
if (data.value?.data) {
  challenges.value = data.value.data
  setTopChallenge(challenges.value[0])
}
</script>
