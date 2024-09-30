<script setup lang="ts">
import { type PropType } from '#app/compat/capi'
import challengeRepository from '~/repository/challenge.repository'
import type { PagingChallengeDto } from '~/types/dto/challenge.dto'
import type { IAthleteFilter } from '~/types/dto/athletes.dto.js'

const emit = defineEmits(['update:model-value'])

defineProps({
  modelValue: {
    type: Object as PropType<Partial<IAthleteFilter>>,
    default: () => ({
      query: '',
      id: undefined,
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

const filterValue = reactive<Partial<IAthleteFilter>>({
  query: '',
  id: undefined,
})

const isDisableFilter = computed(() => {
  return !filterValue.id
})

const selectedChallengeLabel = computed(() => {
  const found = challengeList.value.find(
    ({ value }) => filterValue.id === value,
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

onMounted(() => {
  fetchChallengeList({})
})

watch(selectedChallengeOption, (newVal) => {
  filterValue.id = undefined;
  fetchChallengeList({ availability: newVal })
})
</script>
<template>
  <div
    class="bg-white shadow rounded-xl flex flex-col md:flex-row md:items-end p-5 md:gap-10 gap-2.5"
  >
    <div class="flex md:block gap-5 items-center">
      <div class="flex gap-4 w-full">
        <div>
          <label class="text-sm font-semibold">
            {{ t('challenge_status') }}
          </label>
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
        <div>
          <label class="text-sm font-semibold">
            {{ t('challenge') }}
          </label>
          <CommonSelect
            v-model="filterValue.id"
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

    <div class="flex-1 flex items-end gap-5 w-100">
      <div class="flex-1">
        <label class="text-sm font-semibold" for="query">
          {{ t('search_by_athlete_name') }}
        </label>
        <UInput
          v-model="filterValue.query"
          :placeholder="$t('name')"
          name="query"
          @keydown="onKeydown"
        />
      </div>
      <UButton :disabled="isDisableFilter" @click="onFilter">
        {{ t('search') }}
      </UButton>
    </div>
  </div>
</template>
