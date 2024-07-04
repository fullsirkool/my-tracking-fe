<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { InferType } from 'yup';
import DatePicker from '~/components/Common/DatePicker.vue'
import challengeRepository from '~/repository/challenge.repository';
import { Challenge } from '~/types/dto/challenge.dto';

type FilterValueType = {
  query: string,
  createdDate: string | undefined,
  challengeId: ComputedRef<number | undefined>
}

const emit = defineEmits(['update:model-value'])

defineProps({
  modelValue: {
    type: Object as PropType<FilterValueType>,
    default: () => ({
      query: '',
      challengeId: undefined,
      createdDate: undefined
    })
  }
})

const dayjs = useDayjs()
const { t } = useI18n()
const challengeOptions = reactive({
  isCompleted: true,
  isNotCompleted: true,
})


const challengeList = ref<Challenge[]>([])
const selectedChallenge = ref<Challenge>()

const filterValue = reactive<FilterValueType>({
  query: '',
  createdDate: undefined,
  challengeId: computed(() => selectedChallenge.value ? selectedChallenge.value.id : undefined),
})

const calendarLabel = computed(() => {
  return filterValue.createdDate
    ? dayjs(filterValue.createdDate).format('DD/MM/YYYY')
    : t('all_time')
})

const challengeLabel = computed(() => {
  return selectedChallenge.value ? selectedChallenge.value.title : t('select_challenge')
})

const fetchChallengeList = async () => {
  const response = await challengeRepository.find({ page: 1, size: 1000 })
  console.log(response)
  challengeList.value = response?.data ?? []
}

const onFilter = () => {
  emit('update:model-value', filterValue)
}

const onKeydown = (event: KeyboardEvent) => {
  event.key == 'Enter' && onFilter()
}

const onAllTimeClick = () => {
  filterValue.createdDate = undefined
  close()
}

watch([() => challengeOptions.isCompleted, () => challengeOptions.isNotCompleted], ([newIsCompleted, newIsNotCompleted]) => {
  fetchChallengeList()
})

onMounted(() => {
  fetchChallengeList()
})

</script>
<template>
  <div class="bg-white shadow rounded-xl flex flex-col md:flex-row md:items-end p-5 gap-5">
    <div class="flex md:block gap-5 items-center">
      <label class="text-sm font-semibold">
        {{ t('start_date') }}
      </label>

      <div class="flex items-center gap-5">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid" :label="calendarLabel" />

          <template #panel="{ close }">
            <DatePicker v-model="filterValue.createdDate" is-required @close="close">
              <template #footer>
                <div class="text-center mb-5 px-2.5">
                  <UButton block @click="onAllTimeClick">
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

      <div>
        <UPopover>
          <UButton color="white" :label="challengeLabel" trailing-icon="i-heroicons-chevron-down-20-solid" />

          <template #panel>
            <div class="p-4 flex justify-between gap-5">
              <UCheckbox v-model="challengeOptions.isNotCompleted" name="not-completed" :label="t('uncompleted')"
                :disabled="!challengeOptions.isCompleted" />
              <UCheckbox v-model="challengeOptions.isCompleted" name="completed" :label="t('completed')"
                :disabled="!challengeOptions.isNotCompleted" />
            </div>
            <UDivider />
            <div class="p-4 max-h-48 overflow-y-auto">
              <div v-for="item in challengeList" :key="item.id"
                class="-mx-2.5 px-2.5 py-1 text-sm cursor-pointer hover:bg-primary-100 flex w-100 justify-between items-center rounded gap-5 group"
                :class="{ 'bg-primary-50': filterValue.challengeId === item.id }" @click="selectedChallenge = item">
                <div>
                  <div>
                    {{ item.title }}
                  </div>
                  <div class="caption-bottom text-xs">
                    {{ dayjs(item.startDate).format('DD/MM/YYYY') }}
                  </div>
                </div>
                <div>
                  <UIcon v-if="filterValue.challengeId === item.id" name="i-heroicons-check-20-solid" />
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>

    <div class="flex-1 flex items-end gap-5 w-100">
      <div class="flex-1">
        <label class="text-sm font-semibold" for="query">
          {{ t('search_by_keyword') }}
        </label>
        <UInput v-model="filterValue.query" placeholder="Keyword" name="query" @keydown="onKeydown" />
      </div>
      <UButton @click="onFilter"> {{ t('search') }} </UButton>
    </div>
  </div>
</template>
