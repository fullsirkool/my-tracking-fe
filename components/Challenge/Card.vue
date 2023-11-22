<template>
  <div class="relative challenge-card-container" :class="customClass">
    <div
      v-show="isEnded"
      class="challenge-card-tag absolute -right-4 -top-2 flex items-center justify-center px-4 py-2 h-6 rounded-lg text-white z-10 bg-red-500"
    >
      {{ $t('ended') }}
    </div>
    <UCard
      class="rounded-3xl bg-[#f5f5f5] challenge-card-content text-[#4B4B4B] max-w-[500px] relative"
      style="box-shadow: none"
    >
      <div class="image-container rounded-xl">
        <img
          :src="challenge.image"
          class="rounded-xl h-[200px] w-full object-cover"
        />
      </div>
      <div class="mt-4">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-calendar-days-solid" />
          <span class="text-sm">{{ getDisplayDate }}</span>
        </div>
        <div class="flex items-center justify-start gap-4">
          <UAvatar size="md" :src="challenge.owner.profile" alt="Avatar" />
          <div class="w-full">
            <NuxtLink
              :to="`/challenge/${challenge.id}`"
              class="font-bold text-xl hover:text-sky-900"
              >{{ challenge.title }}
            </NuxtLink>
            <div class="flex items-center justify-between">
              <NuxtLink
                :to="`/challenge/${challenge.id}`"
                class="mt-1 text-md flex items-center gap-2"
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
  customClass: string
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
<style lang="scss">
.challenge-card-container {
  .challenge-card-tag,
  .challenge-card-content {
    transition:
      transform 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
  }

  .challenge-card-tag {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  }

  .challenge-card-content {
    .image-container {
      height: auto;
      overflow: hidden;
      position: relative;

      img {
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}

.challenge-card-container:hover {
  .challenge-card-tag,
  .challenge-card-content {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
    transform: translate(0, -5px);
  }

  .challenge-card-content {
    background-color: bisque;

    .image-container {
      img {
        transform: scale(1.07);
      }
    }
  }
}
</style>
