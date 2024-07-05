<template>
  <UContainer>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 items-center item py-[50px] lg:pb-[200px]"
    >
      <div class="h-fit text-center lg:text-left">
        <div class="font-bold text-4xl lg:text-6xl">
          Take on challenges, fulfill yourself
        </div>
        <div class="text-h5 my-6 text-xl lg:text-2xl">
          Compete with others in the running challenges to become a better
          version of yourself
        </div>
      </div>
      <div class="h-fit sm:p-12 flex items-center justify-center">
        <ChallengeCard :challenge="challenges[0]" :highlight="true"></ChallengeCard>
      </div>
    </div>
    <div>
      <p class="text-center font-bold text-4xl m-8">{{ $t('top_challenge') }}</p>
      <ChallengeImageSlider :challenges="challenges"></ChallengeImageSlider>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
import challengeRepository from '~/repository/challenge.repository'
import {Challenge} from '~/types/dto/challenge.dto'
import {useChallengeStore} from '~/stores/challenge.store'

definePageMeta({
  layout: 'home',
  middleware: ['authentication'],
})

const {setTopChallenge} = useChallengeStore()

localStorage.setItem('nuxt-color-mode', 'light')
const highlightChallenge = ref()

const {data} = await useAsyncData('challenge', async () => {
      const [topChallenges, newChallenge] = await Promise.all([
        challengeRepository.findTop({size: 4, page: 1}),
        challengeRepository.find({page: 1, size: 1})
      ])

      return {
        topChallenges,
        newChallenge
      }
    }
)

const challenges = ref<Challenge[]>([])
if (data.value?.topChallenges) {
  challenges.value = data.value.topChallenges
  setTopChallenge(data.value.topChallenges[0])
}
if (data.value?.newChallenge) {
  highlightChallenge.value = data.value?.newChallenge.data[0]
}
</script>
