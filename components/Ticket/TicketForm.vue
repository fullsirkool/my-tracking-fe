<script setup lang="ts">
import type {
  ITicketInfo,
  ITicketRegistrationInfo,
} from '~/types/dto/ticket.dto.js'
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import type { ChallengeDetailDto } from '~/types/dto/challenge.dto.js'
import ticketRepository from '~/repository/ticket.repository'
import { ChallengeType } from '~/types/enum/challenge.enum'

type TicketChallengeInfo = Omit<ChallengeDetailDto, 'userActivities' | 'rule'>

const emit = defineEmits(['success'])
const props = defineProps<TicketChallengeInfo & Partial<ITicketInfo>>()

const { t } = useI18n()
const route = useRoute()
const toast = useToast()

const nameInputId = 'nameInputId'
const emailInputId = 'emailInputId'
const phoneNumberInputId = 'phoneNumberInputId'
const addressInputId = 'addressInputId'
const challengeDistanceInputId = 'challengeDistanceInputId'
const genderInputId = 'genderInputId'

const challengeDistanceOptions = computed(() => {
  return props.challengeDistances.map((item) => ({
    label: item.distance / 1000 + ' km',
    value: item.id,
  }))
})

const genderOptions = ref([
  {
    label: t('male'),
    value: 'MALE',
  },
  {
    label: t('female'),
    value: 'FEMALE',
  },
  {
    label: t('other'),
    value: 'OTHER',
  },
])

const challengeDistanceLabel = computed(() => {
  const selectedDistance = challengeDistanceOptions.value.find(
    (item) => form.challengeDistanceId === item.value,
  )
  return selectedDistance?.label ?? 'Chọn cự ly'
})

const genderLabel = computed(() => {
  const selectedGender = genderOptions.value.find(
    ({ value }) => value === form.gender,
  )
  return selectedGender?.label ?? t('gender')
})

const isSubmitting = ref(false)
const isReadonly = computed(() => props.isCompleted)
const ticketRaceType = computed(() => {
  console.log('props.raceType', props.raceType)
  return props.raceType
})

const phoneValidator = (value: string) => {
  const regex = /^(0|\+84)\d{9}$/
  return regex.test(value)
}

const form = reactive<Partial<ITicketRegistrationInfo>>({
  challengeDistanceId: undefined,
  email: '',
  name: '',
  phoneNumber: '',
  ticketCode: '',
  address: '',
  gender: undefined,
})

const validationSchemaOffline = {
  email: {
    email: helpers.withMessage(t('email_format_is_not_right'), email),
  },
  name: {
    required: helpers.withMessage(t('name_is_required_field'), required),
  },
  address: {},
  phoneNumber: {
    required: helpers.withMessage(
      t('phone_number_is_required_field'),
      required,
    ),
    phoneValidator: helpers.withMessage(
      t('phone_number_format_is_not_right'),
      phoneValidator,
    ),
  },
  ticketCode: {
    required: helpers.withMessage(t('ticket_code_is_required_field'), required),
  },
  challengeDistanceId: {
    required: helpers.withMessage(t('distance_is_required_field'), required),
  },
  gender: {},
}

const validationSchemaOnline = {
  ...validationSchemaOffline,
  address: {
    required: helpers.withMessage(t('address_is_required_field'), required),
  },
}

form.ticketCode = route.params.code as string

const isVirtual = computed(() => {
  return props.raceType === ChallengeType.VIRTUAL
})

const rules = computed(() => {
  return isVirtual.value ? validationSchemaOnline : validationSchemaOffline
})

const v$ = useVuelidate(rules, form as Required<ITicketRegistrationInfo>)

const onCompleteRegistration = async () => {
  isSubmitting.value = true
  try {
    const isValid = await v$.value.$validate()
    if (!isValid) return
    console.log('form', form)
    const response = await ticketRepository.completeRegistrationByTicket(
      form as ITicketRegistrationInfo,
    )

    emit('success')

    toast.add({
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 4000,
      title: t('registration_success'),
    })
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  Object.assign(form, {
    name: props.name,
    phoneNumber: props.phoneNumber,
    challengeDistanceId: props.challengeDistanceId,
    email: props.email,
  })
})

watch(
  () => props,
  (newProps) => {
    Object.assign(form, {
      name: newProps.name,
      phoneNumber: newProps.phoneNumber,
      challengeDistanceId: newProps.challengeDistanceId,
      email: newProps.email,
    })
  },
  { deep: true },
)
</script>

<template>
  <div>
    <div class="flex items-center mb-7">
      <label class="w-32">
        {{ $t('ticket_code') }}
      </label>
      <div class="flex-1 relative">
        <UInput
          :model-value="form.ticketCode"
          readonly
          disabled
          aria-required
        />
      </div>
    </div>

    <div class="flex items-center mb-7">
      <label class="w-32" :for="emailInputId">
        {{ $t('email') }}
      </label>
      <div class="flex-1 relative">
        <UInput
          v-model="form.email"
          :id="emailInputId"
          :readonly="isReadonly"
          aria-required
        />
        <span
          v-if="v$.email.$error"
          class="absolute text-xs text-red-600 font-semibold"
        >
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>
    </div>
    <div class="flex items-center mb-7">
      <label class="required w-32" :for="nameInputId"> {{ $t('name') }} </label>
      <div class="flex-1 relative">
        <UInput
          v-model="form.name"
          :id="nameInputId"
          :readonly="isReadonly"
          aria-required
        />
        <span
          v-if="v$.name.$error"
          class="absolute text-xs text-red-600 font-semibold"
        >
          {{ v$.name.$errors[0].$message }}
        </span>
      </div>
    </div>
    <div class="flex items-center mb-7">
      <label class="required w-32" :for="phoneNumberInputId">
        {{ $t('phone_number') }}
      </label>
      <div class="flex-1 relative">
        <UInput
          v-model="form.phoneNumber"
          :id="phoneNumberInputId"
          :readonly="isReadonly"
          aria-required
        />
        <span
          v-if="v$.phoneNumber.$error"
          class="absolute text-xs text-red-600 font-semibold"
        >
          {{ v$.phoneNumber.$errors[0].$message }}
        </span>
      </div>
    </div>
    <div class="flex items-center mb-7">
      <label
        class="w-32"
        :for="addressInputId"
        :class="{ required: ticketRaceType === 'VIRTUAL' }"
      >
        {{ $t('address') }}
      </label>
      <div class="flex-1 relative">
        <UInput
          v-model="form.address"
          :id="addressInputId"
          :readonly="isReadonly"
          aria-required
          :class="{'required' : ticketRaceType === 'VIRTUAL'}"
        />
        <span
          v-if="v$.address.$error"
          class="absolute text-xs text-red-600 font-semibold"
        >
          {{ v$.address.$errors[0].$message }}
        </span>
      </div>
    </div>

    <div class="flex items-center mb-5">
      <label class="w-32" :for="challengeDistanceInputId">
        {{ $t('distance') }}
      </label>

      <CommonSelect
        v-model="form.challengeDistanceId"
        :options="challengeDistanceOptions"
        disabled
      >
        <template #trigger>
          <UButton variant="outline" class="shadow" :disabled="isReadonly">
            {{ challengeDistanceLabel }}
          </UButton>
        </template>
        <template #error v-if="v$.challengeDistanceId.$error">
          <span
            class="absolute top-full w-max text-xs text-red-600 font-semibold"
          >
            {{ v$.challengeDistanceId.$errors[0].$message }}
          </span>
        </template>
      </CommonSelect>
    </div>

    <div class="flex items-center mb-5">
      <label class="w-32" :for="genderInputId">
        {{ $t('gender') }}
      </label>

      <CommonSelect
        v-model="form.gender"
        :options="genderOptions"
        :disabled="isReadonly"
      >
        <template #trigger>
          <UButton variant="outline" class="shadow" :disabled="isReadonly">
            {{ genderLabel }}
          </UButton>
        </template>
        <template #error v-if="v$.gender.$error">
          <span
            class="absolute top-full w-max text-xs text-red-600 font-semibold"
          >
            {{ v$.gender.$errors[0].$message }}
          </span>
        </template>
      </CommonSelect>
    </div>

    <div v-if="!isReadonly" class="flex justify-center mt-10">
      <UButton
        class="shadow"
        :loading="isSubmitting"
        @click="onCompleteRegistration"
      >
        {{ $t('complete_registration') }}
      </UButton>
    </div>
  </div>
</template>
