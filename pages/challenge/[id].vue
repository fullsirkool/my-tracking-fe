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
      <UButton size="xl" @click="handleJoinChallenge">
        {{ $t('join_challenge') }}
      </UButton>
    </UContainer>
    <ChallengeDetailTable></ChallengeDetailTable>
  </UContainer>
  <PaymentQRCodeDialog
    :is-open="openQrDialog"
    :qr-data-url="qrCodeDataUrl"
    :payment-id="paymentId"
    @close="handleClosePaymentDialog"
  ></PaymentQRCodeDialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import challengeRepository from '~/repository/challenge.repository'
import { useChallengeStore } from '~/stores/challenge.store'
import { useUserStore } from '~/stores/userStore'

const toast = useToast()
const { t } = useI18n()
const router = useRouter()

const challengeStore = useChallengeStore()
const { user } = useUserStore()
const { fetchChallengeDetail } = challengeStore
const { image } = storeToRefs(challengeStore)
const { params, fullPath } = useRoute()
const { id } = params

const openQrDialog = ref(false)
const qrCodeDataUrl = ref('')
const paymentId = ref(0)

await useAsyncData('challenge', () => fetchChallengeDetail(+id))

const handleJoinChallenge = async  () => {
  if (isEmpty(user) || !user) {
    localStorage.setItem('saved-path', fullPath)
    navigateTo('/signin')
    return
  }
  const res = await challengeRepository.join(+id)
  if (res) {
    qrCodeDataUrl.value = res.qrDataURL
    paymentId.value = res.paymentId
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
