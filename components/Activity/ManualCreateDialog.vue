<template>
  <div>
    <UButton @click="isOpen = true">{{ $t('manual_create_tracklog') }}</UButton>
    <UModal v-model="isOpen">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <div>
          <div class="p-4">
            <h1 class="text-2xl font-semibold text-center">{{ $t('manual_create_tracklog') }}</h1>
          </div>

          <div style="max-height: 500px; overflow: auto;" class="px-4">
            <UFormGroup :label="$t('distance')" name="distance" class="p-2">
              <UInput v-model="state.distance">
                <template #trailing>
                  <span class="text-gray-400 text-sm">{{$t('m')}}</span>
                </template>
              </UInput>
            </UFormGroup>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
              <UFormGroup :label="$t('moving_time')" name="movingTime">
                <CommonHourInput v-model="state.movingTime"></CommonHourInput>
              </UFormGroup>
              <UFormGroup :label="$t('start_at')" name="startDate">
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton
                      variant="outline"
                      icon="i-heroicons-calendar-days-20-solid"
                      :label="startDateLabel"
                  />
                  <template #panel="{ close }">
                    <CommonDatePicker v-model="state.startDate" :max-date="new Date()" @close="close">
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
            </div>
            <div class="col-span-12 sm:col-span-4 p-2">
              <UFormGroup class="py-2" :label="$t('image_upload')" name="file">
                <!-- <input type="file" @change="(e) => handleSelectFile(e)" :disabled="selectedStep.key === 'review'" /> -->
                <CommonFileUpload v-model="state.file" :height="500"
                ></CommonFileUpload>
              </UFormGroup>
            </div>
          </div>
          <div class="p-4">
            <UButton type="submit">
              {{$t('submit')}}
            </UButton>
          </div>
        </div>
      </UForm>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import {FormSubmitEvent} from "@nuxt/ui/dist/runtime/types";
import {date, type InferType, mixed, number, object, string} from 'yup'
import dayjs from "dayjs";
import fileRepository from "~/repository/file.repository";
import {FileType} from "~/types/enum/file.enum";
import activityRepository from "~/repository/activity.repository";

const {t} = useI18n()
const toast = useToast()
const emit = defineEmits(['complete'])

const isOpen = ref(false)
const schema = object({
  distance: number().required(t('required_warning')),
  movingTime: string().required(t('required_warning')),
  startDate: date().required(t('required_warning')),
  file: mixed()
})

type Schema = InferType<typeof schema>

const state = ref({
  distance: 0,
  movingTime: '00:00:00',
  startDate: new Date(),
  file: undefined
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
  const {distance, startDate, movingTime, file} = event.data
  const imageUrl = await uploadImgage(file)
  const payload = {
    distance,
    startDate: startDate.toISOString(),
    movingTime,
    imageUrl
  }
  const res = await activityRepository.manualCreate(payload)
  if (res) {
    emit('complete')
    isOpen.value = false
    toast.add({
      id: 'copy-challenge',
      icon: 'i-heroicons-check-circle',
      timeout: 4000,
      title: t('create_tracklog_success'),
    })
  }

}

const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format('ddd, MMM DD, YYYY')
})


</script>