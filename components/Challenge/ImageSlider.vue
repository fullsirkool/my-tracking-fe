<template>
  <carousel wrap-around :autoplay="40000">
    <slide v-for="challenge in challenges" :key="challenge.id">
      <div class="h-700px] w-full object-cover rounded-3xl relative">
        <img
            class="rounded-t-3xl"
            :src="challenge.image"
        />
        <div class="absolute bottom-0 bg-white w-full">
          <h1 class="text-2xl font-semibold text-left">{{ challenge.title }}</h1>
          <div class="truncate ... max-w-[500px]">{{
              challenge.description
            }}
          </div>
          <div class="flex items-center justify-between">
            <NuxtLink
                :to="`/challenge/${challenge.id}`"
                class="mt-1 text-md flex items-center gap-2 hover:text-primary-500 hover:translate-x-1 transition-transform"
            >
              {{ $t('join') }}
              <UIcon name="i-heroicons-arrow-right-20-solid"/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </slide>
    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
</template>
<script setup lang="ts">
import {Challenge} from '~/types/dto/challenge.dto'

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
