<template>
  <div class="relative" :class="customClass">
    <UCard
      class="rounded-3xl bg-[#f5f5f5] text-[#4B4B4B] max-w-[500px] relative group hover:bg-primary-50 transition-all shadow-none hover:-translate-y-2 duration-300 hover:shadow-xl scale-90 hover:scale-100"
    >
      <div
        v-show="isEnded"
        class="absolute right-0 top-1/4 inline-block z-10 rotate-12 duration-300 py-1 text-2xl text-red-600 w-full text-center tracking-wider border-red-500 border-y-2 scale-125 font-black shadow bg-slate-100 opacity-80"
      >
        {{ $t('ended') }}
      </div>
      <div class="rounded-xl">
        <img
          :src="challenge.image"
          class="rounded-xl h-[200px] w-full object-cover opacity-90 group-hover:opacity-100"
        />
      </div>
      <div class="mt-4">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-calendar-days-solid" />
          <span class="text-sm">{{ getDisplayDate }}</span>
        </div>
        <div class="flex items-center justify-start gap-4">
          <div class="w-full">
            <NuxtLink
              :to="`/challenge/${challenge.id}`"
              class="font-bold text-xl hover:text-primary-500 transition-colors duration-300"
              >{{ challenge.title }}
            </NuxtLink>
            <div class="flex items-center justify-between">
              <NuxtLink
                :to="`/challenge/${challenge.id}`"
                class="mt-1 text-md flex items-center gap-2 hover:text-primary-500 hover:translate-x-1 transition-transform"
              >
                {{ $t('join') }}
                <UIcon name="i-heroicons-arrow-right-20-solid" />
              </NuxtLink>
              <h3
                class="mt-1 text-md flex items-center gap-2 cursor-pointer"
                @click="isOpenShareModal = true"
              >
                {{ $t('share') }}
                <UIcon name="i-heroicons-share-20-solid" />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
  <UModal v-model="isOpenShareModal">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="text-center">
          <label class="text-xl font-semibold">Share Url</label>
        </div>
      </template>
      <div class="p-4 flex gap-4 items-center">
        <div class="w-full">
          <UInput v-model="getShareUrl" readonly size="xl" />
        </div>
        <a
          href="javascript:void(0)"
          class="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          @click="handleShareChallenge"
        >
          <Icon
            name="material-symbols:content-copy-outline"
            width="1.5rem"
            height="1.5rem"
          />
        </a>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import { Challenge } from '~/types/dto/challenge.dto'

const { t } = useI18n()
const dayjs = useDayjs()

interface IChallengeCardProps {
  challenge: Challenge
  customClass?: string
}

const props = withDefaults(defineProps<IChallengeCardProps>(), {})
const toast = useToast()

const runtimeConfig = useRuntimeConfig()
const { BASE_REDIRECT_URL } = runtimeConfig.public

const getShareUrl = computed(() => {
  return `${BASE_REDIRECT_URL}/challenge/${props.challenge.id}`
})

const getDisplayDate = computed(() => {
  const { startDate, endDate } = props.challenge
  return `${dayjs(startDate).format('YYYY, MMM DD')} - ${dayjs(endDate).format(
    'YYYY, MMM DD',
  )}`
})

const isEnded = computed(() => {
  const { endDate } = props.challenge
  return dayjs().isAfter(dayjs(endDate))
})

const isOpenShareModal = ref(false)

const handleShareChallenge = () => {
  try {
    navigator.clipboard.writeText(getShareUrl.value)
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      timeout: 3000,
      title: t('copied_challenge_url_to_clipboard'),
    })
  } catch (error) {}
}
</script>
<style lang="scss"></style>
