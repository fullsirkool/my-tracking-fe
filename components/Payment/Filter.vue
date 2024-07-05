<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi'
import DatePicker from '~/components/Common/DatePicker.vue'
import challengeRepository from '~/repository/challenge.repository'
import { Challenge, PagingChallengeDto } from '~/types/dto/challenge.dto'

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
  { label: t('completed'), value: 'ENDED' },
  { label: t('uncompleted'), value: 'NOT_ENDED' },
])

const selectedChallengeOption = ref<PagingChallengeDto['availibility']>('')

const challengeList = ref<{ label: string; value: number }[]>([])
// const selectedChallenge = ref<Challenge>()

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

const fetchChallengeList = async (params: Partial<PagingChallengeDto>) => {
  const response = await challengeRepository.find({
    page: 1,
    size: 1000,
    availibility: params?.availibility ?? '',
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
  fetchChallengeList({ availibility: newVal })
})
</script>
<template>
  <div
    class="bg-white shadow rounded-xl flex flex-col md:flex-row md:items-end p-5 gap-10"
  >
    <div class="flex md:block gap-5 items-center">
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

    <div class="flex md:block gap-5 items-center">
      <label class="text-sm font-semibold">
        {{ t('challenge') }}
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

        <CommonSelect
          v-model="filterValue.challengeId"
          :options="challengeList"
        >
          <template #trigger>
            <UButton
              color="white"
              :label="
                challengeList.find(
                  ({ value }) => filterValue.challengeId === value,
                )?.label ?? t('select_challenge')
              "
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </template>
        </CommonSelect>
      </div>
    </div>

    <div class="flex-1 flex items-end gap-5 w-100">
      <div class="flex-1">
        <label class="text-sm font-semibold" for="query">
          {{ t('search_by_keyword') }}
        </label>
        <UInput
          v-model="filterValue.query"
          placeholder="Keyword"
          name="query"
          @keydown="onKeydown"
        />
      </div>
      <UButton @click="onFilter"> {{ t('search') }} </UButton>
    </div>
  </div>
</template>
