<template>
  <carousel wrap-around :autoplay="40000">
    <slide v-for="challenge in challenges" :key="challenge.id" class="slide__container">
      <img
        :src="challenge.image"
        class="h-[600px] w-full object-cover rounded-3xl"
      />
      <div class="slide__container__infor px-10 pb-10 bt-20 rounded text-left flex flex-col rounded-3xl">
        <h1 class="text-2xl font-semibold">{{ challenge.title }}</h1>
        <div class="slide__container__description truncate ... max-w-[500px]">{{
            challenge.description
          }}</div>
      </div>
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
<style lang="scss" scoped>
.carousel__prev,
.carousel__next {
  background-color: rgba(160, 160, 160, 0.6);
  border-radius: 50%;
}
.slide__container {
  position: relative;
  &__infor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #FFFFFF;
    background-image: linear-gradient(
            rgba(48, 51, 57, 0) 0%,
            rgba(62, 63, 64, 0.9) 75.16%
    );
  }
  &__image {
    height: 100%;
  }
  &__description {
    width: 60%;
  }
}
</style>
