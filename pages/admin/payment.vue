<script setup lang="ts">
import paymentRepository from '~/repository/payment.repository'
import { PaymentDto } from '~/types/dto/payment.dto'
import DatePicker from '~/components/Common/DatePicker.vue'

definePageMeta({
  // layout: 'home',
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

const paymentList = ref<PaymentDto[]>([])

const columns = ref([
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'user.name',
    label: t('username'),
  },
  {
    key: 'challenge.title',
    label: t('challenge'),
  },
  {
    key: 'completedAt',
    label: t('completed_at'),
    align: 'center',
  },
  {
    key: 'createdAt',
    label: t('created_at'),
  },
  {
    key: 'paymentType',
    label: t('type'),
  },
  {
    key: 'amount',
    label: t('amount'),
  },
])

const filter = reactive({
  createdDate: new Date(),
  query: '',
})

const isFilterByCreatedDateEnabled = ref(false)

const onFilter = async () => {
  const { data } = await paymentRepository.fetchPaymentList({
    page: pagination.page,
    size: pagination.size,
    createdAt: isFilterByCreatedDateEnabled.value
      ? dayjs(filter.createdDate).toISOString()
      : '',
    query: filter.query,
  })

  if (data) {
    paymentList.value = data.data
    pagination.totalElements = data.totalElement
    pagination.totalPages = data.totalPages
  }
}

const onKeydown = (event: KeyboardEvent) => {
  event.key == 'Enter' && onFilter()
}

const onDateChange = (event: Date) => {
  filter.createdDate = event
}

await onFilter()
</script>

<template>
  <div class="p-5">
    <!-- Filter -->
    <div class="bg-white shadow rounded-xl flex items-end p-5 gap-5">
      <div>
        <label class="text-sm inline-flex gap-2.5" for="createdDate">
          <UCheckbox v-model="isFilterByCreatedDateEnabled" />
          {{ $t('created_date') }}
        </label>

        <div class="flex items-center gap-5">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="dayjs(filter.createdDate).format('DD/MM/YYYY')"
              :disabled="!isFilterByCreatedDateEnabled"
            />

            <template #panel="{ close }">
              <DatePicker
                :model-value="filter.createdDate"
                is-required
                @update:model-value="onDateChange"
                @close="close"
              />
            </template>
          </UPopover>
        </div>
      </div>

      <div class="flex-1">
        <label class="text-sm" for="query">{{ $t('search_by_keyword') }}</label>
        <UInput
          v-model="filter.query"
          placeholder="Keyword"
          name="query"
          @keydown="onKeydown"
        />
      </div>

      <UButton @click="onFilter">{{ $t('search') }}</UButton>
    </div>

    <div class="h-5"></div>

    <!-- Table -->
    <UTable
      :rows="paymentList"
      :columns="columns"
      class="custom-table shadow rounded-xl bg-white"
    >
      <template #createdAt-data="{ row }">
        <div>
          {{ dayjs(row.createdAt).format('HH:mm DD-MM-YYYY') }}
        </div>
      </template>
      <template #completedAt-data="{ row }">
        <div>
          {{ dayjs(row.completedAt).format('HH:mm DD-MM-YYYY') }}
        </div>
      </template>
    </UTable>
  </div>
</template>

<style scoped lang="scss">
.custom-table {
  :deep(th) {
    color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    background-color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
  }

  :deep(td) {
    border-color: rgb(241 245 249 / var(--tw-text-opacity));
  }
}
</style>
