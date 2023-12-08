<template>
  <div class="text-center">
    <h1 class="text-cyan-700">{{ title }}</h1>
  </div>
</template>
<script setup>
import authRepository from '~/repository/auth.repository'
import { useUserStore } from '~/stores/userStore'
definePageMeta({
  layout: 'empty',
})
const dayjs = useDayjs()
const userStore = useUserStore()
const { setUser } = userStore

const { query } = useRoute()
const { code } = query

const accessTokenExpireTime = dayjs(new Date()).add(2, 'day').toDate()
const refreshTokenExpireTime = dayjs(new Date()).add(1, 'year').toDate()
const accessTokenCookie = useCookie('access-token', {
  expires: accessTokenExpireTime,
})
const refreshTokenCookie = useCookie('refresh-token', {
  expires: refreshTokenExpireTime,
})

const exchangeToken = async () => {
  const data = await authRepository.signIn(code)
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
