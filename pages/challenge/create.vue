<template>
  <UContainer>
    <h1 class="font-semibold text-2xl">{{ $t('create_challenge') }}</h1>
    <div class="grid grid-cols-12">
      <div class="col-span-2 hidden sm:block"></div>
      <UForm
        :validate="validate"
        :state="state"
        class="col-span-12 sm:col-span-8"
        @submit="submit"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-8">
            <UFormGroup
              class="py-2"
              :label="$t('challenge_title')"
              name="title"
              required
            >
              <UInput v-model="state.title" />
            </UFormGroup>
            <UFormGroup
              class="py-2"
              :label="$t('target')"
              name="target"
              required
            >
              <UInput v-model="state.target" type="number">
                <template #trailing>
                  <span class="text-gray-400 text-sm">km(s)</span>
                </template>
              </UInput>
            </UFormGroup>
            <UFormGroup
              class="py-2"
              :label="$t('ticket_price')"
              name="tiketPrice"
            >
              <UInput v-model="state.ticketPrice" type="number">
                <template #trailing>
                  <span class="text-gray-400 text-sm">VND</span>
                </template>
              </UInput>
            </UFormGroup>
            <UFormGroup name="pace">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div>
                  <label for="" class="font-medium text-gray-700 text-sm">{{
                    $t('min_pace')
                  }}</label>
                  <div class="flex gap-2 items-center">
                    <CommonMinuteInput
                      v-model="state.minPace"
                      :disabled="!state.enableMinPace"
                    ></CommonMinuteInput>
                    <UCheckbox v-model="state.enableMinPace" />
                  </div>
                </div>
                <div>
                  <label for="" class="font-medium text-gray-700 text-sm">{{
                    $t('max_pace')
                  }}</label>
                  <div class="flex gap-2 items-center">
                    <CommonMinuteInput
                      v-model="state.maxPace"
                      :disabled="!state.enableMaxPace"
                    ></CommonMinuteInput>
                    <UCheckbox v-model="state.enableMaxPace" />
                  </div>
                </div>
              </div>
            </UFormGroup>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup
                class="py-2"
                :label="$t('min_distance')"
                name="minDistance"
              >
                <div class="flex gap-2 items-center">
                  <UInput
                    v-model="state.minDistance"
                    name="input"
                    placeholder="Min Distance"
                    :disabled="!state.enableMinDistance"
                  >
                    <template #trailing>
                      <span class="text-gray-400 text-sm">km(s)</span>
                    </template>
                  </UInput>
                  <UCheckbox v-model="state.enableMinDistance" />
                </div>
              </UFormGroup>

              <UFormGroup
                class="py-2"
                :label="$t('max_distance')"
                name="maxDistance"
              >
                <div class="flex gap-2 items-center">
                  <UInput
                    v-model="state.maxDistance"
                    name="input"
                    placeholder="Max Distance"
                    :disabled="!state.enableMaxDistance"
                  >
                    <template #trailing>
                      <span class="text-gray-400 text-sm">km(s)</span>
                    </template>
                  </UInput>
                  <UCheckbox v-model="state.enableMaxDistance" />
                </div>
              </UFormGroup>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup
                class="py-2"
                :label="$t('start_at')"
                name="startDate"
                required
              >
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton
                    variant="outline"
                    icon="i-heroicons-calendar-days-20-solid"
                    :label="startDateLabel"
                  />
                  <template #panel="{ close }">
                    <CommonDatePicker v-model="state.startDate" @close="close">
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
              <UFormGroup
                class="py-2"
                :label="$t('end_at')"
                name="endDate"
                required
              >
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton
                    variant="outline"
                    icon="i-heroicons-calendar-days-20-solid"
                    :label="endDateLabel"
                  />
                  <template #panel="{ close }">
                    <CommonDatePicker v-model="state.endDate" @close="close">
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
            </div>
                        
            <UFormGroup
              class="py-2"
              :label="$t('description')"
              name="tiketPrice"
            >
              <CommonTextEditor v-model="state.description" />
            </UFormGroup>
          </div>
          <div class="col-span-12 sm:col-span-4">
            <UFormGroup
              class="py-2"
              :label="$t('image_upload')"
              name="file"
              required
            >
              <CommonFileUpload v-model="state.file" />
            </UFormGroup>
          </div>
        </div>

        <div class="flex items-center justify-center mt-10 gap-4">
          <UButton
            :label="$t('create_challenge')"
            size="xl"
            type="submit"
            variant="solid"
          >
          </UButton>
        </div>
      </UForm>
      <div class="col-span-2 hidden sm:block"></div>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import challengeRepository from '~/repository/challenge.repository'
import fileRepository from '~/repository/file.repository'
import { CreateChallengeDto } from '~/types/dto/challenge.dto'
import { FileType } from '~/types/enum/file.enum'

definePageMeta({
  middleware: ['authentication'],
})

const { t } = useI18n()
const toast = useToast()

const dayjs = useDayjs()

const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format('ddd, MMM DD, YYYY')
})
const endDateLabel = computed(() => {
  return dayjs(state.value.endDate).format('ddd, MMM DD, YYYY')
})

const state = ref({
  title: '',
  ticketPrice: 0,
  startDate: new Date(),
  endDate: new Date(),
  target: 0,
  minPace: '04:00',
  maxPace: '15:00',
  enableMinPace: false,
  enableMaxPace: false,
  minDistance: '',
  maxDistance: '',
  enableMinDistance: false,
  enableMaxDistance: false,
  file: undefined,
  description: '',
})

const validate = (state: any): FormError[] => {
  console.log('validate', state)
  const errors = []
  if (!state.title) {
    errors.push({ path: 'title', message: t('required_warning') })
  }

  if (!state.startDate) {
    errors.push({ path: 'startDate', message: t('required_warning') })
  }

  if (!state.endDate) {
    errors.push({ path: 'endDate', message: t('required_warning') })
  }
  if (!state.file) {
    errors.push({ path: 'file', message: t('required_warning') })
  }
  if (state.file?.size > 20971520) {
    errors.push({ path: 'file', message: t('image_size_warning') })
  }

  if (!state.target) {
    errors.push({ path: 'target', message: t('required_warning') })
  }
  if (state.target < 1) {
    errors.push({ path: 'target', message: t('target_warning') })
  }
  // if (state.startDate && state.endDate) {
  //   if (!dayjs(state.endDate).isAfter(state.startDate, 'day')) {
  //     errors.push({
  //       path: 'startDate',
  //       message: t('start_date_must_before_end_date'),
  //     })
  //     errors.push({
  //       path: 'endDate',
  //       message: t('end_date_must_after_start_date'),
  //     })
  //   }
  // }

  if (state.enableMinPace && state.enableMaxPace) {
    const [minHour, minMinute] = state.minPace.split(':')
    const [maxHour, maxMinute] = state.maxPace.split(':')
    const minPaceToMinute = minHour * 60 + minMinute
    const maxPaceToMinute = maxHour * 60 + maxMinute
    if (maxPaceToMinute <= minPaceToMinute) {
      errors.push({
        path: 'pace',
        message: t('max_pace_greater_than_min_pace'),
      })
    }
  }

  if (state.enableMinDistance && !state.minDistance) {
    errors.push({ path: 'minDistance', message: t('required_warning') })
  }
  if (state.enableMaxDistance && !state.maxDistance) {
    errors.push({ path: 'maxDistance', message: t('required_warning') })
  }

  if (state.enableMinDistance && state.minDistance < 1) {
    errors.push({
      path: 'minDistance',
      message: t('min_pace_greate_than_1km'),
    })
  }

  if (
    state.enableMinDistance &&
    state.enableMaxDistance &&
    state.minDistance >= 1 &&
    state.minDistance &&
    state.maxDistance
  ) {
    if (+state.minDistance >= +state.maxDistance) {
      errors.push({
        path: 'minDistance',
        message: t('min_distance_less_than_max'),
      })
      errors.push({
        path: 'maxDistance',
        message: t('min_distance_less_than_max'),
      })
    }
  }
  return errors
}

const uploadImgage = async () => {
  console.log('uploadImgage', state.value.file)
  if (state.value.file) {
    return await fileRepository.upload(
      state.value.file,
      FileType.CHALLENGE_BACKGROUND,
    )
  }
}

const submit = async (event: FormSubmitEvent<any>) => {
  console.log('submit', event)
  const image = await uploadImgage()
  const {
    title,
    ticketPrice,
    startDate,
    endDate,
    target,
    minPace,
    maxPace,
    enableMinPace,
    enableMaxPace,
    minDistance,
    maxDistance,
    enableMinDistance,
    enableMaxDistance,
    description,
  } = event.data

  const payload: CreateChallengeDto = {
    title,
    startDate,
    endDate,
    image,
    ticketPrice,
    target,
    minPace,
    maxPace,
    minDistance: minDistance * 1000,
    maxDistance: maxDistance * 1000,
    description,
  }

  if (!target) {
    delete payload.target
  }
  if (!ticketPrice) {
    delete payload.ticketPrice
  }
  if (!enableMinPace) {
    delete payload.minPace
  }
  if (!enableMinPace) {
    delete payload.minPace
  }
  if (!enableMaxPace) {
    delete payload.maxPace
  }
  if (!enableMinDistance) {
    delete payload.minDistance
  }
  if (!enableMaxDistance) {
    delete payload.maxDistance
  }

  const { data, error } = await challengeRepository.createChallenge({
    ...payload,
    ticketPrice: +ticketPrice,
  })
  if (error) {
    console.error(error)
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: error.message,
    })
    return
  }
  navigateTo('/challenge')
}
</script>
