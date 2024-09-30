<script setup lang="ts">
import { type PropType } from '#app/compat/capi'
import DatePicker from '~/components/Common/DatePicker.vue'
import challengeRepository from '~/repository/challenge.repository'
import type { Challenge, PagingChallengeDto } from '~/types/dto/challenge.dto'

export type FilterValueType = {
  query: string
  createdDate?: Date
  challengeId?: number
}

const emit = defineEmits(['update:model-value'])

defineProps({
  modelValue: {
    type: Object as PropType<FilterValueType>,
    default: () => ({
      query: '',
      challengeId: undefined,
      createdDate: undefined,
    }),
  },
})

const dayjs = useDayjs()
const { t } = useI18n()

const challengeOptionList = ref([
  { label: t('all'), value: '' },
  { label: t('ended'), value: 'ENDED' },
  { label: t('not_ended'), value: 'NOT_ENDED' },
])

const selectedChallengeOption = ref<PagingChallengeDto['availability']>('')

const challengeList = ref<{ label: string; value: number }[]>([])

const filterValue = reactive<FilterValueType>({
  query: '',
  createdDate: undefined,
  challengeId: undefined,
})

const calendarLabel = computed(() => {
  return filterValue.createdDate
    ? dayjs(filterValue.createdDate).format('DD/MM/YYYY')
    : t('all_time')
})

const isDisableFilter = computed(() => {
  return !filterValue.challengeId
})

const selectedChallengeLabel = computed(() => {
  const found = challengeList.value.find(
    ({ value }) => filterValue.challengeId === value,
  )

  if (!found) {
    return t('select_challenge')
  }

  return found?.label
})

const fetchChallengeList = async (params: Partial<PagingChallengeDto>) => {
  const response = await challengeRepository.find({
    page: 1,
    size: 1000,
    availability: params?.availability ?? '',
  })
  challengeList.value =
    response?.data?.map(({ title, id }) => ({ label: title, value: id })) ?? []
}

const onFilter = () => {
  emit('update:model-value', filterValue)
}

const onKeydown = (event: KeyboardEvent) => {
  event.key == 'Enter' && onFilter()
}

const onAllTimeClick = (closeCb: () => void) => {
  filterValue.createdDate = undefined
  closeCb()
}

onMounted(() => {
  fetchChallengeList({})
})

watch(selectedChallengeOption, (newVal) => {
  filterValue.challengeId = undefined
  fetchChallengeList({ availability: newVal })
})
</script>
<template>
  <div
    class="bg-white shadow rounded-xl flex flex-col md:flex-row lg:flex-row flex-wrap lg:items-end p-5 md:gap-y-5 lg:gap-y-5 xl:gap-10 sm:gap-y-5 gap-y-2"
  >
    <div
      class="flex lg:gap-5 items-center md:w-1/2 flex-col md:gap-y-0 md:items-start lg:flex-col lg:gap-y-0 lg:items-start lg:w-1/2 xl:w-auto"
    >
      <label class="text-sm font-semibold">
        {{ t('start_date') }}
      </label>

      <div class="flex items-center gap-5">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="calendarLabel"
          />

          <template #panel="{ close }">
            <DatePicker
              v-model="filterValue.createdDate"
              is-required
              @close="close"
            >
              <template #footer>
                <div class="text-center mb-5 px-2.5">
                  <UButton block @click="onAllTimeClick(close)">
                    {{ t('all_time') }}
                  </UButton>
                </div>
              </template>
            </DatePicker>
          </template>
        </UPopover>
      </div>
    </div>

    <div class="flex w-max gap-5 items-center md:w-1/2 lg:w-1/2 xl:w-auto">
      <div class="flex md:gap-4 w-full md:w-auto md:flex-row">
        <div class="flex-">
          <label class="text-sm font-semibold">
            {{ t('challenge_status') }}
          </label>

          <div class="flex gap-2.5">
            <CommonSelect
              v-model="selectedChallengeOption"
              :options="challengeOptionList"
            >
              <template #trigger>
                <UButton
                  color="white"
                  :label="
                    challengeOptionList.find(
                      ({ value }) => selectedChallengeOption === value,
                    )?.label
                  "
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                />
              </template>
            </CommonSelect>
          </div>
        </div>
        <div class="flex-1">
          <label class="text-sm font-semibold">
            {{ t('challenge') }}
          </label>
          <CommonSelect
            v-model="filterValue.challengeId"
            :options="challengeList"
            :empty-text="$t('no_challenge_available')"
          >
            <template #trigger>
              <UTooltip
                :text="selectedChallengeLabel"
                :popper="{ placement: 'top' }"
              >
                <UButton
                  color="white"
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                >
                  <span class="truncate ... max-w-32">
                    {{ selectedChallengeLabel }}
                  </span>
                </UButton>
              </UTooltip>
            </template>
          </CommonSelect>
        </div>
      </div>
    </div>

    <div class="flex items-end gap-5 w-full xl:flex-1 flex-col sm:flex-row">
      <div class="flex-1 w-full sm:w-auto">
        <label class="text-sm font-semibold" for="query">
          {{ t('search_by_username_payment_code') }}
        </label>
        <UInput
          v-model="filterValue.query"
          :placeholder="$t('username_payment_code')"
          name="query"
          @keydown="onKeydown"
        />
      </div>
      <UButton
        :disabled="isDisableFilter"
        class="w-full sm:w-auto justify-center"
        @click="onFilter"
      >
        {{ t('search') }}
      </UButton>
    </div>
  </div>
</template>
