<template>
  <div>
    <UButton label="Create Challenge" variant="solid" @click="isOpen = true" />
    <UModal v-model="isOpen">
      <UForm :validate="validate" :state="state" @submit="submit">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" class="create-challenge-dialog">
          <template #header>
            <h1 class="font-semibold"> Create Challenge</h1>
          </template>
          <div class="h-[350px]">
            <UTabs :items="tabs">
              <template #challenge="{ item }">
                <div>
                  <UFormGroup class="py-2" label="Challenge Title" name="title">
                    <UInput v-model="state.title" />
                  </UFormGroup>
                  <UFormGroup class="py-2" label="Challenge Status" name="status">
                    <USelect v-model="state.status" :options="getStates" />
                  </UFormGroup>
                  <UFormGroup class="py-2" label="Challenge Type" name="type">
                    <USelect v-model="state.type" :options="getTypes" />
                  </UFormGroup>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormGroup class="py-2" label="Start At" name="startDate">
                      <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton variant="outline" icon="i-heroicons-calendar-days-20-solid" :label="startDateLabel" />
                        <template #panel="{ close }">
                          <CommonDatePicker v-model="state.startDate" @close="close">
                          </CommonDatePicker>
                        </template>
                      </UPopover>
                    </UFormGroup>
                    <UFormGroup class="py-2" label="End At" name="endDate">
                      <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton variant="outline" icon="i-heroicons-calendar-days-20-solid" :label="endDateLabel" />
                        <template #panel="{ close }">
                          <CommonDatePicker v-model="state.endDate" @close="close">
                          </CommonDatePicker>
                        </template>
                      </UPopover>
                    </UFormGroup>
                  </div>
                </div>
              </template>
              <template #rules="{ item }">
                <div>
                  <UFormGroup class="py-2" label="Rule Title" name="ruleTitle">
                    <UInput v-model="state.ruleTitle" />
                  </UFormGroup>
                  <UFormGroup name="pace">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                      <div>
                        <label for="" class="font-medium text-gray-700 text-sm">Min Pace</label>
                        <div class="flex gap-2 items-center">
                          <CommonHourInput v-model="state.minPace" :disabled="!state.enableMinPace"></CommonHourInput>
                          <UCheckbox v-model="state.enableMinPace" />
                        </div>
                      </div>
                      <div>
                        <label for="" class="font-medium text-gray-700 text-sm">Max Pace</label>
                        <div class="flex gap-2 items-center">
                          <CommonHourInput v-model="state.maxPace" :disabled="!state.enableMaxPace"></CommonHourInput>
                          <UCheckbox v-model="state.enableMaxPace" />
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
                            :disabled="!state.enableMinDistance">
                            <template #trailing>
                              <span class="text-gray-400 text-sm">km(s)</span>
                            </template>
                          </UInput>
                          <UCheckbox v-model="state.enableMinDistance" />
                        </div>
                      </div>
                      <div>
                        <label for="" class="font-medium text-gray-700 text-sm">Max Distance</label>
                        <div class="flex gap-2 items-center">
                          <UInput v-model="state.maxDistance" name="input" placeholder="Max Distance"
                            :disabled="!state.enableMaxDistance">
                            <template #trailing>
                              <span class="text-gray-400 text-sm">km(s)</span>
                            </template>
                          </UInput>
                          <UCheckbox v-model="state.enableMaxDistance" />
                        </div>
                      </div>
                    </div>
                  </UFormGroup>
                </div>
              </template>
            </UTabs>
          </div>
          <template #footer>
            <UButton type="submit" variant="solid">
              Submit
            </UButton>
          </template>
        </UCard>
      </UForm>

    </UModal>
  </div>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import challengeRepository from '~/repository/challenge.repository';
import { ChallengeUtitlitiesDto } from '~/types/dto/challenge.dto';
;
const dayjs = useDayjs()

const { data } = await useAsyncData<ChallengeUtitlitiesDto | null>(
  'utilities',
  () => challengeRepository.fetchUtilities(),
)

console.log('async data', data.value)

const tabs = ref([{
  label: 'Challenge',
  slot: 'challenge',
}, {
  label: 'Rules',
  slot: 'rules',
}])

const getStates = computed(() => data?.value?.states || [])
const getTypes = computed(() => data?.value?.types || [])
const startDateLabel = computed(() => {
  return dayjs(state.value.startDate).format("ddd, MMM DD, YYYY")
})
const endDateLabel = computed(() => {
  return dayjs(state.value.endDate).format("ddd, MMM DD, YYYY")
})

const state = ref({
  title: '',
  status: getStates.value[0],
  type: getTypes.value[0],
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
})

const isOpen = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.status) {
    errors.push({ path: 'email', message: 'Required' })
  }
  if (!state.type) {
    errors.push({ path: 'type', message: 'Required' })
  }

  if (!state.startDate) {
    errors.push({ path: 'startDate', message: 'Required' })
  }

  if (!state.endDate) {
    errors.push({ path: 'endDate', message: 'Required' })
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
    errors.push({ path: 'minDistance', message: 'Required' })
  }
  if (state.enableMaxDistance && !state.maxDistance) {
    errors.push({ path: 'maxDistance', message: 'Required' })
  }


  if (state.enableMinDistance && state.enableMaxDistance && state.minDistance && state.maxDistance) {
    if (+state.minDistance >= +state.maxDistance) {
      errors.push({ path: 'distance', message: 'Max distance must greater than min distance' })
    }
  }
  return errors
}
async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>
<style scoped></style>