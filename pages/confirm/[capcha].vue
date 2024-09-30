<template>
  <div>
    <div v-if="getError" class="text-center">
      <h1 class="text-primary-700">{{ getError.message }}</h1>
    </div>
    <div v-else class="text-center">
      <div v-if="getUser">
        <h1 class="text-cyan-700">
          Hi {{ `${getUser.name}` }}
        </h1>
        <h2>
          Your account is verified!. You'll be redirect to app in: {{ counter }}
        </h2>
      </div>
    </div>
    <div class="flex items-center justify-center leading-10">
      <nuxt-link to="/">
        <UButton>Home Page</UButton>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import authRepository from '~/repository/auth.repository'

definePageMeta({
  layout: 'empty',
})

const { params } = useRoute()
const { capcha } = params
const counter = ref(20)

const { data } = await useAsyncData('user', () =>
  authRepository.verify(`${capcha}`),
)
const getError = computed(() => {
  if (!data.value) {
    return null
  }
  const { error } = data.value

  return error
})

const getUser = computed(() => {
  if (!data.value) {
    return null
  }
  return data.value.data
})

const setCounter = () => {
  const countDownInterval = setInterval(() => {
    counter.value--
    if (!counter.value) {
      clearInterval(countDownInterval)
      navigateTo('/')
    }
  }, 1000)
}
setCounter()
</script>
