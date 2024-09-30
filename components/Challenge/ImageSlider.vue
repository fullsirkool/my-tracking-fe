<template>
  <carousel wrap-around :autoplay="40000">
    <slide v-for="challenge in challenges" :key="challenge.id" class="relative">
      <div
        class="slide-cover w-full"
        :style="{
          backgroundImage: `url(${challenge.image})`,
          backgroundPosition: 'top center !important',
        }"
      >
        <!-- <img
          :src="challenge.image"
          class="rounded-xl w-full md:h-600px object-cover opacity-90 group-hover:opacity-100 object-[50%_0%]"
          style="height: 90vw"
        /> -->
      </div>
      <div class="absolute bottom-0 left-0 md:p-10 w-full md:flex justify-between">
        <div class="text-left w-full md:w-1/2">
          <!-- <h1
            class="text-3xl md:text-4xl font-semibold text-left text-slate-100 tracking-wide leading-10 drop-shadow mb-2.5"
          >
            <span>{{ challenge.title }}</span>
          </h1>
          <div
            class="text-white text-sm mb-5 md:text-lg leading-4 md:leading-6 font-light md:min-h-[80px] line-clamp-3 text-ellipsis overflow-hidden ..."
          >
            <div v-html="challenge.description" />
          </div> -->
        </div>
        <div class="flex items-end justify-center md:justify-between py-5">
          <NuxtLink
            :to="`/challenge/${challenge.id}`"
            class="mt-1 text-md flex items-center gap-2 font-bold hover:text-primary-600 hover:bg-white hover:translate-x-1 transition-transform bg-primary-600 text-white px-5 py-1.5 md:px-5 md:py-2.5 rounded-xl shadow-2xl"
          >
            {{ $t('join') }}
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </NuxtLink>
        </div>
      </div>
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>
<script setup lang="ts">
import type { Challenge } from '~/types/dto/challenge.dto'

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
</style>
