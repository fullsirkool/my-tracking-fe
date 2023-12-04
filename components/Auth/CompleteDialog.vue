<template>
  <UModal v-model="props.isOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ $t('complete_information') }}
          </h3>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" size="md"/>
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" :type="showPassword ? 'text' : 'password' " size="md" class="custom-input">
            <template #trailing>
              <div @click="showPassword = !showPassword" class="cursor-pointer">
                <Icon
                    v-show="!showPassword"
                    name="mdi:eye-outline"
                    width="1.5rem"
                    height="1.5rem"
                    color="#4b4b4b"
                />
                <Icon
                    v-show="showPassword"
                    name="mdi:eye-off-outline"
                    width="1.5rem"
                    height="1.5rem"
                    color="#4b4b4b"
                />
              </div>
            </template>
          </UInput>
        </UFormGroup>

        <UFormGroup label="Confirm Password" name="confirmPassword">
          <UInput v-model="state.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" size="md"
                  class="custom-input">
            <template #trailing>
              <div @click="showConfirmPassword = !showConfirmPassword" class="cursor-pointer">
                <Icon
                    v-show="!showConfirmPassword"
                    name="mdi:eye-outline"
                    width="1.5rem"
                    height="1.5rem"
                    color="#4b4b4b"

                />
                <Icon
                    v-show="showConfirmPassword"
                    name="mdi:eye-off-outline"
                    width="1.5rem"
                    height="1.5rem"
                    color="#4b4b4b"
                />
              </div>
            </template>
          </UInput>
        </UFormGroup>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
      <Placeholder class="h-32"/>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
import {object, string, type InferType} from 'yup'
import type {FormError, FormSubmitEvent} from '@nuxt/ui/dist/runtime/types'
import authRepository from "~/repository/auth.repository";
import {useUserStore} from "~/stores/userStore";

interface ICompleteDialogProps {
  isOpen: Boolean
}

const props = withDefaults(defineProps<ICompleteDialogProps>(), {})
const emit = defineEmits(['close'])

const userStore = useUserStore()
const {setUser} = userStore
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
      .required('Required')
      .min(8, 'Must be at least 8 characters')
      .matches(
          passwordRegex,
          'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      ),
  confirmPassword: string().required('Confirm Password is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return value === this.parent.password;
      }),
})

type Schema = InferType<typeof schema>

const isOpen = ref(true)
const state = ref({
  email: '',
  password: '',
  confirmPassword: ''
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) {
    errors.push({path: 'email', message: 'Required'})
  }
  if (!state.password) {
    errors.push({path: 'password', message: 'Required'})
  }
  if (!state.confirmPassword) {
    errors.push({path: 'confirmPassword', message: 'Required'})
  }

  if (state.password && state.confirmPassword) {
    if (state.password !== state.confirmPassword) {
      errors.push({path: 'password', message: 'Password do not match'})
      errors.push({path: 'confirmPassword', message: 'Password do not match'})
    }
  }
  return errors
}

const onSubmit = async (event: FormSubmitEvent<any>) => {
  console.log(event.data)
  const {email, password} = event.data

  const user = await authRepository.complete({email, password})
  if (user) {
    setUser(user)
    localStorage.setItem('user-info', JSON.stringify(user))
    emit('close')
  }
}
</script>
<style>
</style>