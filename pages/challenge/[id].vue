<template>
  <UContainer>
    <div class="mt-10">
      <UCard class="rounded-xl bg-[#f5f5f5] overflow-auto min-h-[300px]">
        <div>
          <div
            class="custom-cover rounded-xl h-[300px]"
            :style="{ background: `url(${image})` }"
          ></div>
          <div class="md:p-5 md:mt-5">
            <div class="text-left">
              <h1 class="text-4xl font-semibold mt-10 mb-5 md:mt-0">
                {{ challengeDetail?.title }}
              </h1>
            </div>
            <div
              v-if="challengeDetail?.description"
              class="custom-content min-h-[120px]  text-justify"
            >
              <div v-html="challengeDetail?.description" />
            </div>
            <div class="mt-5 p-2 flex items-center justify-center">
              <UButton
                v-if="!isEnded && !isJoinedChallenge"
                size="xl"
                @click="handleConfirmJoinChallenge"
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
const dayjs = useDayjs()

const challengeStore = useChallengeStore()
const { user } = useUserStore()
const { fetchChallengeDetail, fetchChallengeUsers } = challengeStore
const { image, challengeDetail, endDate } = storeToRefs(challengeStore)
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

const isEnded = computed(() => {
  return dayjs().isAfter(dayjs(endDate))
})

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
    } else if (status === JoinChallengeStatus.COMPLETED) {
      toast.add({
        id: 'copy-challenge',
        icon: 'i-heroicons-check-circle',
        timeout: 5000,
        color: 'green',
        title: t('join_challenge_successfully'),
      })
      handleClosePaymentDialog()
      setTimeout(() => {
        location.reload()
      }, 5000)
    }
  }
}

const handleCompletePayment = (isCompleted: Boolean) => {
  if (isCompleted) {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'green',
      title: t('join_challenge_successfully'),
    })
    handleClosePaymentDialog()
    setTimeout(() => {
      location.reload()
    }, 5000)
  } else {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
      title: t('you_have_joined_this_challenge'),
    })
  }
}

const handleClosePaymentDialog = () => {
  openQrDialog.value = false
}

watch(challengeDetail, (newVal) => console.log('challengeDetail', newVal), {
  deep: true,
  immediate: true,
})
</script>

<style>

</style>