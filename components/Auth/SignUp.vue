<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/logo.png" class="mx-auto h-20 w-auto" />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      {{ $t('sign_up') }}
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup name="email" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">{{
            $t('email_address')
          }}</label>
        </template>
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          placeholder="Email"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">{{
            $t('password')
          }}</label>
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
      <UFormGroup label="Confirm Password" name="confirmPassword" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">{{
            $t('confirm_password')
          }}</label>
        </template>
        <UInput
          v-model="state.confirmPassword"
          icon="i-heroicons-lock-closed-20-solid"
          placeholder="Confirm Password"
          :type="isShowConfirmPassword ? 'text' : 'password'"
          class="custom-input"
        >
          <template #trailing>
            <div
              class="cursor-pointer"
              @click="isShowConfirmPassword = !isShowConfirmPassword"
            >
              <Icon
                v-show="!isShowConfirmPassword"
                name="mdi:eye-outline"
                width="1.5rem"
                height="1.5rem"
                color="#9ca3af"
              />
              <Icon
                v-show="isShowConfirmPassword"
                name="mdi:eye-off-outline"
                width="1.5rem"
                height="1.5rem"
                color="#9ca3af"
              />
            </div>
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup name="name" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">{{
            $t('name')
          }}</label>
        </template>
        <UInput
          v-model="state.name"
          icon="i-heroicons-user"
          placeholder="Name"
        />
      </UFormGroup>
      <UFormGroup name="sex" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">{{
            $t('gender')
          }}</label>
        </template>
        <USelect
          v-model="state.sex"
          :options="genderOptions"
          option-attribute="name"
        >
          <template #leading>
            <Icon
              name="ph:gender-intersex-light"
              width="1.5rem"
              height="1.5rem"
              color="#9ca3af"
            />
          </template>
        </USelect>
      </UFormGroup>

      <UButton
        type="submit"
        color="indigo"
        variant="solid"
        size="md"
        :ui="{ rounded: 'rounded-lg' }"
        block
        :loading="isLoading"
        >{{ $t('sign_up') }}
      </UButton>
    </UForm>

    <p class="mt-10 text-center text-sm text-gray-500">
      <NuxtLink
        to="/signin"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        {{ $t('sign_in_now') }}
      </NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import authRepository from '~/repository/auth.repository'

const toast = useToast()
const { t } = useI18n()

const genderOptions = ref([
  {
    name: t('male'),
    value: 'Male',
  },
  {
    name: t('female'),
    value: 'Female',
  },
  {
    name: t('other'),
    value: 'Other',
  },
])
const schema = object({
  email: string().email(t('invalid_email')).required(t('required_warning')),
  password: string()
    .required(t('required_warning'))
    .min(8, t('password_at_least_8')),
  confirmPassword: string()
    .required(t('required_warning'))
    .test('passwords-match', t('password_doesnt_match'), function (value) {
      return value === this.parent.password
    }),
  name: string().required(t('required_warning')),
  sex: string()
    .required(t('required_warning'))
    .oneOf(genderOptions.value.map((item) => item.value)),
})

type Schema = InferType<typeof schema>
const state = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  sex: '',
})

const isShowPassword = ref(false)
const isShowConfirmPassword = ref(false)
const isLoading = ref(false)

const onSubmit = async (event: FormSubmitEvent<any>) => {
  // Do something with data
  const { email, password, name, sex } = event.data

  const { data, error } = await authRepository.signUp({
    email,
    password,
    name,
    sex,
  })

  if (error) {
    const { message } = error
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-x-circle-solid',
      color: 'red',
      timeout: 5000,
      title: message,
    })
    return
  }

  if (data) {
    const { success } = data
    if (success) {
      toast.add({
        id: 'copy-challenge',
        icon: 'i-heroicons-check-circle',
        timeout: 5000,
        title: t('sign_up_successfully'),
      })
      setTimeout(() => {
        navigateTo('/signin')
      }, 3000)
    }
  }
}
</script>
