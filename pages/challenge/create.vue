<template>
  <UContainer>
    <h1 class="font-semibold text-2xl">{{ $t('create_challenge') }}</h1>
    <CommonStepper v-model="selectedStep" :steps="steps"></CommonStepper>
    <div class="grid grid-cols-12">
      <div class="col-span-2 hidden sm:block"></div>
      <UForm
          :validate="validate"
          :state="state"
          class="col-span-12 sm:col-span-8"
          @submit="submit"
      >
        <div
            v-show="['information', 'review'].includes(selectedStep.key)"
            class="grid grid-cols-12 gap-4"
        >
          <div class="col-span-12 sm:col-span-8">
            <UFormGroup
                class="py-2"
                :label="$t('challenge_title')"
                name="title"
            >
              <UInput
                  v-model="state.title"
                  :disabled="selectedStep.key === 'review'"
              />
            </UFormGroup>
            <UFormGroup class="py-2" :label="$t('target')" name="target">
              <UInput
                  v-model="state.target"
                  type="number"
                  :disabled="selectedStep.key === 'review'"
              >
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
              <UInput
                  v-model="state.tiketPrice"
                  type="number"
                  :disabled="selectedStep.key === 'review'"
              >
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
                    <CommonHourInput
                        v-model="state.minPace"
                        :disabled="
                      !state.enableMinPace || selectedStep.key === 'review'
                    "
                    ></CommonHourInput>
                    <UCheckbox
                        v-model="state.enableMinPace"
                        :disabled="selectedStep.key === 'review'"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="font-medium text-gray-700 text-sm">{{
                      $t('max_pace')
                    }}</label>
                  <div class="flex gap-2 items-center">
                    <CommonHourInput
                        v-model="state.maxPace"
                        :disabled="
                      !state.enableMaxPace || selectedStep.key === 'review'
                    "
                    ></CommonHourInput>
                    <UCheckbox
                        v-model="state.enableMaxPace"
                        :disabled="selectedStep.key === 'review'"
                    />
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
                      :disabled="
                    !state.enableMinDistance || selectedStep.key === 'review'
                  "
                  >
                    <template #trailing>
                      <span class="text-gray-400 text-sm">km(s)</span>
                    </template>
                  </UInput>
                  <UCheckbox
                      v-model="state.enableMinDistance"
                      :disabled="selectedStep.key === 'review'"
                  />
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
                      :disabled="
                    !state.enableMaxDistance || selectedStep.key === 'review'
                  "
                  >
                    <template #trailing>
                      <span class="text-gray-400 text-sm">km(s)</span>
                    </template>
                  </UInput>
                  <UCheckbox
                      v-model="state.enableMaxDistance"
                      :disabled="selectedStep.key === 'review'"
                  />
                </div>
              </UFormGroup>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup class="py-2" :label="$t('start_at')" name="startDate">
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton
                      variant="outline"
                      icon="i-heroicons-calendar-days-20-solid"
                      :label="startDateLabel"
                      :disabled="selectedStep.key === 'review'"
                  />
                  <template #panel="{ close }">
                    <CommonDatePicker v-model="state.startDate" @close="close">
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
              <UFormGroup class="py-2" :label="$t('end_at')" name="endDate">
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton
                      variant="outline"
                      icon="i-heroicons-calendar-days-20-solid"
                      :label="endDateLabel"
                      :disabled="selectedStep.key === 'review'"
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
              <UTextarea
                  v-model="state.description"
                  autoresize
                  :maxrows="5"
                  placeholder="Search..."
              />
            </UFormGroup>
          </div>
          <div class="col-span-12 sm:col-span-4">
            <UFormGroup class="py-2" :label="$t('image_upload')" name="file">
              <!-- <input type="file" @change="(e) => handleSelectFile(e)" :disabled="selectedStep.key === 'review'" /> -->
              <CommonFileUpload
                  v-model="state.file"
                  :disabled="selectedStep.key === 'review'"
              ></CommonFileUpload>
            </UFormGroup>
          </div>

        </div>

        <div class="flex items-center justify-center mt-10 gap-4">
          <UButton
              v-show="selectedStep.key !== 'information'"
              :label="$t('back')"
              size="xl"
              variant="solid"
              @click="handleBackStep"
          >
          </UButton>
          <UButton
              v-show="selectedStep.key !== 'review'"
              :label="$t('next')"
              size="xl"
              variant="solid"
              @click="handleNextStep"
          >
          </UButton>
          <UButton
              v-show="selectedStep.key === 'review'"
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
import type {FormError, FormSubmitEvent} from '@nuxt/ui/dist/runtime/types'
import challengeRepository from '~/repository/challenge.repository'
import fileRepository from '~/repository/file.repository'
import {CreateChallengeDto} from '~/types/dto/challenge.dto'
import {ChallengeStatus, ChallengeType} from '~/types/enum/challenge.enum'
import {FileType} from "~/types/enum/file.enum";

definePageMeta({
  middleware: ['authentication'],
})

const { t } = useI18n()

const steps = ref([
  {key: 'information', title: t('information')},
  {key: 'review', title: t('review')},
])
const selectedStep = ref({key: 'information', title: 'Information'})

const dayjs = useDayjs()

const getStates = computed(() => Object.values(ChallengeStatus))
const getTypes = computed(() => Object.values(ChallengeType))
const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format('ddd, MMM DD, YYYY')
})
const endDateLabel = computed(() => {
  return dayjs(state.value.endDate).format('ddd, MMM DD, YYYY')
})

const state = ref({
  title: '',
  tiketPrice: 0,
  startDate: new Date(),
  endDate: new Date(),
  target: 0,
  minPace: '04:00',
  maxPace: '15:00',
  enableMinPace: true,
  enableMaxPace: true,
  minDistance: '',
  maxDistance: '',
  enableMinDistance: true,
  enableMaxDistance: true,
  file: undefined,
  description: '',
})

const validate = (state: any): FormError[] => {
  console.log('validate', state)
  const errors = []
  if (!state.title) {
    errors.push({path: 'title', message: 'Required'})
  }

  if (!state.startDate) {
    errors.push({path: 'startDate', message: 'Required'})
  }

  if (!state.endDate) {
    errors.push({path: 'endDate', message: 'Required'})
  }
  if (!state.file) {
    errors.push({path: 'file', message: 'Required'})
  }
  if (state.file.size > 20971520) {
    errors.push({path: 'file', message: 'Image size must less than 20mb'})
  }

  if (!state.target) {
    errors.push({path: 'target', message: 'Required'})
  }
  if (state.target < 1) {
    errors.push({path: 'target', message: 'Target must greater or equal 1km'})
  }
  if (state.startDate && state.endDate) {
    if (!dayjs(state.endDate).isAfter(state.startDate, 'day')) {
      errors.push({
        path: 'startDate',
        message: 'Start date must before end date',
      })
      errors.push({
        path: 'endDate',
        message: 'End date must after start date',
      })
    }
  }

  if (state.enableMinPace && state.enableMaxPace) {
    const [minHour, minMinute] = state.minPace.split(':')
    const [maxHour, maxMinute] = state.maxPace.split(':')
    const minPaceToMinute = minHour * 60 + minMinute
    const maxPaceToMinute = maxHour * 60 + maxMinute
    if (maxPaceToMinute <= minPaceToMinute) {
      errors.push({
        path: 'pace',
        message: 'Max pace must greater than min pace',
      })
    }
  }

  if (state.enableMinDistance && !state.minDistance) {
    errors.push({path: 'minDistance', message: 'Required'})
  }
  if (state.enableMaxDistance && !state.maxDistance) {
    errors.push({path: 'maxDistance', message: 'Required'})
  }

  if (state.enableMinDistance && state.minDistance < 1) {
    errors.push({
      path: 'minDistance',
      message: 'Min distance must greater than 1km',
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
        message: 'Min distance must less than max distance',
      })
      errors.push({
        path: 'maxDistance',
        message: 'Max distance must greater than min distance',
      })
    }
  }
  return errors
}

const stepIndex = computed(() =>
    steps.value.findIndex((item) => item.key === selectedStep.value.key),
)

const handleBackStep = () => {
  selectedStep.value = steps.value[stepIndex.value - 1]
}

const handleNextStep = () => {
  selectedStep.value = steps.value[+stepIndex.value + 1]
}

const uploadImgage = async () => {
  console.log("uploadImgage", state.value.file)
  if (state.value.file) {
    return await fileRepository.upload(state.value.file, FileType.CHALLENGE_BACKGROUND)
  }
}

const submit = async (event: FormSubmitEvent<any>) => {
  console.log("submit", event)
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
  }

  if (!target) {
    delete payload.target
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

  await challengeRepository.createChallenge(payload)
  navigateTo('/challenge')
}
</script>
