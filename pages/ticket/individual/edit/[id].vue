<script setup lang="ts">
import ticketRepository from '~/repository/ticket.repository'
import { useChallengeStore } from '~/stores/challenge.store'
import { storeToRefs } from 'pinia'
import { Gender, IChallengeIndividualRegisterInfo } from '~/types/dto/challenge.dto'
import { ChallengeType } from '~/types/enum/challenge.enum'
import { email, helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import challengeRepository from '~/repository/challenge.repository'
import { IUpdateTicketInformation, TicketDto } from '~/types/dto/ticket.dto'

const { params } = useRoute()
const { id } = params

definePageMeta({
  middleware: ['authentication'],
})

const { t } = useI18n()
const route = useRoute()
const challengeStore = useChallengeStore()
const toast = useToast()
const dayjs = useDayjs()

const { fetchChallengeDetail } = challengeStore
const { challengeDetail } = storeToRefs(challengeStore)

const emailInputId = 'emailInputId'
const phoneNumberInputId = 'phoneNumberInputId'
const nameInputId = 'nameInputId'
const addressInputId = 'addressInputId'
const distanceInputId = 'distanceInputId'
const genderInputId = 'genderInputId'

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

const form = reactive<Partial<IUpdateTicketInformation>>({
  id: 0,
  email: '',
  phoneNumber: '',
  name: '',
  address: '',
  gender: undefined,
  challengeDistanceId: undefined,
})

const isSubmitting = ref(false)
const isShowPayment = ref(false)
const isExpired = ref(false)

const paymentInfo = ref()

const distanceOptions = computed(() => {
  return (
    challengeDetail.value?.challengeDistances.map((item) => ({
      label: item.distance / 1000 + ' km',
      value: item.id,
    })) ?? []
  )
})

watch(challengeDetail, (newChallengeDetail) => {
  form.challengeDistanceId = newChallengeDetail?.challengeDistances?.[0]?.id
  isExpired.value = dayjs(newChallengeDetail?.endDate).isBefore(dayjs())
})

const distanceLabel = computed(() => {
  const selectedDistance = distanceOptions.value.find(
    ({ value }) => value === form.challengeDistanceId,
  )
  return selectedDistance?.label ?? t('select_distance')
})

const genderLabel = computed(() => {
  const selectedGender = genderOptions.value.find(
    ({ value }) => value === form.gender,
  )
  return selectedGender?.label ?? t('gender')
})

const phoneValidator = (value: string) => {
  const regex = /^(0|\+84)\d{9}$/
  return regex.test(value)
}

const isVirtual = computed(() => {
  return challengeDetail.value?.challengeType === ChallengeType.VIRTUAL
})

const rules = computed(() => {
  return {
    id: {},
    email: {
      email: helpers.withMessage(t('email_format_is_not_right'), email),
    },
    name: {
      required: helpers.withMessage(t('name_is_required_field'), required),
    },
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
    address: isVirtual.value
      ? {
        required: helpers.withMessage(
          t('address_is_required_field'),
          required,
        ),
      }
      : {},
    gender: {},
    challengeDistanceId: {
      required: helpers.withMessage(t('distance_is_required_field'), required),
    },
  }
})

const v$ = useVuelidate(
  rules,
  form as Required<IUpdateTicketInformation>,
)

const onRegister = async () => {
  try {
    isSubmitting.value = true
    const isvalid = await v$.value.$validate()
    if (!isvalid) return
    const { data, error } = await ticketRepository.updateTicketIndividual(
      form
    )

    if (error.value) {
      throw error.value
    }

    // TODO(duc2010): need to recheck status with BE
    if (data.value?.status === 'WAITING' && data.value?.paymentInfo) {
      isShowPayment.value = true
      paymentInfo.value = data.value.paymentInfo
    }

    if (data.value?.status === 'COMPLETED') {
      return navigateTo('/payment-success')
    }
  } catch (error) {
    toast.add({
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 4000,
      title: `${t('register_fail')}. ${t('please_try_again_later')}`,
    })
  } finally {
    isSubmitting.value = false
  }
}

const init = async () => {
  const { data } = await ticketRepository.fetchOneTicketIndividual(+id)
  if (data) {
    await fetchChallengeDetail(data.challengeId)
  }

  formMapping(data)
}

const formMapping = (data: TicketDto) => {
  const {id, email, phoneNumber, name, address, gender, challengeDistanceId} = data
  form.id = id
  form.email = email
  form.phoneNumber = phoneNumber
  form.name = name
  form.address = address
  form.gender = gender
  form.challengeDistanceId = challengeDistanceId
}

const res = await useAsyncData('ticket', () => init())

</script>
<template>
  <div class="flex w-full justify-center items-center">
    <div v-if="isShowPayment">
      <ChallengePayment :payment-info="paymentInfo" />
    </div>
    <div v-else class="md:w-1/2">
      <div
        v-if="isExpired"
        class="text-red-600 text-center italic font-semibold flex items-center justify-center my-5"
      >
        <Icon
          name="mdi:emoticon-sad-outline"
          width="20"
          height="20"
          class="mr-1"
        />
        {{ $t('challenge_is_expired') }}
      </div>
      <div class="text-4xl text-center font-semibold tracking-wide">
        {{ $t('individual_register_form') }}
      </div>
      <div class="py-5">
        <div class="mb-2.5">
          <label
            :for="nameInputId"
            class="text-sm font-semibold inline-block required"
          >
            {{ $t('register_name') }}
          </label>
          <UInput
            v-model="form.name"
            :id="nameInputId"
            :placeholder="$t('register_name')"
          />
          <span
            v-if="v$.name.$error"
            class="text-xs text-red-600 font-semibold"
          >
            {{ v$.name.$errors[0].$message }}
          </span>
        </div>

        <div class="mb-2.5">
          <label :for="emailInputId" class="text-sm font-semibold inline-block">
            {{ $t('email') }}
          </label>
          <UInput
            v-model="form.email"
            :id="emailInputId"
            :placeholder="$t('email')"
          />
          <span
            v-if="v$.email.$error"
            class="text-xs text-red-600 font-semibold"
          >
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>

        <div class="mb-2.5">
          <label
            :for="phoneNumberInputId"
            class="text-sm font-semibold inline-block required"
          >
            {{ $t('phone_number') }}
          </label>
          <UInput
            v-model="form.phoneNumber"
            :id="phoneNumberInputId"
            :placeholder="$t('phone_number')"
          />
          <span
            v-if="v$.phoneNumber.$error"
            class="text-xs text-red-600 font-semibold"
          >
            {{ v$.phoneNumber.$errors[0].$message }}
          </span>
        </div>

        <div class="mb-2.5">
          <label
            :for="addressInputId"
            class="text-sm font-semibold inline-block"
            :class="{
              required: isVirtual,
            }"
          >
            {{ $t('address') }}
          </label>
          <UInput
            v-model="form.address"
            :id="addressInputId"
            :placeholder="$t('address')"
          />
          <span
            v-if="v$.address.$error"
            class="text-xs text-red-600 font-semibold"
          >
            {{ v$.address.$errors[0].$message }}
          </span>
        </div>

        <div
          class="mb-2.5 flex items-center justify-between md:justify-start gap-10"
        >
          <div>
            <label
              :for="distanceInputId"
              class="text-sm font-semibold inline-block required"
            >
              {{ $t('distance') }}
            </label>

            <CommonSelect
              v-model="form.challengeDistanceId"
              :options="distanceOptions"
              class="w-fit"
            >
              <template #trigger>
                <UButton
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                  :label="distanceLabel"
                />
              </template>
            </CommonSelect>
          </div>

          <div>
            <label
              :for="genderInputId"
              class="text-sm font-semibold inline-block"
            >
              {{ $t('gender') }}
            </label>

            <CommonSelect
              v-model="form.gender"
              :options="genderOptions"
              class="w-fit"
            >
              <template #trigger>
                <UButton
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                  :label="genderLabel"
                />
              </template>
            </CommonSelect>
          </div>
        </div>

        <div class="mb-2.5 text-center">
          <UButton
            class="my-5"
            @click="onRegister"
            :loading="isSubmitting"
            :disabled="isExpired"
          >
            {{ $t('save_and_pay') }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>