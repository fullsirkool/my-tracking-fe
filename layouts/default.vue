<template>
  <div>
    <Header></Header>
    <div class="p-4">
      <slot></slot>
    </div>
    <Footer></Footer>
    <AuthCompleteDialog :is-open="isOpenCompleteModal" @close="isOpenCompleteModal = false"></AuthCompleteDialog>
    <UNotifications/>
  </div>
</template>
<script setup lang="ts">
import {useUserStore} from '../stores/userStore'

const userStore = useUserStore()
const {user} = userStore
console.log('user', user)
const isOpenCompleteModal = ref(false)

if (user && !user.email) {
  isOpenCompleteModal.value = true
}
</script>