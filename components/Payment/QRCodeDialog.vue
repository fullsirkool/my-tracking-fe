<template>
  <UModal v-model="props.isOpen" @close="handleClose">
    <div class="relative pt-2">
      <h3
        class="font-semibold leading-6 text-gray-900 dark:text-white text-xl text-center"
      >
        {{ $t('payment_infor') }}
      </h3>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="-my-1 absolute right-2 top-2"
        @click="handleClose"
      />
    </div>
    <div class="p-4">
      <div class="p-4">
        <img :src="paymentInfo.qrDataURL" />
      </div>
      <div class="text-center text-lg">
        <p class="flex items-center justify-center">
          {{ $t('bank_name') }}: {{ paymentInfo.bankName }}
        </p>
        <p class="flex items-center justify-center">
          {{ $t('account_name') }}: {{ paymentInfo.accountName }}
        </p>
        <p class="flex items-center justify-center">
          {{ $t('account_number') }}: {{ paymentInfo.accountNo }}
          <a
            href="javascript:void(0)"
            class="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            @click="handleCopy(paymentInfo.accountNo)"
          >
            <Icon
              name="material-symbols:content-copy-outline"
              width="1.25rem"
              height="1.25rem"
            />
          </a>
        </p>
        <p
          class="flex items-center justify-center"
          v-if="paymentInfo.ticketPrice"
        >
          {{ $t('price') }}:
          {{ `${number.format(paymentInfo.ticketPrice)} VNĐ` }}
          <a
            href="javascript:void(0)"
            class="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            @click="handleCopy(paymentInfo.ticketPrice)"
          >
            <Icon
              name="material-symbols:content-copy-outline"
              width="1.25rem"
              height="1.25rem"
            />
          </a>
        </p>
        <p
          class="flex items-center justify-center"
          v-if="paymentInfo.paymentMessage"
        >
          {{ $t('payment_content') }}:
          {{ paymentInfo.paymentMessage }}
          <a
            href="javascript:void(0)"
            class="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            @click="handleCopy(paymentInfo.paymentMessage)"
          >
            <Icon
              name="material-symbols:content-copy-outline"
              width="1.25rem"
              height="1.25rem"
            />
          </a>
        </p>
      </div>
      <div class="p-2 text-center text-sm text-primary-500">
        <p class="flex items-center justify-center">{{ $t('payment_wait') }}</p>
      </div>
      <div class="text-center pt-2 text-primary-500">
        <i class="text-sm">*{{ $t('payment_warning') }}</i>
      </div>
    </div>
  </UModal>
</template>
<script setup lang="ts">
import type { TPaymentInfor } from '~/types/type/payment.type'
import { number } from '~/utils/numberWithCommas'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public
const { t } = useI18n()
const toast = useToast()

interface IPaymentDialogProps {
  isOpen: boolean
  paymentInfo: TPaymentInfor
}

const emit = defineEmits(['close', 'complete'])


const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  paymentInfo: {
    type: Object as PropType<TPaymentInfor>,
    default: () => ({
      qrDataURL: "",
      paymentCode: 0,
      accountNo: '',
      bankName: '',
      paymentMessage: '',
      ticketPrice: 0,
    }),
  },
})

const init = () => {
  const eventSource = new EventSource(
    `${BASE_URL}/payment/event/${props.paymentInfo.paymentCode}`,
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

const handleCopy = (value: any) => {
  navigator.clipboard.writeText(value)
  toast.add({
    id: 'copy-challenge',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    title: t('copied_content_to_clipboard'),
  })
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
