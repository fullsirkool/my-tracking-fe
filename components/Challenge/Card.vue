<template>
  <UCard class="rounded-3xl bg-[#f5f5f5] challenge-card text-[#4B4B4B] max-w-[500px]" style="box-shadow: none;">
    <div class="image-container rounded-xl ">
      <img :src="challenge.image" class="rounded-xl h-[200px] w-full object-cover" />
    </div>
    <div>
      <UIcon name="i-heroicons-calendar-days-solid" />
    </div>
    <div class="flex items-center justify-start gap-4 mt-4 ">
      <UAvatar size="md" :src="challenge.owner.profile" alt="Avatar" />
      <div class="w-full">
        <NuxtLink :to="`/challenge/${challenge.id}`" class="font-bold text-xl hover:text-sky-900">{{ challenge.title }}
        </NuxtLink>
        <div class="flex items-center justify-between">
          <NuxtLink :to="`/challenge/${challenge.id}`" class="mt-1 text-md flex items-center gap-2">
            {{ $t("join") }}
            <UIcon name="i-heroicons-arrow-right-20-solid" />
          </NuxtLink>
          <h3 class="mt-1 text-md flex items-center gap-2 cursor-pointer" @click="isOpenShareModal = true">{{ $t("share")
          }}
            <UIcon name="i-heroicons-share-20-solid" />
          </h3>

        </div>
      </div>
    </div>
  </UCard>
  <UModal v-model="isOpenShareModal">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="text-center">
          <label class="text-xl font-semibold ">Share Url</label>
        </div>
      </template>
      <div class="p-4 flex gap-4 items-center">
        <div class="w-full">
          <UInput v-model="getShareUrl" readonly size="xl" />
        </div>
        <a href="javascript:void(0)" class="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          @click="handleShareChallenge">
          <Icon name="material-symbols:content-copy-outline" width="1.5rem" height="1.5rem" />
        </a>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import { Challenge } from '~/types/dto/challenge.dto';
const { t } = useI18n()

interface IChallengeCardProps {
  challenge: Challenge;
}
const props = withDefaults(defineProps<IChallengeCardProps>(), {})
const toast = useToast()

const runtimeConfig = useRuntimeConfig()
const { BASE_REDIRECT_URL } = runtimeConfig.public

const getShareUrl = computed(() => {
  return `${BASE_REDIRECT_URL}/challenge/${props.challenge.id}`
})

const isOpenShareModal = ref(false)

const handleShareChallenge = () => {
  try {
    navigator.clipboard.writeText(getShareUrl.value);
    toast.add({ id: "copy-challenge", icon: 'i-heroicons-check-circle', timeout: 3000, title: t('copied_challenge_url_to_clipboard') })
  } catch (error) {
    console.log(error)
  }
}
</script>
<style>
.challenge-card {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

  .image-container {
    height: auto;
    overflow: hidden;
    position: relative;

    img {
      transition: transform 0.3s ease-in-out;
    }
  }


}

.challenge-card:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  transform: translate(0, -5px);
  background-color: bisque;

  .image-container {
    img {
      transform: scale(1.07);
    }
  }

}
</style>