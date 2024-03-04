<template>
  <div class="text-center">
    <h1 class="text-cyan-700">{{ title }}</h1>
  </div>
</template>
<script setup>
import authRepository from '~/repository/auth.repository'
import { useUserStore } from '~/stores/userStore'
const dayjs = useDayjs()
const userStore = useUserStore()
const { setUser } = userStore
const toast = useToast()
const { query } = useRoute()
const { code } = query

const accessTokenExpireTime = dayjs(new Date()).add(2, 'day').toDate()
const refreshTokenExpireTime = dayjs(new Date()).add(1, 'week').toDate()
const accessTokenCookie = useCookie('access-token', {
  expires: accessTokenExpireTime,
})
const refreshTokenCookie = useCookie('refresh-token', {
  expires: refreshTokenExpireTime,
})

const actions = [{
  label: 'Back to profile',
  click: () => navigateTo('/profile')
}]

const exchangeToken = async () => {
  const {data, error} = await authRepository.connectStrava(code)
  if (error) {
    const {message} = error
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-x-circle-solid',
      color: "red",
      timeout: 30000,
      title: message,
      actions: actions
    })
    return
  }
  const { accessToken, refreshToken, user } = data
  accessTokenCookie.value = accessToken
  refreshTokenCookie.value = refreshToken
  setUser(user)
  localStorage.setItem('user-info', JSON.stringify(user))
  const savedPath = localStorage.getItem('saved-path')
  if (!savedPath) {
    navigateTo('/challenge')
  }
  navigateTo(savedPath)
}

exchangeToken()

const title = ref('Thanks for signing. App will be available soon!')
</script>
<style></style>
