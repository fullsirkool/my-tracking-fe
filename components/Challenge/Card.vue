<template>
  <div class="relative z-10" :class="customClass">
    <UCard
      class="z-10 rounded-3xl bg-[#f5f5f5] text-[#4B4B4B] max-w-[500px] relative group hover:bg-primary-50 transition-all shadow-none hover:-translate-y-2 duration-300 hover:shadow-xl md:scale-90 hover:scale-100"
    >
      <div v-if="highlight" class="latest-challenge absolute -top-2 -right-2 z-10 flex justify-center items-center w-16 h-16">
        <span class="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-2xl font-bold tracking-widest">
          {{ $t('new') }}
        </span>
      </div>
      <div
        v-show="isEnded"
        class="absolute right-0 top-1/4 inline-block z-10 rotate-12 duration-300 py-1 text-2xl text-primary-600 w-full text-center tracking-wider border-primary-500 border-y-2 scale-125 font-black shadow bg-slate-100 opacity-80"
      >
        {{ $t('ended') }}
      </div>
      <div class="rounded-xl">
        <img
          :src="challenge.image"
          class="rounded-xl h-[200px] w-full object-cover opacity-90 group-hover:opacity-100 object-[50%_0%]"
        />
      </div>
      <div class="mt-4 text-left">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-calendar-days-solid" />
          <span class="text-sm">{{ getDisplayDate }}</span>
        </div>
        <div class="">
          <div>
            <div class="h-[55px] line-clamp-2">
              <NuxtLink
                :to="`/challenge/${challenge.id}`"
                class="font-bold text-xl hover:text-primary-500 transition-colors duration-300"
              >
                {{ challenge.title }}
              </NuxtLink>
            </div>
            <div class="flex items-center justify-between">
              <NuxtLink
                :to="`/challenge/${challenge.id}`"
                class="mt-1 text-md flex items-center gap-2 hover:text-primary-500 hover:translate-x-1 transition-transform"
              >
                {{ $t('detail_information') }}
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
import { type Challenge } from '~/types/dto/challenge.dto'
import { useAdminStore } from '~/stores/admin.store'

const { t } = useI18n()
const dayjs = useDayjs()
const runtimeConfig = useRuntimeConfig()
const { BASE_REDIRECT_URL } = runtimeConfig.public
const toast = useToast()
interface IChallengeCardProps {
  challenge: Challenge
  highlight?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<IChallengeCardProps>(), {
  highlight: false,
})


const adminStore = useAdminStore()
const adminUser = computed(() => adminStore.user)
const isAdmin = computed(() => !!adminUser.value)

const getShareUrl = computed(() => {
  return `${BASE_REDIRECT_URL}/challenge/${props.challenge.id}`
})

const getDisplayDate = computed(() => {
  const { startDate, endDate } = props.challenge
  return `${dayjs(startDate).tz('Asia/Bangkok').format('DD/MM/YYYY')} - ${dayjs(
    endDate,
  )
    .tz('Asia/Bangkok')
    .format(' DD/MM/YYYY ')}`
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
      color: 'green',
      title: t('copied_challenge_url_to_clipboard'),
    })
  } catch (error) {}
}
</script>
<style lang="scss">
.highlight-tag {
  filter: drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.1));
}
</style>
