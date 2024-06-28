<template>
  <UModal v-model="props.isOpen">
    <div class="p-4">
      <Placeholder class="h-48"/>
      <img :src="paymentInfor.qrDataUrl"/>
    </div>
    <div class="text-center">
      <p>{{ $t('bank_name') }}: {{ paymentInfor.bankName }}</p>
      <p>{{ $t('account_number') }}: {{ paymentInfor.accountNo }}</p>
    </div>
  </UModal>
</template>
<script setup lang="ts">
import {TPaymentInfor} from "~/types/type/payment.type";

const runtimeConfig = useRuntimeConfig()
const {BASE_URL} = runtimeConfig.public
const {t} = useI18n()

interface IPaymentDialogProps {
  isOpen: boolean
  paymentInfor: TPaymentInfor
}

const emit = defineEmits(['close'])

const props = withDefaults(defineProps<IPaymentDialogProps>(), {
  isOpen: false,
  paymentInfor: {
    qrDataUrl: '',
    paymentId: 0,
    accountNo: "",
    bankName: ""
  }
})

const init = () => {
  const eventSource = new EventSource(
      `${BASE_URL}/payment/event/${props.paymentInfor.paymentId}`,
  )
  eventSource.addEventListener('complete-payment', () => {
    console.log('payment complete')
    emit('close')
  })
  return () => {
    eventSource.close()
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    console.log('open dialog')
    init()
  }
})
</script>
<style scoped></style>
