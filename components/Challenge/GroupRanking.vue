<template>
  <div class="mt-10">
    <UCard
        class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]"
        style="box-shadow: none"
    >
      <h1 class="text-2xl font-semibold mb-2">{{ t('rank') }}</h1>
      <div class="flex flex-col gap-8 p-4 items-center">
        <div v-for="item in groups" :key="item.id" class="flex items-end gap-8">
          <label class="text-xl">{{item.name}}</label>
          <div class="w-[40vw]">
            <UProgress :value="item.totaldistance" :max="maxDistance" size="xl">
              <template #indicator="{ percent }">
                <div class="text-right">
                  <span>{{(item.totaldistance / 1000).toFixed(2)}} kms</span>
                </div>
              </template>
            </UProgress>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import {useChallengeStore} from "~/stores/challenge.store";
import {storeToRefs} from "pinia";
import challengeRepository from "~/repository/challenge.repository";
import {ChallengeGroup} from "~/types/dto/challenge.dto";

const { t } = useI18n()
const challengeStore = useChallengeStore()
const { challengeDetail } =
    storeToRefs(challengeStore)
const groups = ref<ChallengeGroup[]>()

const maxDistance = computed(() => {
  if (groups.value) {
    return groups.value[0].totaldistance * 1.25
  }
  return 0
})

const init = async () => {
  const res = await challengeRepository.getGroupStatistic(challengeDetail.value.id)
  if (res) {
    groups.value = res
  }
}
init()
</script>
