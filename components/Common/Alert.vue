<script setup lang="ts">
import { useAlertStore } from '~/stores/alert.store'

const alertStore = useAlertStore()
</script>

<template>
  <div>
    <UModal v-model="alertStore.isOpen">
      <div class="w-100">
        <div class="pt-5 pb-2.5 px-5 flex justify-between font-bold">
          {{ alertStore.title }}
        </div>
        <div class="px-5 pb-5">
          <div v-html="alertStore.message"></div>
        </div>
      </div>
    </UModal>
  </div>
</template>
