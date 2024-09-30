<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/logo.png" class="mx-auto h-20 w-auto" />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      {{ $t('signin_admin') }}
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <UForm
      :validate="validate"
      :state="formState"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup name="username" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">
            {{ $t('username') }}
          </label>
        </template>
        <UInput
          v-model="formState.username"
          icon="i-heroicons-envelope"
          placeholder="Username"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">
            {{ $t('password') }}
          </label>
        </template>
        <UInput
          v-model="formState.password"
          :type="isShowPassword ? 'text' : 'password'"
          icon="i-heroicons-lock-closed"
          placeholder="Password"
          class="custom-input"
          autocomplete="off"
        >
          <template #trailing>
            <div
              class="cursor-pointer"
              @click="isShowPassword = !isShowPassword"
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
        class="bg-primary-600 hover:bg-primary-700"
        block
        :loading="isLoading"
      >
        {{ $t('sign_in') }}
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'
import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

const toast = useToast()
const adminStore = useAdminStore()
const userStore = useUserStore()

const accessTokenCookie = useCookie('x-access-token', {
  maxAge: 60 * 60 * 24 * 2
})
const refreshTokenCookie = useCookie('x-refresh-token', {
  maxAge: 60 * 60 * 24 * 7
})

const isShowPassword = ref(false)
const isLoading = ref(false)
const formState = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  try {
    const response = await adminStore.login(formState)

    if (!response.data && response.error) {
      toast.add({
        title: 'Error',
        color: 'red',
        description: 'Invalid username or password',
        timeout: 2000
      })
      return
    }
    
    accessTokenCookie.value = response.data?.accessToken
    refreshTokenCookie.value = response.data?.refreshToken
    
    userStore.logout()
    toast.add({
      title: 'Success',
      color: 'green',
      description: 'Login successful',
      timeout: 2000
    })
    navigateTo("/")
  } catch (error: any) {
    console.error(error)
  }
}

const validate = (state: any): FormError[] => {
  const errors = []
  if (!formState.username) {
    errors.push({ path: 'username', message: 'Required' })
  }
  if (!formState.password) {
    errors.push({ path: 'password', message: 'Required' })
  }
  return errors
}
</script>
