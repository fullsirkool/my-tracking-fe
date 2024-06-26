<template>
  <UModal v-model="props.isOpen">
    <div class="p-4">
      <Placeholder class="h-48"/>
      <img :src="qrDataUrl"/>
    </div>
  </UModal>
</template>
<script setup lang="ts">
interface IPaymentDialogProps {
  isOpen: boolean;
  qrDataUrl: string
}

const props = withDefaults(defineProps<IPaymentDialogProps>(), {
  isOpen: false,
  qrDataUrl: ''
})
const isOpen = ref(false)
</script>
<style scoped>

</style>