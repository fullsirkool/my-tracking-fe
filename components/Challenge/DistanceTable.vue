<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">{{ t('challenge_distance') }}</h1>
    <div class="flex flex-wrap justify-start gap-4">
      <div v-for="distance in distances">
        <ChallengeDistanceCard :distance="distance" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChallengeStore } from '../../stores/challenge.store'

const { t } = useI18n()
const challengeStore = useChallengeStore()
const { distances } = storeToRefs(challengeStore)
const tabs = ref([
  {
    slot: 'rule',
    icon: 'i-heroicons-adjustments-horizontal',
    label: t('challenge_detail')
  },
  {
    slot: 'chart',
    icon: 'i-heroicons-chart-bar-square',
    label: t('activity_chart')
  },
  {
    slot: 'joined-user',
    icon: 'i-heroicons-user-group',
    label: t('joined_users')
  }
])

const route = useRoute()
const router = useRouter()
</script>
