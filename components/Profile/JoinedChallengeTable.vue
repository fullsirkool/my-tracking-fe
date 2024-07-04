<template>
  <div class="mt-10">
    <div v-show="joinedChallenges?.length">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
            v-for="challenge in joinedChallenges"
            :key="challenge.id"
            class="grid-span-1"
        >
          <ChallengeCard :challenge="challenge"/>
        </div>
      </div>
      <div class="flex items-center justify-end mt-4">
        <UPagination
            v-model="paging.page"
            :page-count="paging.size"
            :total="totalJoinedChallenge"
            :ui="{
            rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
          }"
        >
        </UPagination>
      </div>
    </div>
    <div
        v-show="!joinedChallenges?.length"
        class="mx-0 mt-32 min-h-[200px] w-full text-center"
    >
      <div>
        {{ $t('no_challenge_joined') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileStore } from '~/stores/profile.store'

const profileStore = useProfileStore()
const {
  joinedChallenges,
  joinedChallengePage,
  joinedChallengePageSize,
  totalJoinedChallenge,
  totalJoinedChallengePage,
} = storeToRefs(profileStore)

const paging = ref({
  page: 1,
  size: 9,
})

watch(() => paging.value.page, (newVal) => {
  profileStore.fetchJoinedChallenge({page: newVal})
})

watch(() => paging.value.size, (newVal) => {
  joinedChallengePageSize.value = newVal
  profileStore.fetchJoinedChallenge({page: 1})
})

onMounted(() => {
  paging.value = {
    page: joinedChallengePage.value,
    size: joinedChallengePageSize.value
  }
})
</script>
