<template>
  <UContainer>
    <div>
      <img
        :src="image"
        alt=""
        class="h-[600px] w-full object-cover rounded-3xl"
      />
    </div>
    <UContainer class="p-6 flex items-center justify-center">
      <UButton v-if="!isJoinedChallenge" size="xl" @click="handleJoinChallenge">
        {{ $t('join_challenge') }}
      </UButton>
    </UContainer>
    <ChallengeDetailTable></ChallengeDetailTable>
    <ChallengeProgressTable :id="id"></ChallengeProgressTable>
  </UContainer>
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
          :loading="isConfirmingJoinChallenge"
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
    @close="handleClosePaymentDialog"
  ></PaymentQRCodeDialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import challengeRepository from '~/repository/challenge.repository'
import { useChallengeStore } from '~/stores/challenge.store'
import { useUserStore } from '~/stores/user.store'
import { TPaymentInfor } from '~/types/type/payment.type'

const toast = useToast()
const { t } = useI18n()
const router = useRouter()

const challengeStore = useChallengeStore()
const { user } = useUserStore()
const {
  fetchChallengeDetail,
  fetchChallengeUsers,
  fetchJoinedChallenge,
  joinedChallenge,
} = challengeStore
const { image } = storeToRefs(challengeStore)
const { params, fullPath } = useRoute()
const { id } = params

const openQrDialog = ref(false)
const paymentInfor = ref<TPaymentInfor>({
  qrDataUrl: '',
  paymentId: 0,
  accountNo: '',
  bankName: '',
  ticketPrice: 0,
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
    isOpenConfirmDialog.value = false
    isConfirmingJoinChallenge.value = false
    paymentInfor.value.qrDataUrl = res.qrDataURL
    paymentInfor.value.paymentId = res.paymentId
    paymentInfor.value.accountNo = res.accountNo
    paymentInfor.value.bankName = res.bankName
    paymentInfor.value.ticketPrice = res.ticketPrice
    openQrDialog.value = true
    console.log(res)
  }

  // if (res) {
  //   toast.add({
  //     id: 'copy-challenge',
  //     icon: 'i-heroicons-check-circle',
  //     timeout: 4000,
  //     title: t('join_challenge_successfully'),
  //   })
  //   await fetchChallengeDetail(+id)
  //   await router.replace({ query: { tab: 'joined-user' } })
  // } else {
  //   toast.add({
  //     id: 'copy-challenge',
  //     icon: 'i-heroicons-exclamation-circle',
  //     color: 'red',
  //     timeout: 4000,
  //     title: t('you_have_joined_this_challenge'),
  //   })
  // }
}

const handleClosePaymentDialog = () => {
  openQrDialog.value = false
}
</script>
