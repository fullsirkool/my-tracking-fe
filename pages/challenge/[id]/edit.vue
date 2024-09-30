<template>
  <UContainer>
    <h1 class="font-semibold text-2xl text-center my-5">
      {{ $t('edit_challenge') }}
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
              :label="$t('edit_challenge')"
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
              <div class="flex flex-col gap-2">
                <div
                  v-for="(value, index) in state.targets"
                  class="flex gap-2 items-center"
                >
                  <div>
                    <div
                      v-if="index === 0"
                      class="text-gray-700 text-sm font-medium mb-0.5"
                    >
                      {{ $t('distance') }}
                    </div>
                    <UInput
                      v-model="state.targets[index].distance"
                      type="number"
                      :placeholder="$t('distance')"
                      disabled
                    >
                      <template #trailing>
                        <span class="text-gray-400 text-sm">km(s)</span>
                      </template>
                    </UInput>
                  </div>
                  <div>
                    <div
                      v-if="index === 0"
                      class="text-gray-700 text-sm font-medium mb-0.5"
                    >
                      {{ $t('ticket_quantity') }}
                    </div>
                    <UInput
                      v-model="state.targets[index].quantity"
                      type="number"
                      :placeholder="$t('ticket_quantity')"
                    >
                      <template #trailing>
                        <span class="text-gray-400 text-sm">
                          ({{ $t('quantity') }})
                        </span>
                      </template>
                    </UInput>
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
            <!--            <UFormGroup name="pace">-->
            <!--              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">-->
            <!--                <div>-->
            <!--                  <label for="" class="font-medium text-gray-700 text-sm">{{-->
            <!--                    $t('min_pace')-->
            <!--                  }}</label>-->
            <!--                  <div class="flex gap-2 items-center">-->
            <!--                    <CommonMinuteInput-->
            <!--                      v-model="state.minPace"-->
            <!--                      :disabled="!state.enableMinPace"-->
            <!--                    ></CommonMinuteInput>-->
            <!--                    <UCheckbox v-model="state.enableMinPace" />-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <div>-->
            <!--                  <label for="" class="font-medium text-gray-700 text-sm">{{-->
            <!--                    $t('max_pace')-->
            <!--                  }}</label>-->
            <!--                  <div class="flex gap-2 items-center">-->
            <!--                    <CommonMinuteInput-->
            <!--                      v-model="state.maxPace"-->
            <!--                      :disabled="!state.enableMaxPace"-->
            <!--                    ></CommonMinuteInput>-->
            <!--                    <UCheckbox v-model="state.enableMaxPace" />-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </UFormGroup>-->
            <!--            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">-->
            <!--              <UFormGroup-->
            <!--                class="py-2"-->
            <!--                :label="$t('min_distance')"-->
            <!--                name="minDistance"-->
            <!--              >-->
            <!--                <div class="flex gap-2 items-center">-->
            <!--                  <UInput-->
            <!--                    v-model="state.minDistance"-->
            <!--                    name="input"-->
            <!--                    placeholder="Min Distance"-->
            <!--                    :disabled="!state.enableMinDistance"-->
            <!--                  >-->
            <!--                    <template #trailing>-->
            <!--                      <span class="text-gray-400 text-sm">km(s)</span>-->
            <!--                    </template>-->
            <!--                  </UInput>-->
            <!--                  <UCheckbox v-model="state.enableMinDistance" />-->
            <!--                </div>-->
            <!--              </UFormGroup>-->

            <!--              <UFormGroup-->
            <!--                class="py-2"-->
            <!--                :label="$t('max_distance')"-->
            <!--                name="maxDistance"-->
            <!--              >-->
            <!--                <div class="flex gap-2 items-center">-->
            <!--                  <UInput-->
            <!--                    v-model="state.maxDistance"-->
            <!--                    name="input"-->
            <!--                    placeholder="Max Distance"-->
            <!--                    :disabled="!state.enableMaxDistance"-->
            <!--                  >-->
            <!--                    <template #trailing>-->
            <!--                      <span class="text-gray-400 text-sm">km(s)</span>-->
            <!--                    </template>-->
            <!--                  </UInput>-->
            <!--                  <UCheckbox v-model="state.enableMaxDistance" />-->
            <!--                </div>-->
            <!--              </UFormGroup>-->
            <!--            </div>-->
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
                :default-image="state.defaultFileUrl"
              />
            </UFormGroup>
          </div>
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

        <div class="flex items-center justify-center mt-10 gap-4">
          <UButton
            :label="$t('edit_challenge')"
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
import type {
  ChallengeDetailDto,
  UpdateChallengeDto,
} from '~/types/dto/challenge.dto'
import { FileType } from '~/types/enum/file.enum'
import { ChallengeType } from '~/types/enum/challenge.enum'
import { type DeleteChallengeDto } from '~/types/dto/challenge.dto'

definePageMeta({
  middleware: ['authentication'],
})
type TagetType = { id: number; distance: number; quantity: number }
const { t } = useI18n()
const toast = useToast()
const dayjs = useDayjs()

const { params } = useRoute()
const { id } = params

const { data } = await useAsyncData('challenge', async () => {
  return challengeRepository.findOne(+id)
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


const state = ref({
  id: 0,
  title: '',
  ticketPrice: 0,
  startDate: new Date(),
  endDate: new Date(),
  targets: [{ id: 0, distance: 0, quantity: 0 }],
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
  defaultFileUrl: '',
  description: '',
  challengeType: ChallengeType.OFFLINE,
})

const stateMapping = (value: ChallengeDetailDto) => {
  state.value.id = value.id
  state.value.title = value.title
  state.value.ticketPrice = value.ticketPrice
  state.value.location = value.location
  state.value.startDate = new Date(value.startDate)
  state.value.endDate = new Date(value.endDate)
  state.value.description = value.description
  state.value.challengeType = value.challengeType
  state.value.defaultFileUrl = value.image
  state.value.targets = value.challengeDistances.map((item) => ({
    id: item.id,
    quantity: item.defaultQuantity,
    distance: item.distance / 1000,
  }))
}

const init = () => {
  console.log('data', data.value)
  if (data.value) {
    stateMapping(data.value)
  }
}

init()

const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format('HH:mm, DD MMMM YYYY')
})
const endDateLabel = computed(() => {
  return dayjs(state.value.endDate).format('HH:mm, DD MMMM YYYY')
})

const textEditor = ref<any>(null)

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
  // if (!state.file) {
  //   errors.push({path: 'file', message: t('required_warning')})
  // }
  if (state.file && state.file?.size > 20971520) {
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
  console.log('submit', event)
  const image = await uploadImgage()
  state.value.description = textEditor.value.editor.getHTML()
  const {
    id,
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

  const payload: UpdateChallengeDto = {
    id,
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
      id: item.id,
      distance: item.distance * 1000,
      quantity: +item.quantity,
    }))
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

  const { data, error } = await challengeRepository.updateChallenge({
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

const handleDeleteChallenge = async () => {
  const payload: DeleteChallengeDto = { id: +id }
  const { data, error } = await challengeRepository.delete(payload)
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

  toast.add({
    id: 'copy-challenge',
    icon: 'i-heroicons-exclamation-circle',
    color: 'green',
    timeout: 4000,
    title: t('deleted_successfully'),
  })

  navigateTo('/challenge')
}
</script>
