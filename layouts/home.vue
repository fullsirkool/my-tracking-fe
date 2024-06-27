<template>
  <div>
    <Header></Header>
    <div class="relative">
      <img src="~/assets/bg.jpg" class="home-background" />
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
import { useUserStore } from '../stores/user.store'
import { useAdminStore } from '~/stores/admin.store'
const userStore = useUserStore()
const adminStore = useAdminStore()
// const { user } = userStore

const isOpenCompleteModal = ref(false)

// TODO(An): check if it is needed
// if (user && !user.email) {
//   isOpenCompleteModal.value = true
// }

const user = computed(() => userStore.user || adminStore.user)

watch(user, (newValue) => console.log('User updated:', newValue), {
  immediate: true,
})
</script>
<style>
.home-background {
  width: 100%;
  height: 100%;
  max-height: 650px;
  position: absolute;
  overflow: hidden;
  background-image: url('~/assets/bg.jpg');
  background-size: cover;
  background-color: rgb(255, 255, 255);
  background-position: center center;
  opacity: 0.3;
  filter: blur(8px);
  -webkit-mask: linear-gradient(rgb(255, 255, 255), transparent);
}
</style>../stores/user.store
