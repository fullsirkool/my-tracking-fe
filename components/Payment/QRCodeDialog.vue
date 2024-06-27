<template>
  <UModal v-model="props.isOpen">
    <div class="p-4">
      <Placeholder class="h-48" />
      <img :src="qrDataUrl" />
    </div>
  </UModal>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

interface IPaymentDialogProps {
  isOpen: boolean
  qrDataUrl: string
  paymentId: number
}

const emit = defineEmits(['close'])

const props = withDefaults(defineProps<IPaymentDialogProps>(), {
  isOpen: false,
  qrDataUrl: '',
  paymentId: 0,
})

const init = () => {
  const eventSource = new EventSource(
    `${BASE_URL}/payment/event/${props.paymentId}`,
  )
  eventSource.addEventListener('complete-payment', () => {
    console.log('payment complete')
    emit('close')
  })
  return () => {
    eventSource.close()
  }
}

onMounted(() => {
  init()
})
</script>
<style scoped></style>
