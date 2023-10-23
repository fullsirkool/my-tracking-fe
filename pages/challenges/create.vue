<template>
  <UContainer>
    <h1 class="font-semibold text-2xl"> Create Challenge</h1>
    <CommonStepper v-model="selectedStep" :steps="steps"></CommonStepper>
    <div class="grid grid-cols-12">
      <div class="col-span-2 hidden sm:block"></div>
      <UForm :validate="validate" :state="state" @submit="submit" class="col-span-12 sm:col-span-8">
        <div v-show="['information', 'review'].includes(selectedStep.key)" class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-8">
            <UFormGroup class="py-2" label="Challenge Title" name="title">
              <UInput v-model="state.title" :disabled="selectedStep.key === 'review'" />
            </UFormGroup>
            <UFormGroup class="py-2" label="Challenge Status" name="status">
              <USelect v-model="state.status" :options="getStates" :disabled="selectedStep.key === 'review'" />
            </UFormGroup>
            <UFormGroup class="py-2" label="Challenge Type" name="challengeType">
              <USelect v-model="state.challengeType" :options="getTypes" :disabled="selectedStep.key === 'review'" />
            </UFormGroup>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup class="py-2" label="Start At" name="startDate">
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton variant="outline" icon="i-heroicons-calendar-days-20-solid" :label="startDateLabel"
                    :disabled="selectedStep.key === 'review'" />
                  <template #panel="{ close }">
                    <CommonDatePicker v-model="state.startDate" @close="close">
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
              <UFormGroup class="py-2" label="End At" name="endDate">
                <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
                  <UButton variant="outline" icon="i-heroicons-calendar-days-20-solid" :label="endDateLabel"
                    :disabled="selectedStep.key === 'review'" />
                  <template #panel="{ close }">
                    <CommonDatePicker v-model="state.endDate" @close="close">
                    </CommonDatePicker>
                  </template>
                </UPopover>
              </UFormGroup>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4">
            <UFormGroup class="py-2" label="Image Upload" name="file">
              <input type="file" @change="(e) => handleSelectFile(e)" :disabled="selectedStep.key === 'review'" />
            </UFormGroup>
          </div>
        </div>
        <div v-show="['rules', 'review'].includes(selectedStep.key)">
          <UFormGroup class="py-2" label="Rule Title" name="ruleTitle">
            <UInput v-model="state.ruleTitle" :disabled="selectedStep.key === 'review'" />
          </UFormGroup>
          <UFormGroup name="pace">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div>
                <label for="" class="font-medium text-gray-700 text-sm">Min Pace</label>
                <div class="flex gap-2 items-center">
                  <CommonHourInput v-model="state.minPace"
                    :disabled="!state.enableMinPace || selectedStep.key === 'review'"></CommonHourInput>
                  <UCheckbox v-model="state.enableMinPace" :disabled="selectedStep.key === 'review'" />
                </div>
              </div>
              <div>
                <label for="" class="font-medium text-gray-700 text-sm">Max Pace</label>
                <div class="flex gap-2 items-center">
                  <CommonHourInput v-model="state.maxPace"
                    :disabled="!state.enableMaxPace || selectedStep.key === 'review'"></CommonHourInput>
                  <UCheckbox v-model="state.enableMaxPace" :disabled="selectedStep.key === 'review'" />
                </div>
              </div>
            </div>
          </UFormGroup>
          <UFormGroup class="py-2" label="" name="distance">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="" class="font-medium text-gray-700 text-sm">Min Distance</label>
                <div class="flex gap-2 items-center">
                  <UInput v-model="state.minDistance" name="input" placeholder="Min Distance"
                    :disabled="!state.enableMinDistance || selectedStep.key === 'review'">
                    <template #trailing>
                      <span class="text-gray-400 text-sm">km(s)</span>
                    </template>
                  </UInput>
                  <UCheckbox v-model="state.enableMinDistance" :disabled="selectedStep.key === 'review'" />
                </div>
              </div>
              <div>
                <label for="" class="font-medium text-gray-700 text-sm">Max Distance</label>
                <div class="flex gap-2 items-center">
                  <UInput v-model="state.maxDistance" name="input" placeholder="Max Distance"
                    :disabled="!state.enableMaxDistance || selectedStep.key === 'review'">
                    <template #trailing>
                      <span class="text-gray-400 text-sm">km(s)</span>
                    </template>
                  </UInput>
                  <UCheckbox v-model="state.enableMaxDistance" :disabled="selectedStep.key === 'review'" />
                </div>
              </div>
            </div>
          </UFormGroup>
        </div>

        <div class="flex items-center justify-center mt-10">

          <UButton v-show="selectedStep.key === 'review'" size="xl" type="submit" variant="solid">
            Submit
          </UButton>
        </div>
      </UForm>
      <div class="col-span-2 hidden sm:block"></div>
    </div>


  </UContainer>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import challengeRepository from '~/repository/challenge.repository';
import fileRepository from '~/repository/file.repository';
import { CreateChallengeDto } from "~/types/dto/challenge.dto";
import { ChallengeStatus, ChallengeType } from '~/types/enum/challenge.enum';
const steps = ref([
  { key: "information", title: "Information" },
  { key: "rules", title: "Rules" },
  { key: "review", title: "Review" },
])
const selectedStep = ref({ key: "information", title: "Information" })

const dayjs = useDayjs()

const tabs = ref([{
  label: 'Challenge',
  slot: 'challenge',
}, {
  label: 'Rules',
  slot: 'rules',
}])

const getStates = computed(() => Object.values(ChallengeStatus))
const getTypes = computed(() => Object.values(ChallengeType))
const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format("ddd, MMM DD, YYYY")
})
const endDateLabel = computed(() => {
  return dayjs(state.value.endDate).format("ddd, MMM DD, YYYY")
})

const state = ref({
  title: '',
  status: getStates.value[0],
  challengeType: getTypes.value[0],
  startDate: new Date(),
  endDate: new Date(),
  ruleTitle: '',
  minPace: "04:00",
  maxPace: "15:00",
  enableMinPace: true,
  enableMaxPace: true,
  minDistance: "",
  maxDistance: "",
  enableMinDistance: true,
  enableMaxDistance: true,
  file: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.title) {
    errors.push({ path: 'title', message: 'Required' })
  }
  if (!state.status) {
    errors.push({ path: 'status', message: 'Required' })
  }
  if (!state.challengeType) {
    errors.push({ path: 'challengeType', message: 'Required' })
  }

  if (!state.startDate) {
    errors.push({ path: 'startDate', message: 'Required' })
  }

  if (!state.endDate) {
    errors.push({ path: 'endDate', message: 'Required' })
  }
  if (!state.file) {
    errors.push({ path: 'file', message: 'Required' })
  }

  if (state.startDate && state.endDate) {
    if (!dayjs(state.endDate).isAfter(state.startDate, 'day')) {
      errors.push({ path: 'startDate', message: 'Start date must before end date' })
      errors.push({ path: 'endDate', message: 'End date must after start date' })
    }
  }

  if (state.enableMinPace && state.enableMaxPace) {
    const [minHour, minMinute] = state.minPace.split(':')
    const [maxHour, maxMinute] = state.maxPace.split(':')
    const minPaceToMinute = minHour * 60 + minMinute
    const maxPaceToMinute = maxHour * 60 + maxMinute
    if (maxPaceToMinute <= minPaceToMinute) {
      errors.push({ path: 'pace', message: 'Max pace must greater than min pace' })
    }
  }

  if (state.enableMinDistance && !state.minDistance) {
    errors.push({ path: 'distance', message: 'Required' })
  }
  if (state.enableMaxDistance && !state.maxDistance) {
    errors.push({ path: 'distance', message: 'Required' })
  }


  if (state.enableMinDistance && state.enableMaxDistance && state.minDistance && state.maxDistance) {
    if (+state.minDistance >= +state.maxDistance) {
      errors.push({ path: 'distance', message: 'Max distance must greater than min distance' })
    }
  }
  return errors
}

const handleSelectFile = (event: any) => {
  state.value.file = event.target.files[0]
}

const uploadImgage = async () => {
  if (state.value.file) {
    return await fileRepository.upload(state.value.file)
  }
}

const submit = async (event: FormSubmitEvent<any>) => {
  const image = await uploadImgage()
  // Do something with data
  const {
    title,
    status,
    challengeType,
    startDate,
    endDate,
    ruleTitle,
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
    title, startDate,
    endDate, image, ruleTitle, status,
    challengeType,
    minPace,
    maxPace,
    minDistance: minDistance * 1000,
    maxDistance: maxDistance * 1000,
  }

  if (!ruleTitle) {
    delete payload.ruleTitle
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
}
</script>