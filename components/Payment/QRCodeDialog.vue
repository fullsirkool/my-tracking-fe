<template>
  <UModal v-model="props.isOpen" @close="handleClose">
    <div class="p-4">
      <div class="p-4">
        <div class="h-48" />
        <img :src="paymentInfor.qrDataUrl" />
      </div>
      <div class="text-center text-lg">
        <p>{{ $t('bank_name') }}: {{ paymentInfor.bankName }}</p>
        <p>{{ $t('account_number') }}: {{ paymentInfor.accountNo }}</p>
        <p v-if="paymentInfor.ticketPrice">
          {{ $t('price') }}:
          {{ `${number.format(paymentInfor.ticketPrice)} VNĐ` }}
        </p>
        <p v-if="paymentInfor.paymentMessage">
          {{ $t('payment_content') }}:
          {{ paymentInfor.paymentMessage }}
        </p>
      </div>
      <div class="p-2 text-center text-lg">
        <p>{{ $t('payment_wait') }}</p>
      </div>
      <div class="text-center pt-2 text-red-500">
        <i class="text-sm">*{{ $t('payment_warning') }}</i>
      </div>
    </div>
  </UModal>
</template>
<script setup lang="ts">
import { TPaymentInfor } from '~/types/type/payment.type'
import { number } from '~/utils/numberWithCommas'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public
const { t } = useI18n()

interface IPaymentDialogProps {
  isOpen: boolean
  paymentInfor: TPaymentInfor
}

const emit = defineEmits(['close', 'complete'])

const props = withDefaults(defineProps<IPaymentDialogProps>(), {
  isOpen: false,
  paymentInfor: {
    qrDataUrl: '',
    paymentCode: 0,
    accountNo: '',
    bankName: '',
    paymentMessage: '',
    ticketPrice: 0,
  },
})

const init = () => {
  const eventSource = new EventSource(
    `${BASE_URL}/payment/event/${props.paymentInfor.paymentCode}`,
  )
  eventSource.addEventListener('complete-payment', () => {
    console.log('payment complete')
    emit('complete', true)
  })
  return () => {
    eventSource.close()
  }
}

const handleClose = () => {
  emit('close')
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      console.log('open dialog')
      init()
    }
  },
)
</script>
<style scoped></style>
