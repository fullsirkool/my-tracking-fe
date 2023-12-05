<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
         alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
      account</h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup name="email" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">Email address</label>
        </template>
        <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="Email"/>
      </UFormGroup>

      <UFormGroup label="Password" name="password" size="lg">
        <template #label>
          <label class="text-md font-medium text-gray-900 leading-6">Password</label>
        </template>
        <UInput v-model="state.password" icon="i-heroicons-lock-closed" placeholder="Password" :type="isShowPassword ? 'text' : 'password'"  class="custom-input">
          <template #trailing>
            <div @click="isShowPassword = !isShowPassword" class="cursor-pointer">
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

      <UButton type="submit" color="indigo" variant="solid" size="md" :ui="{ rounded: 'rounded-lg' }" block
               :loading="isLoading">Submit
      </UButton>
    </UForm>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free
        trial</a>
    </p>
  </div>
</template>
<script setup lang="ts">
import type {FormError, FormSubmitEvent} from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined
})

const isShowPassword = ref(false)
const isLoading = ref(false)


const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({path: 'email', message: 'Required'})
  if (!state.password) errors.push({path: 'password', message: 'Required'})
  return errors
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  // Do something with data
  console.log(event.data)
}
</script>