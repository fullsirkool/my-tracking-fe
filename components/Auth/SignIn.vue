<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup name="email" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">
            Email address
          </label>
        </template>
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          placeholder="Email"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">
            Password
          </label>
        </template>
        <UInput
          v-model="state.password"
          icon="i-heroicons-lock-closed"
          placeholder="Password"
          :type="isShowPassword ? 'text' : 'password'"
          class="custom-input"
        >
          <template #trailing>
            <div
              @click="isShowPassword = !isShowPassword"
              class="cursor-pointer"
            >
              <Icon
                v-show="!isShowPassword"
                name="mdi:eye-outline"
                width="1.5rem"
                height="1.5rem"
                color="#9ca3af"
              />
              <Icon
                v-show="isShowPassword"
                name="mdi:eye-off-outline"
                width="1.5rem"
                height="1.5rem"
                color="#9ca3af"
              />
            </div>
          </template>
        </UInput>
      </UFormGroup>

      <UButton
        type="submit"
        color="indigo"
        variant="solid"
        size="md"
        :ui="{ rounded: 'rounded-lg' }"
        block
        :loading="isLoading"
        >Submit
      </UButton>

      <UDivider label="OR" color="gray" />

      <CommonGoogleConnector :handle-sign-in="handleSignInGoogle" />
      <UButton
        color="black"
        label=""
        icon="i-simple-icons-github"
        block
        disabled
      >
        <Icon name="simple-icons:facebook" width="1.25rem" height="1.25rem" />
        Login with Facebook
      </UButton>
    </UForm>

    <p class="mt-10 text-center text-sm text-gray-500">
      {{ $t('not_a_member') }}
      <NuxtLink
        to="/signup"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        {{ $t('sign_up_now') }}
      </NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import authRepository from '~/repository/auth.repository'
import { useUserStore } from '~/stores/userStore'

const dayjs = useDayjs()
const toast = useToast()
const { setUser } = useUserStore()

const state = reactive({
  email: undefined,
  password: undefined,
})

const isShowPassword = ref(false)
const isLoading = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const accessTokenExpireTime = dayjs(new Date()).add(2, 'day').toDate()
const refreshTokenExpireTime = dayjs(new Date()).add(1, 'week').toDate()
const accessTokenCookie = useCookie('access-token', {
  expires: accessTokenExpireTime,
})
const refreshTokenCookie = useCookie('refresh-token', {
  expires: refreshTokenExpireTime,
})

const tempAuthDto = {
  email: '',
  password: '',
}

const actions = [
  {
    label: 'Resend email',
    click: async () => await handleResendEmail(),
  },
]

const handleResendEmail = async () => {
  const { data, error } = await authRepository.resendEmail(tempAuthDto)
  if (error) {
    const { message } = error
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
      timeout: 5000,
      title: message,
      actions: actions,
    })
    return
  }

  if (data) {
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      title: 'Email has been sent!',
    })
    return
  }
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  // Do something with data
  
  try {
    const { email, password } = event.data
    const { data, error } = await authRepository.signIn({
      email,
      password,
    })
  
    if (error) {
      const { message } = error
      tempAuthDto.email = email
      tempAuthDto.password = password
      toast.add({
        id: 'copy-challenge',
        icon: 'i-heroicons-x-circle-solid',
        color: 'red',
        timeout: 10000,
        title: message,
        actions: actions,
      })
      return
    }
  
    if (data) {
      const { user, accessToken, refreshToken } = data
      accessTokenCookie.value = accessToken
      refreshTokenCookie.value = refreshToken
      setUser(user)
      localStorage.setItem('user-info', JSON.stringify(user))
      navigateTo('/')
      return
    }
  } catch (error) {
    console.error(error)
  }
}

const handleSignInGoogle = async (token: string) => {
  const { data, error } = await authRepository.signInGoogle({
    token,
  })

  if (error) {
    const { message } = error
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
      timeout: 10000,
      title: message,
      actions: actions,
    })
    return
  }

  if (data) {
    const { user, accessToken, refreshToken } = data
    accessTokenCookie.value = accessToken
    refreshTokenCookie.value = refreshToken
    setUser(user)
    localStorage.setItem('user-info', JSON.stringify(user))
    navigateTo('/')
    return
  }
}
</script>
