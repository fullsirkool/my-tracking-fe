<template>
  <UContainer>
    <div class="mt-10 px-0 sm:px-6 lg:px-8 max-w-7xl">
      <UCard
          class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px] p-4"
          style="box-shadow: none"
      >
        <div>
          <img
              :src="image"
              alt=""
              class="h-[200px] md:h-[600px] w-full object-cover rounded-3xl"
          />
        </div>
        <div class="text-center">
          <h1 class="text-4xl font-semibold p-4">{{challengeDetail?.title}}</h1>
        </div>
        <div class="p-2 flex items-center justify-center">
          <UButton v-if="!isJoinedChallenge" size="xl" @click="handleJoinChallenge">
            {{ $t('join_challenge') }}
          </UButton>
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
import {storeToRefs} from 'pinia'
import challengeRepository from '~/repository/challenge.repository'
import {useChallengeStore} from '~/stores/challenge.store'
import {useUserStore} from '~/stores/user.store'
import {TPaymentInfor} from '~/types/type/payment.type'
import {JoinChallengeStatus} from "~/types/dto/challenge.dto";

const toast = useToast()
const {t} = useI18n()
const router = useRouter()

const challengeStore = useChallengeStore()
const {user} = useUserStore()
const {
  fetchChallengeDetail,
  fetchChallengeUsers,
} = challengeStore
const {image, challengeDetail} = storeToRefs(challengeStore)
const {params, fullPath} = useRoute()
const {id} = params

const openQrDialog = ref(false)
const paymentInfor = ref<TPaymentInfor>({
  qrDataUrl: '',
  paymentCode: 0,
  accountNo: '',
  bankName: '',
  ticketPrice: 0,
  paymentMessage: ''
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

const handleJoinChallenge = async () => {
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
  if (res) {
    const {status} = res
    isOpenConfirmDialog.value = false
    isConfirmingJoinChallenge.value = false
    if (status === JoinChallengeStatus.COMPLETED) {

    } else {
      if (res.paymentInfor) {
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

const handleCompletePayment = async (isCompleted: Boolean) => {
  if (isCompleted) {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      timeout: 4000,
      title: t('join_challenge_successfully'),
    })
    await fetchChallengeDetail(+id)
    handleClosePaymentDialog()
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
