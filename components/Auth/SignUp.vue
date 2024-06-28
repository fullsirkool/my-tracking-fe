<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/logo.png" class="mx-auto h-20 w-auto"/>
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Sign Up
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup name="email" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6"
            >Email address</label
          >
        </template>
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          placeholder="Email"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6"
            >Password</label
          >
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
          <label class="text-md font-medium text-gray-900 leading-6"
            >Confirm Password</label
          >
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
      <div class="flex items-center gap-4">
        <UFormGroup name="firstName" size="lg">
          <template #label>
            <label class="text-md font-medium text-gray-900 leading-6"
              >First Name</label
            >
          </template>
          <UInput
            v-model="state.firstName"
            icon="i-heroicons-user"
            placeholder="First Name"
          />
        </UFormGroup>
        <UFormGroup name="lastName" size="lg">
          <template #label>
            <label class="text-md font-medium text-gray-900 leading-6"
              >Last Name</label
            >
          </template>
          <UInput
            v-model="state.lastName"
            icon="i-heroicons-user"
            placeholder="Last Name"
          />
        </UFormGroup>
      </div>
      <UFormGroup name="sex" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6"
            >Gender</label
          >
        </template>
        <USelect v-model="state.sex" :options="genderOptions">
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
        >Submit
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

const genderOptions = ref(['Male', 'Female', 'Other'])
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .required('Required')
    .min(8, 'Must be at least 8 characters')
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    ),
  confirmPassword: string()
    .required('Confirm Password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.parent.password
    }),
  firstName: string().required('Fist name is required'),
  lastName: string().required('Last name is required'),
  sex: string().required('Last name is required').oneOf(genderOptions.value),
})

type Schema = InferType<typeof schema>
const state = ref({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  sex: '',
})

const isShowPassword = ref(false)
const isShowConfirmPassword = ref(false)
const isLoading = ref(false)

const onSubmit = async (event: FormSubmitEvent<any>) => {
  // Do something with data
  console.log(event.data)
  const { email, password, firstName, lastName, sex } = event.data

  const { data, error } = await authRepository.signUp({
    email,
    password,
    firstName,
    lastName,
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
