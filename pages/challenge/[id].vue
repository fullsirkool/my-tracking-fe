<template>
  <UContainer>
    <div class="mt-10">
      <UCard class="rounded-xl bg-[#f5f5f5] overflow-auto min-h-[300px]">
        <div class="md:flex gap-5">
          <div
            class="custom-cover rounded-xl flex-1"
            :style="{ background: `url(${image})` }"
          ></div>
          <div class="flex-1">
            <div class="text-left">
              <h1 class="text-4xl font-semibold mt-10 mb-5 md:mt-0">
                {{ challengeDetail?.title }}
              </h1>
            </div>
            <div v-if="challengeDetail?.description" class="min-h-[120px] text-slate-700 text-justify">
              {{ challengeDetail?.description }}
            </div>
            <div class="mt-5 p-2 flex items-center justify-center">
              <UButton
                v-if="!isJoinedChallenge"
                size="xl"
                @click="handleJoinChallenge"
              >
                {{ $t('join_challenge') }}
              </UButton>
            </div>
          </div>
        </div>

      </UCard>
    </div>
    <ChallengeDetailTable></ChallengeDetailTable>
    <ChallengeProgressTable :id="id"></ChallengeProgressTable>
    <UModal v-model="isOpenConfirmDialog">
      <div class="p-8">
        <h1 class="text-xl font-semibold text-center">
          {{ $t('confirm_join_challenge') }}
        </h1>
        <div class="pt-4 flex items-center justify-center gap-2">
          <UButton
            size="lg"
            :loading="isConfirmingJoinChallenge"
            @click="handleConfirmJoinChallenge"
          >
            {{ $t('confirm') }}
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            :disabled="isConfirmingJoinChallenge"
            @click="isOpenConfirmDialog = false"
          >
            {{ $t('cancel') }}
          </UButton>
        </div>
      </div>
    </UModal>
    <PaymentQRCodeDialog
      :is-open="openQrDialog"
      :payment-infor="paymentInfor"
      @complete="handleCompletePayment"
      @close="handleClosePaymentDialog"
    ></PaymentQRCodeDialog>
  </UContainer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import challengeRepository from '~/repository/challenge.repository'
import { useChallengeStore } from '~/stores/challenge.store'
import { useUserStore } from '~/stores/user.store'
import { TPaymentInfor } from '~/types/type/payment.type'
import { JoinChallengeStatus } from '~/types/dto/challenge.dto'

definePageMeta({
  middleware: ['authentication'],
})

const toast = useToast()
const { t } = useI18n()

const challengeStore = useChallengeStore()
const { user } = useUserStore()
const { fetchChallengeDetail, fetchChallengeUsers } = challengeStore
const { image, challengeDetail } = storeToRefs(challengeStore)
const { params, fullPath } = useRoute()
const { id } = params

const openQrDialog = ref<boolean>(false)
const paymentInfor = ref<TPaymentInfor>({
  qrDataUrl: '',
  paymentCode: 0,
  accountNo: '',
  bankName: '',
  ticketPrice: 0,
  paymentMessage: '',
})
const isOpenConfirmDialog = ref(false)
const isConfirmingJoinChallenge = ref(false)
const isJoinedChallenge = ref(false)

await useAsyncData('challenge', async () => {
  const [_a, _b, checkJoined] = await Promise.all([
    fetchChallengeDetail(+id),
    fetchChallengeUsers({
      id: +id,
      page: 1,
      size: 10,
    }),
    challengeRepository.checkJoinedChallenge(+id),
  ])
  console.log('😻 ~ awaituseAsyncData ~ checkJoined:', checkJoined)

  isJoinedChallenge.value = checkJoined?.joined || false
})

const handleJoinChallenge = () => {
  isOpenConfirmDialog.value = true
}
const handleConfirmJoinChallenge = async () => {
  if (isEmpty(user) || !user) {
    localStorage.setItem('saved-path', fullPath)
    navigateTo('/signin')
    return
  }
  isConfirmingJoinChallenge.value = true
  const res = await challengeRepository.join(+id)
  console.log('res', res)
  if (res) {
    const { status } = res
    isOpenConfirmDialog.value = false
    isConfirmingJoinChallenge.value = false
    if (status === JoinChallengeStatus.WAITING) {
      if (res.paymentInfor) {
        console.log('here')
        paymentInfor.value.qrDataUrl = res.paymentInfor.qrDataURL
        paymentInfor.value.paymentCode = res.paymentInfor.paymentCode
        paymentInfor.value.accountNo = res.paymentInfor.accountNo
        paymentInfor.value.bankName = res.paymentInfor.bankName
        paymentInfor.value.ticketPrice = res.paymentInfor.ticketPrice
        paymentInfor.value.paymentMessage = res.paymentInfor.paymentMessage
        openQrDialog.value = true
      }
    }
  }
}

// eslint-disable-next-line require-await
const handleCompletePayment = (isCompleted: Boolean) => {
  if (isCompleted) {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      timeout: 4000,
      color: 'green',
      title: t('join_challenge_successfully'),
    })
    handleClosePaymentDialog()
    setTimeout(() => {
      location.reload()
    }, 4000)
  } else {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: t('you_have_joined_this_challenge'),
    })
  }
}

const handleClosePaymentDialog = () => {
  openQrDialog.value = false
}
</script>
