<template>
  <div>
    <UModal :model-value="isOpen" @close="handleClose">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div>
          <div class="p-4">
            <h1 v-if="!readonly" class="text-2xl font-semibold text-center">
              {{ $t('manual_create_tracklog') }}
            </h1>
            <h1 v-else class="text-2xl font-semibold text-center">
              {{ $t('tracklog_detail') }}
            </h1>
          </div>

          <div style="max-height: 500px; overflow: auto" class="px-4">
            <UFormGroup :label="$t('distance')" name="distance" class="p-2">
              <UInput
                v-model="state.distance"
                :disabled="readonly"
                type="number"
                step="0.01"
              >
                <template #trailing>
                  <span class="text-gray-400 text-sm">km(s)</span>
                </template>
              </UInput>
            </UFormGroup>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
              <UFormGroup :label="$t('total_moving_time')" name="movingTime">
                <CommonHourInput
                  v-model="state.movingTime"
                  :disabled="readonly"
                ></CommonHourInput>
              </UFormGroup>
              <UFormGroup :label="$t('run_date')" name="startDate">
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton
                    variant="outline"
                    icon="i-heroicons-calendar-days-20-solid"
                    :label="startDateLabel"
                    :color="getButtonColor"
                    :disabled="readonly"
                  />
                  <template #panel="{ close }">
                    <CommonDatePicker
                      v-model="state.startDate"
                      :max-date="new Date()"
                      @close="close"
                    >
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
            </div>
            <div class="col-span-12 sm:col-span-4 p-2">
              <UFormGroup class="py-2" :label="$t('image_upload')" name="file">
                <!-- <input type="file" @change="(e) => handleSelectFile(e)" :disabled="selectedStep.key === 'review'" /> -->
                <CommonFileUpload
                  v-model="state.file"
                  :height="500"
                  :default-image="state.file"
                  :readonly="readonly"
                ></CommonFileUpload>
              </UFormGroup>
            </div>
          </div>
          <div v-if="!readonly" class="p-4">
            <UButton type="submit">
              {{ $t('submit') }}
            </UButton>
          </div>
        </div>
      </UForm>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { date, type InferType, mixed, number, object, string } from 'yup'
import dayjs from 'dayjs'
import fileRepository from '~/repository/file.repository'
import { FileType } from '~/types/enum/file.enum'
import activityRepository from '~/repository/activity.repository'
import { ActivityDetail } from '~/types/dto/activity.dto'

const { t } = useI18n()
const toast = useToast()
const emit = defineEmits(['complete', 'close'])

interface IActivityDetailCardProps {
  activity?: ActivityDetail
  readonly: boolean
  isOpen: boolean
}

const props = withDefaults(defineProps<IActivityDetailCardProps>(), {
  readonly: false,
  isOpen: false,
})

const schema = object({
  distance: string()
    .required(t('required_warning')).matches(/^\d+(?:[.,]\d+)?$/, t('number_field_required')),
  movingTime: string().required(t('required_warning')),
  startDate: date().required(t('required_warning')),
  file: mixed(),
})

type Schema = InferType<typeof schema>

const state = ref({
  distance: 0,
  movingTime: '00:00:00',
  startDate: new Date(),
  file: undefined,
})

const uploadImgage = async (file: File) => {
  if (file) {
    return await fileRepository.upload(file, FileType.TRACKLOG_EVIDENT)
  }
  return null
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  // Do something with event.data
  console.log(event.data)
  const { distance, startDate, movingTime, file } = event.data
  const imageUrl = await uploadImgage(file)
  const distanceDisplay = distance.replaceAll(',', '.')
  const payload = {
    distance: Number(distanceDisplay) * 1000,
    startDate: startDate.toISOString(),
    movingTime,
    imageUrl,
  }
  const res = await activityRepository.manualCreate(payload)
  if (res) {
    emit('complete')
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 4000,
      title: t('create_tracklog_success'),
    })
  }
}

const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format('ddd, MMM DD, YYYY')
})

const getButtonColor = computed(() =>
  props.readonly ? 'white-400' : 'primary',
)

const resetForm = () => {
  state.value = {
    distance: 0,
    movingTime: '00:00:00',
    startDate: new Date(),
    file: undefined,
  }
}

const handleClose = () => {
  emit('close')
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      if (props.activity) {
        const { distance, movingTime, startDate, imageUrl } = props.activity
        const hour = Math.floor(movingTime / 3600)
        const minute = Math.floor((movingTime - hour * 3600) / 60)
        const second = movingTime - hour * 3600 - minute * 60
        const movingTimeStr = `${hour}:${minute}:${second}`
        state.value = {
          distance: (distance / 1000).toFixed(1),
          movingTime: movingTimeStr,
          startDate: new Date(startDate),
          file: imageUrl,
        }
      }
    } else {
      resetForm()
    }
  },
)
</script>
