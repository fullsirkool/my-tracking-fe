<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, email, helpers, minValue } from '@vuelidate/validators'
import challengeRepository from '~/repository/challenge.repository'
import type {
  IChallengeDistanceRegistrationInfo,
  IChallengeGroupRegisterInfo,
} from '~/types/dto/challenge.dto'
import { useChallengeStore } from '~/stores/challenge.store.js'
import { storeToRefs } from 'pinia'
import { ChallengeType } from '~/types/enum/challenge.enum.js'

definePageMeta({
  middleware: ['authentication'],
})
const { t } = useI18n()
const dayjs = useDayjs()
const route = useRoute()
const toast = useToast()
const {type} = route.params

console.log("type", type)
const challengeStore = useChallengeStore()
const { fetchChallengeDetail } = challengeStore
const { challengeDetail } = storeToRefs(challengeStore)
const emailInputId = 'emailInputId'
const phoneNumberInputId = 'phoneNumberInputId'
const nameInputId = 'nameInputId'
const groupNameInputId = 'groupNameInputId'

type DistanceOptionT = IChallengeDistanceRegistrationInfo & {
  label: string
}

const distanceOptions = ref<DistanceOptionT[]>([])

const challengeDistances = computed<IChallengeDistanceRegistrationInfo[]>(() =>
  distanceOptions.value.map((item) => ({
    challengeDistanceId: item.challengeDistanceId,
    numberOfPlayer: item.numberOfPlayer,
  })),
)

const form = reactive<Partial<IChallengeGroupRegisterInfo>>({
  name: '',
  email: '',
  phoneNumber: '',
  groupName: '',
  challengeDistances,
})

const paymentInfo = ref()

const isSubmitting = ref(false)
const isExpired = ref(false)
const isShowPayment = ref(false)

watch(challengeDetail, (newChallenge) => {
  if (newChallenge) {
    distanceOptions.value = newChallenge.challengeDistances.map((item) => ({
      label: item.distance / 1000 + ' km',
      challengeDistanceId: item.id,
      numberOfPlayer: 0,
    }))
    isExpired.value = dayjs(newChallenge.endDate).isBefore(dayjs())
  }
})

const phoneValidator = (value: string) => {
  const regex = /^(0|\+84)\d{9}$/
  return regex.test(value)
}

const rules = computed(() => {
  return {
    email: {
      email: helpers.withMessage(t('email_format_is_not_right'), email),
    },
    name: {
      required: helpers.withMessage(t('name_is_required_field'), required),
    },
    groupName: {
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
    challengeDistances: {
      min: helpers.withMessage(
        t('number_of_player_must_be_at_least_two'),
        (value: IChallengeDistanceRegistrationInfo[]) => {
          const totalAthletes = value.reduce((prev, curr) => {
            return prev + curr.numberOfPlayer
          }, 0)

          return totalAthletes >= 2
        },
      ),
    },
  }
})

const v$ = useVuelidate(rules, form as IChallengeGroupRegisterInfo)

const onUpdateNumberPlayer = (challengeId: number, newValue: number) => {
  const found = distanceOptions.value.find(
    ({ challengeDistanceId }) => challengeDistanceId === challengeId,
  )

  if (newValue < 0) return
  if (Number.isNaN(newValue)) return
  if (found) found.numberOfPlayer = +newValue
  else console.error('fail to update number')
}

const onRegister = async () => {
  try {
    isSubmitting.value = true
    const isvalid = await v$.value.$validate()

    if (!isvalid) {
      console.log('Form is invalid')
      return
    }

    const { data, error } = await challengeRepository.joinChallengeAsGroup({
      ...(form as Required<IChallengeGroupRegisterInfo>),
      challengeId: +route.params.id,
      raceType: `${type}`.toUpperCase()
    })

    if (error.value) {
      throw error.value
    }

    // TODO(duc2010): need to recheck status with BE
    if (data.value?.status === 'WATTING' && data.value?.paymentInfo) {
      isShowPayment.value = true
      paymentInfo.value = data.value.paymentInfo
    }

    if (data.value?.status === 'COMPLETED') {
      return navigateTo('/payment-success')
    }
  } catch (error: any) {
    console.log('error', error)
    toast.add({
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 4000,
      title: error?.data?.message
        ? error.data.message
        : `${t('register_fail')}. ${t('please_try_again_later')}`,
    })
  } finally {
    isSubmitting.value = false
  }
}

const onBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  if (target && Number.isNaN(+target.value)) target.value = '0'
}

fetchChallengeDetail(+route.params.id)
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
        {{ $t('group_register_form') }}
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
          <label
            :for="groupNameInputId"
            class="text-sm font-semibold inline-block"
          >
            {{ $t('group_name') }}
          </label>
          <UInput
            v-model="form.groupName"
            :id="groupNameInputId"
            :placeholder="$t('group_name')"
          />
          <span
            v-if="v$.groupName.$error"
            class="text-xs text-red-600 font-semibold"
          >
            {{ v$.groupName.$errors[0].$message }}
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
          <label class="text-sm font-semibold inline-block mb-2.5 required">
            {{ $t('distance') }}
          </label>
          <div
            v-for="(item, index) in distanceOptions"
            class="flex gap-5 mb-2.5"
          >
            <div class="text-right w-16">
              {{ item.label }}
            </div>

            <UInput
              :model-value="distanceOptions[index].numberOfPlayer"
              :ui="{
                base: 'text-center w-32',
                icon: { trailing: { pointer: '' }, leading: { pointer: '' } },
              }"
              @update:model-value="
                onUpdateNumberPlayer(item.challengeDistanceId, +$event)
              "
              @blur="onBlur"
            >
              <template #leading>
                <UButton
                  color="primary"
                  class="relative top-0 -left-3 px-2 h-full w-full"
                  :padded="false"
                  @click="
                    onUpdateNumberPlayer(
                      item.challengeDistanceId,
                      item.numberOfPlayer - 1,
                    )
                  "
                >
                  <Icon name="mdi:minus"></Icon>
                </UButton>
              </template>
              <template #trailing>
                <UButton
                  color="primary"
                  class="relative top-0 -right-3 px-2 h-full w-full"
                  :padded="false"
                  @click="
                    onUpdateNumberPlayer(
                      item.challengeDistanceId,
                      item.numberOfPlayer + 1,
                    )
                  "
                >
                  <Icon name="mdi:plus"></Icon>
                </UButton>
              </template>
            </UInput>
          </div>
          <div
            v-if="v$.challengeDistances.$error"
            class="text-xs text-red-600 font-semibold"
          >
            {{ v$.challengeDistances.$errors[0].$message }}
          </div>
        </div>

        <div class="mb-2.5 text-center">
          <UButton
            class="my-5"
            :loading="isSubmitting"
            :disabled="isExpired"
            @click="onRegister"
          >
            {{ $t('register') }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
