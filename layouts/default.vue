<template>
  <div>
    <Header></Header>
    <div class="p-4">
      <slot></slot>
    </div>
    <Footer></Footer>
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/userStore'
const userStore = useUserStore()
const {user} = userStore
console.log('user', user)
</script>