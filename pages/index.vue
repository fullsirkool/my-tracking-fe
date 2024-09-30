<template>
  <div>
    <div class="mb-10">
      <HomeImageSlider :challenges="highlightChallenge"/>
    </div>
    <div>
      <HomeChallengeList :challenges="challenges"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import challengeRepository from '~/repository/challenge.repository'
import { type Challenge } from '~/types/dto/challenge.dto'
import { useChallengeStore } from '~/stores/challenge.store'

definePageMeta({
  layout: 'home',
  middleware: ['authentication']
})

const { setTopChallenge } = useChallengeStore()

localStorage.setItem('nuxt-color-mode', 'light')
const highlightChallenge = ref<Challenge[]>([])

const { data } = await useAsyncData('challenge', async () => {
  const [topChallenges, newChallenge] = await Promise.all([
    challengeRepository.findTop({ size: 3, page: 1 }),
    challengeRepository.find({ page: 1, size: 5 }),
  ])

  return {
    topChallenges,
    newChallenge
  }
})

const challenges = ref<Challenge[]>([])
if (data.value?.topChallenges) {
  challenges.value = data.value.topChallenges
  setTopChallenge(data.value.topChallenges[0])
}
if (data.value?.newChallenge) {
  console.log(data.value?.newChallenge)
  highlightChallenge.value = data.value.newChallenge.data
}
</script>
