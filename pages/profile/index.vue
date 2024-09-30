<template>
  <div></div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';
definePageMeta({
  middleware: ['authentication'],
})

const userStore = useUserStore()

console.log('userStore.user', userStore.user)
if (userStore.user?.id) {
  navigateTo('/profile/' + userStore.user.id)
} else {
  navigateTo('/')
}
</script>
