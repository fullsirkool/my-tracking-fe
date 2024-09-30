<script setup lang="ts">
import {type Challenge} from "~/types/dto/challenge.dto";

interface IHomeChallengeList {
  challenges: Challenge[]
}

const props = withDefaults(defineProps<IHomeChallengeList>(), {})
</script>
<template>
  <div class="bg-red-100 p-10 text-gray-700">
    <UContainer>
      <h1 class="font-bold uppercase text-center text-4xl">{{ $t('marathon_event') }}</h1>
      <div>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
              v-for="challenge in challenges"
              :key="challenge.id"
              class="grid-span-1 flex items-center justify-center"
          >
            <ChallengeCard
                :challenge="challenge"
                custom-class="w-full"
            ></ChallengeCard>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center py-6">
        <UButton :ui="{ rounded: 'rounded-full', border: 'none' }" size="xl" color="white"
                 icon="i-heroicons-arrow-right-circle-16-solid" :to="`/challenge`">
          {{ $t('view_all') }}
        </UButton>
      </div>
    </UContainer>
  </div>
</template>