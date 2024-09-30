<script setup lang="ts">
import type { TPaymentInfor } from '~/types/type/payment.type'
import { number } from '~/utils/numberWithCommas'
import downloadDivAsImage from '~/utils/image-downloader'

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public
const { t } = useI18n()
const toast = useToast()

const props = defineProps({
  paymentInfo: {
    type: Object as PropType<TPaymentInfor>,
    required: true
  }
})

const qrCodeRef = ref<HTMLElement | null>(null)

const init = () => {
  console.log('init', props.paymentInfo)
  const eventSource = new EventSource(
    `${BASE_URL}/payment/event/${props.paymentInfo.paymentCode}`
  )
  eventSource.addEventListener('complete-payment', () => {
    navigateTo('/payment-success')
  })

  return () => {
    eventSource.close()
  }
}

init()

const handleCopy = (value: any) => {
  navigator.clipboard.writeText(value)
  toast.add({
    id: 'copy-challenge',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    title: t('copied_content_to_clipboard')
  })
}

const handleDownload = () => {
  if (qrCodeRef.value) {
    downloadDivAsImage(qrCodeRef.value, 'qr_code.png')
  }
}
</script>

<template>
  <div>
    <div ref="qrCodeRef" class="flex flex-col gap-4 items-center p-4">
      <div class="relative">
        <h3
          class="font-semibold pt-5 text-gray-900 dark:text-white text-4xl tracking-wider text-center"
        >
          {{ $t('payment_infor') }}
        </h3>
      </div>
      <div class="p-4">
        <!--          <img :src="`data:image/png;base64,${paymentInfo.qrCode}`" alt="qr-code" />-->
        <CommonQRCode :data="paymentInfo.qrCode"></CommonQRCode>
      </div>
      <div>
        <div class="text-center text-lg pr-10">
          <p class="flex items-start justify-start mx-auto my-2">
            <label class="font-semibold text-left min-w-[150px]"> {{ $t('bank_name') }}: </label>
            &nbsp;
            <span> {{ paymentInfo.bankName }} ({{ paymentInfo.bankCode }}) </span>
          </p>
          <p class="flex items-center justify-start mx-auto my-2">
            <label class="font-semibold text-left min-w-[150px]"> {{ $t('account_name') }}: </label>
            &nbsp;
            <span> {{ paymentInfo.userBankName }} </span>
          </p>
          <p class="flex items-center justify-start mx-auto my-2">
            <label class="font-semibold text-left min-w-[150px]"> {{ $t('account_number') }}: </label>
            &nbsp;
            <span class="relative">
                {{ paymentInfo.bankAccount }}
                <a
                  class="h-8 w-8 absolute -right-10 top-0 flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  href="javascript:void(0)"
                  @click="handleCopy(paymentInfo.bankAccount)"
                >
                  <Icon
                    name="material-symbols:content-copy-outline"
                    width="1.25rem"
                    height="1.25rem"
                  />
                </a>
              </span>
          </p>
          <p
            v-if="paymentInfo.ticketPrice"
            class="flex items-center justify-start mx-auto my-2"
          >
            <label class="font-semibold text-left min-w-[150px]"> {{ $t('price') }}: </label>
            &nbsp;
            <span class="relative">
                {{ `${number.format(paymentInfo.ticketPrice)} VNĐ` }}
                <a
                  href="javascript:void(0)"
                  class="h-8 w-8 absolute -right-10 top-0 flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  @click="handleCopy(paymentInfo.ticketPrice)"
                >
                  <Icon
                    name="material-symbols:content-copy-outline"
                    width="1.25rem"
                    height="1.25rem"
                  />
                </a>
              </span>
          </p>
          <p
            class="flex items-center justify-start mx-auto my-2"
            v-if="paymentInfo.content"
          >
            <label class="font-semibold text-left min-w-[150px]"> {{ $t('payment_content') }}: </label>

            <span class="relative">
                {{ paymentInfo.content }}
                <a
                  href="javascript:void(0)"
                  class="h-8 w-8 absolute -right-10 top-0 flex items-center justify-center hover:bg-gray-100 rounded-lg"
                  @click="handleCopy(paymentInfo.content)"
                >
                  <Icon
                    name="material-symbols:content-copy-outline"
                    width="1.25rem"
                    height="1.25rem"
                  />
                </a>
              </span>
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <a class="text-primary cursor-pointer underline" @click="handleDownload">Download QR Code</a>
    </div>
    <div class="border-b my-5 border-slate-100"></div>
    <div class="px-2 text-center text-primary-500">
      <p class="flex items-center justify-center text-sm md:text-base">
        {{ $t('payment_require') }}
      </p>
    </div>
    <div class="text-center pt-2 text-primary-500 text-sm md:text-base">
      <i>*{{ $t('payment_warning') }}</i>
    </div>
  </div>


</template>
