<template>
  <div>
    <Header></Header>
    <div class="p-4">
      <slot></slot>
    </div>
    <Footer></Footer>
    <AuthCompleteDialog
      :is-open="isOpenCompleteModal"
      @close="isOpenCompleteModal = false"
    ></AuthCompleteDialog>
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()
const { user } = userStore

const isOpenCompleteModal = ref<boolean>(false)

if (user && !user.email) {
  isOpenCompleteModal.value = true
}
</script>
