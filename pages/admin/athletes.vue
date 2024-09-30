<script setup lang="ts">
import athleteRepository from '~/repository/athlete.repository'
import type {
  IAthleteFilter,
  IAthleteRecord,
} from '~/types/dto/athletes.dto.js'

definePageMeta({
  middleware: ['authentication'],
})

const dayjs = useDayjs()
const { t } = useI18n()

const pagination = reactive({
  page: 1,
  size: 20,
  totalElements: 1,
  totalPages: 1,
})

const athleteList = ref<IAthleteRecord[]>([])

const columns = ref([
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: t('name'),
  },
  {
    key: 'email',
    label: t('email'),
  },

  {
    key: 'phoneNumber',
    label: t('phone_number'),
  },
  {
    key: 'address',
    label: t('address'),
  },
  {
    key: 'gender',
    label: t('gender'),
  },
  {
    key: 'challengeDistance',
    label: t('distance'),
  },
  {
    key: 'ticketCode',
    label: t('ticket_code'),
  },
  {
    key: 'registedAt',
    label: t('registered_at'),
  },
])

const filter = ref<Partial<IAthleteFilter>>({
  query: '',
  id: undefined,
})

const fetchAtheleList = async () => {
  const { data } = await athleteRepository.fetchAtheleList({
    page: pagination.page,
    size: pagination.size,
    query: filter.value.query?.trim() ?? '',
    id: filter.value.id as number,
  })

  if (data) {
    athleteList.value = data.data
    pagination.totalElements = data.totalElement
    pagination.totalPages = data.totalPages

    console.log('athleteList.value', athleteList.value)
  }
}

const getEmptyTableStyle = computed(() => ({
  icon: 'i-heroicons-circle-stack-20-solid',
  label: t('no_athletes'),
}))

watch(
  () => pagination.page,
  () => fetchAtheleList(),
)

watch(filter, () => fetchAtheleList(), { deep: true })
</script>

<template>
  <div class="md:p-5">
    <AthleteFilter
      :model-value="filter"
      @update:model-value="filter = { ...$event }"
    />

    <div class="h-5"></div>

    <!-- Desktop -->
    <UTable
      :rows="athleteList"
      :columns="columns"
      class="custom-table shadow rounded-xl bg-white hidden md:block"
      :empty-state="getEmptyTableStyle"
    >
      <template #challengeDistance-data="{ row }">
        <div>
          {{ row.challengeDistance.distance / 1000 }}
          <span class="text-xs">km</span>
        </div>
      </template>
      <template #registedAt-data="{ row }">
        <div>
          {{ dayjs(row.registedAt).format('HH:mm DD/MM/YYYY') }}
        </div>
      </template>
      <template #gender-data="{ row }">
        <div v-if="row.gender">{{ $t(row.gender?.toLowerCase()) }}</div>
      </template>
    </UTable>

    <!-- Mobile -->
    <div class="md:hidden block">
      <div
        v-for="item in athleteList"
        :key="item.id"
        class="mb-2.5 border border-slate-200 p-2.5 rounded-xl"
      >
        <div class="flex justify-between">
          <div>
            <div class="font-semibold">
              {{ item.name }}
              <span v-if="item.gender" class="text-sm italic">
                ({{ $t(item.gender?.toLowerCase()) }})
              </span>
              /
              <span class="text-primary-600"> {{ item.ticketCode }} </span>
            </div>
          </div>
          <div class="text-right">
            <div class="font-semibold">
              {{ item.challengeDistance.distance / 1000 }}
              <span class="text-sx">km</span>
            </div>
          </div>
        </div>
        <div class="text-sm italic flex justify-between">
          <span>
            {{ $t('email') }}
          </span>
          <span>
            {{ item.email }}
          </span>
        </div>
        <div class="text-sm italic flex justify-between">
          <span>
            {{ $t('phone_number') }}
          </span>
          <span>
            {{ item.phoneNumber }}
          </span>
        </div>
        <div class="text-sm italic flex justify-between">
          <span>
            {{ $t('address') }}
          </span>
          <span class="block w-1/2 text-right">
            {{ item.address }}
          </span>
        </div>
        <br />
        <div class="text-sm italic flex justify-between">
          <span>
            {{ $t('registered_at') }}
          </span>
          <span>
            {{ $dayjs(item.registedAt).format('HH:mm DD/MM/YYYY') }}
          </span>
        </div>
      </div>
    </div>

    <br />

    <UPagination
      v-model="pagination.page"
      :page-count="pagination.size"
      :total="pagination.totalElements"
      class="justify-end"
    />
  </div>
</template>

<style scoped lang="scss">
.custom-table {
  :deep(th) {
    background-color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
  }

  :deep(td) {
    border-color: rgb(241 245 249 / var(--tw-text-opacity));
  }
}
</style>
