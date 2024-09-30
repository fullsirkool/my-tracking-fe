<template>
  <UContainer>
    <h1 class="font-semibold text-2xl text-center my-5">
      {{ $t('create_challenge') }}
    </h1>
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
            <UFormGroup class="py-2" name="target" required>
              <div class="flex flex-col gap-2">
                <div
                  v-for="(value, index) in state.targets"
                  class="flex gap-2 items-center"
                >
                  <div>
                    <div v-if="index === 0" class="text-gray-700 text-sm font-medium mb-0.5">{{ $t('distance') }}</div>
                    <UInput
                      v-model="state.targets[index].distance"
                      type="number"
                      :placeholder="$t('distance')"
                    >
                      <template #trailing>
                        <span class="text-gray-400 text-sm">km(s)</span>
                      </template>
                    </UInput>
                  </div>
                  <div>
                    <div v-if="index === 0" class="text-gray-700 text-sm font-medium mb-0.5">{{ $t('ticket_quantity') }}</div>
                    <UInput
                      v-model="state.targets[index].quantity"
                      type="number"
                      :placeholder="$t('ticket_quantity')"
                    />
                  </div>
                  <div class="self-end mb-0.5">
                    <UButton
                      icon="i-heroicons-plus"
                      size="2xs"
                      color="primary"
                      square
                      variant="outline"
                      @click="handleAddTarget(index)"
                    />
                  </div>
                  <div v-if="index != 0" class="self-end mb-0.5">
                    <UButton
                      icon="i-heroicons-trash"
                      size="2xs"
                      color="primary"
                      square
                      variant="outline"
                      @click="handleRemoveTarget(index)"
                    />
                  </div>
                </div>
              </div>
            </UFormGroup>
            <UFormGroup class="py-2" :label="$t('location')" name="location">
              <UInput v-model="state.location" />
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
            <UFormGroup
              class="py-2"
              :label="$t('challenge_type')"
              name="challengeType"
            >
              <URadioGroup
                v-model="state.challengeType"
                :options="challengeTypeOptions"
              />
            </UFormGroup>

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
              <CommonTextEditor
                ref="textEditor"
                :model-value="state.description"
              />
            </UFormGroup>
          </div>
          <div class="col-span-12 sm:col-span-4">
            <UFormGroup
              class="py-2"
              :label="$t('image_upload')"
              name="file"
              required
            >
              <CommonFileUpload
                v-model="state.file"
                :warning-message="$t('upload_image_warning')"
                :width="327"
                :height="184"
              />
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
import challengeRepository from '~/repository/challenge.repository'
import fileRepository from '~/repository/file.repository'
import { type CreateChallengeDto } from '~/types/dto/challenge.dto'
import { FileType } from '~/types/enum/file.enum'
import { ChallengeType } from '../../types/enum/challenge.enum'
import { validation } from '~/utils/validation'

type TagetType = { distance: number; quantity: number }

definePageMeta({
  middleware: ['authentication'],
})

const { t } = useI18n()
const toast = useToast()

const dayjs = useDayjs()

const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format('HH:mm, DD MMMM YYYY')
})
const endDateLabel = computed(() => {
  return dayjs(state.value.endDate).format('HH:mm, DD MMMM YYYY')
})

const textEditor = ref<any>(null)

const state = ref({
  title: '',
  ticketPrice: 0,
  startDate: new Date(),
  endDate: new Date(),
  targets: [{ distance: 0, quantity: 0 }],
  location: '',
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
  challengeType: ChallengeType.OFFLINE,
})

const challengeTypeOptions = ref([
  {
    value: ChallengeType.OFFLINE,
    label: t('offline'),
  },
  {
    value: ChallengeType.VIRTUAL,
    label: t('virtual'),
  },
  {
    value: ChallengeType.BOTH,
    label: t('challenge_type_both'),
  },
])

const validate = (state: any) => {
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

  if (!state.targets) {
    errors.push({ path: 'target', message: t('required_warning') })
  }

  if (state.targets) {
    const newSet = new Set(
      state.targets.map((item: TagetType) => item.distance),
    )
    const isInvalidDistance = state.targets.some(
      (item: TagetType) => !item.distance,
    )
    const isInvalidQuantity = state.targets.some(
      (item: TagetType) => !item.quantity,
    )
    const isDuplicated = newSet.size !== state.targets.length
    if (isInvalidDistance) {
      errors.push({ path: 'target', message: t('invalid_distance') })
    }
    if (isInvalidQuantity) {
      errors.push({ path: 'target', message: t('invalid_quantity') })
    }
    if (isDuplicated) {
      errors.push({ path: 'target', message: t('distance_is_duplicated') })
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

const submit = async (event: any) => {
  const image = await uploadImgage()
  state.value.description = textEditor.value.editor.getHTML()
  const {
    title,
    ticketPrice,
    startDate,
    endDate,
    targets,
    minPace,
    maxPace,
    enableMinPace,
    enableMaxPace,
    minDistance,
    maxDistance,
    enableMinDistance,
    enableMaxDistance,
    description,
    location,
    challengeType,
  } = event.data

  const payload: CreateChallengeDto = {
    title,
    startDate,
    endDate,
    image,
    ticketPrice,
    targets,
    minPace,
    maxPace,
    minDistance: minDistance * 1000,
    maxDistance: maxDistance * 1000,
    description,
    location,
    challengeType,
  }

  if (!targets) {
    delete payload.targets
  } else {
    payload.targets = payload.targets?.map((item) => ({
      distance: item.distance * 1000,
      quantity: +item.quantity,
    }))
  }
  if (!ticketPrice) {
    delete payload.ticketPrice
  }
  if (!challengeType) {
    delete payload.challengeType
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

const handleAddTarget = (index: number) => {
  state.value.targets.splice(index + 1, 0, { distance: 0, quantity: 0 })
}

const handleRemoveTarget = (index: number) => {
  state.value.targets.splice(index, 1)
}
</script>
