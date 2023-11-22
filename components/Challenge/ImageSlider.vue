<template>
  <carousel wrap-around :autoplay="4000">
    <slide v-for="challenge in challenges" :key="challenge.id" class="p-">
      <img
        :src="challenge.image"
        class="h-[600px] w-full object-cover rounded-3xl"
      />
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>
<script setup lang="ts">
import { Challenge } from '~/types/dto/challenge.dto'

interface IChallengeImageSlider {
  challenges: Challenge[]
}
const props = withDefaults(defineProps<IChallengeImageSlider>(), {})
const challenges = computed(() => props.challenges || [])
</script>
<style>
.carousel__prev,
.carousel__next {
  background-color: rgba(160, 160, 160, 0.6);
  border-radius: 50%;
}
</style>
