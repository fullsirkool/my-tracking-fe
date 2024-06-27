<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
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
      :state="formState"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup name="username" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">
            Username
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
            Password
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
        class="bg-orange-600 hover:bg-orange-700"
        block
        :loading="isLoading"
      >
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { useAdminStore } from '~/stores/admin.store'
import { useAlertStore } from '~/stores/alert.store'

const dayjs = useDayjs()
const router = useRouter()
const toast = useToast()
const adminStore = useAdminStore()
const alertStore = useAlertStore()
const accessTokenExpireTime = dayjs(new Date()).add(2, 'day').toDate()
const refreshTokenExpireTime = dayjs(new Date()).add(1, 'week').toDate()
const roleExpireTime = dayjs(new Date()).add(1, 'week').toDate()

const accessTokenCookie = useCookie('access-token', {
  expires: accessTokenExpireTime,
})
const refreshTokenCookie = useCookie('refresh-token', {
  expires: refreshTokenExpireTime,
})

const roleCookie = useCookie('role', {
  expires: roleExpireTime,
})

const isShowPassword = ref(false)
const isLoading = ref(false)
const formState = reactive({
  username: '',
  password: '',
})

const onSubmit = async () => {
  try {
    const response = await adminStore.login(formState)

    if (!response.data && response.error) {
      toast.add({
        color: 'red',
        description: 'Invalid username or password',
        timeout: 2000,
      })
      return
    }

    accessTokenCookie.value = response.data?.accessToken
    refreshTokenCookie.value = response.data?.refreshToken
    roleCookie.value = 'admin'

    router.push('/')
    toast.add({
      description: 'Login successful',
      timeout: 2000,
    })
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
