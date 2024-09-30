<script lang="ts" setup>
import personalImage from '@/assets/image/personal.png'
import groupImage from '@/assets/image/group.png'
import virtualImage from '@/assets/image/virtual.png'
import offlineImage from '@/assets/image/offline.png'
import type { Challenge } from '~/types/dto/challenge.dto'
import { ChallengeType } from '~/types/enum/challenge.enum'

const isOpen = defineModel<boolean>()

interface IDirectModalProps {
  challenge: Challenge
}

const props = withDefaults(defineProps<IDirectModalProps>(), {})

const ticketCode = ref('')
const isShowRaceType = ref(props.challenge.challengeType === ChallengeType.BOTH)
const raceType = ref()

const handleSelectRaceType = (type: string) => {
  raceType.value = type
  isShowRaceType.value = false
}

const handleRedirect = (type: string) => {
  if (!raceType.value) {
    raceType.value = props.challenge.challengeType.toLowerCase()
  }
  navigateTo(`/challenge/${props.challenge.id}/register/${raceType.value}/${type}`)

}
</script>

<template>
  <UModal v-model="isOpen">
    <div class="rounded-xl overflow-hidden">
      <div class="text-xl font-bold text-center uppercase tracking-wide p-5">
        {{ $t('choose_register_form') }}
      </div>
      <div v-show="isShowRaceType" class="flex justify-center gap-10 mb-10 items-center">
        <img
          :src="virtualImage"
          alt="Đăng ký trực tuyến"
          class="block w-40 h-40 object-contain scale-95 transition-all ease-in-out cursor-pointer rounded-xl shadow hover:shadow-xl hover:scale-100"
          @click="handleSelectRaceType('virtual')"
        />
        <img
          :src=offlineImage
          alt="Đăng ký trực tiếp"
          class="block w-40 h-40 object-contain scale-95 transition-all ease-in-out cursor-pointer rounded-xl shadow hover:shadow-xl hover:scale-100"
          @click="handleSelectRaceType('offline')"
        />
      </div>
      <div v-show="!isShowRaceType" class="flex justify-center gap-10 mb-10 items-center">
        <img
          :src="personalImage"
          alt="Đăng ký cá nhân"
          class="block w-40 h-40 object-contain scale-95 transition-all ease-in-out cursor-pointer rounded-xl shadow hover:shadow-xl hover:scale-100"
          @click="handleRedirect(`individual`)"
        />
        <img
          :src="groupImage"
          alt="Đăng ký tập thể"
          class="block w-40 h-40 object-contain scale-95 transition-all ease-in-out cursor-pointer rounded-xl shadow hover:shadow-xl hover:scale-100"
          @click="handleRedirect(`group`)"
        />
      </div>
    </div>
  </UModal>
</template>
