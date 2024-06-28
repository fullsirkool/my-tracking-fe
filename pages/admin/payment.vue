<script setup lang="ts">
import paymentRepository from '~/repository/payment.repository'
import { PaymentDto } from '~/types/dto/payment.dto'

definePageMeta({
  // layout: 'home',
  middleware: ['authentication'],
})

const dayjs = useDayjs()

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
    label: 'Username',
  },
  {
    key: 'challenge.title',
    label: 'Challenge',
  },
  {
    key: 'completedAt',
    label: 'Completed At',
    align: 'center',
  },
  {
    key: 'createdAt',
    label: 'Created At',
  },
  {
    key: 'paymentType',
    label: 'Type',
  },
])

const filter = reactive({
  createdAt: '',
  query: '',
})

const { data } = await paymentRepository.fetchPaymentList({
  page: pagination.page,
  size: pagination.size,
  createdAt: filter.createdAt,
  query: filter.query,
})

if (data) {
  paymentList.value = data.data
  pagination.totalElements = data.totalElement
  pagination.totalPages = data.totalPages
}
</script>

<template>
  <div class="p-5">
    <!-- Filter -->
    <div class="bg-white shadow rounded-xl flex p-2.5 gap-2.5">
      <UInput placeholder="Created At" />
      <UInput v-model="filter.query" placeholder="Search By" />

      <UButton>Filter</UButton>
    </div>

    <!-- Table -->
    <div class="h-5"></div>

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
    // background-color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    // color: rgb(241 245 249 / var(--tw-text-opacity))

    color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    background-color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
  }

  :deep(td) {
    border-color: rgb(241 245 249 / var(--tw-text-opacity));
  }
}
</style>
