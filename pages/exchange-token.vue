<template>
  <div class="text-center">
    <h1 class="text-8xl text-cyan-700">{{ title }}</h1>
  </div>
</template>
<script setup>
import authRepository from '~/repository/auth.repository'
import { useUserStore } from '~/stores/user.store'
const dayjs = useDayjs()
const userStore = useUserStore()
const toast = useToast()
const { query } = useRoute()
const { code } = query

const actions = [
  {
    label: 'Back to profile',
    click: () => navigateTo('/profile'),
  },
]

const exchangeToken = async () => {
  const { data, error } = await authRepository.connectStrava(code)
  if (error) {
    const { message } = error
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
      timeout: 30000,
      title: message,
      actions,
    })
    return
  }
  await userStore.fetchUserInfo()
  const savedPath = localStorage.getItem('saved-path')
  if (!savedPath) {
    navigateTo('/challenge')
  }
  navigateTo(savedPath)
}

exchangeToken()

const title = ref('Connecting!')
</script>
<style></style>
