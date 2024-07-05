<script setup lang="ts">
import paymentRepository from '~/repository/payment.repository'
import { PaymentDto, type PaymentFilter } from '~/types/dto/payment.dto'

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
    key: 'createdAt',
    label: t('created_at'),
  },

  {
    key: 'amount',
    label: t('amount'),
  },
])

const filter = ref<PaymentFilter>({
  query: '',
  createdDate: undefined,
  challengeId: undefined,
})

const fetchPaymentList = async () => {
  const { data } = await paymentRepository.fetchPaymentList({
    page: pagination.page,
    size: pagination.size,
    createdAt: filter.value.createdDate
      ? dayjs(filter.value.createdDate).toISOString()
      : '',
    query: filter.value.query,
    challengeId: filter.value.challengeId,
  })

  if (data) {
    paymentList.value = data.data
    pagination.totalElements = data.totalElement
    pagination.totalPages = data.totalPages
  }
}

const getEmptyTableStyle = computed(() => ({icon: 'i-heroicons-circle-stack-20-solid', label: t('no_payments')}))

watch(
  () => pagination.page,
  () => fetchPaymentList(),
)

watch(filter, () => fetchPaymentList(), { deep: true })
</script>

<template>
  <div class="p-5">
    <PaymentFilter :model-value="filter" @update:model-value="filter = {...$event}" />

    <div class="h-5"></div>

    <!-- Desktop -->
    <UTable
      :rows="paymentList"
      :columns="columns"
      class="custom-table shadow rounded-xl bg-white hidden md:block"
      :empty-state="getEmptyTableStyle"
    >
      <template #createdAt-data="{ row }">
        <div>
          {{ dayjs(row.createdAt).format('HH:mm DD-MM-YYYY') }}
        </div>
      </template>
      <template #amount-data="{ row }">
        <div>{{ number.format(row.amount) }} đ</div>
      </template>
    </UTable>

    <!-- Mobile -->
    <div class="md:hidden block">
      <div
        v-for="item in paymentList"
        :key="item.id"
        class="mb-2.5 border border-slate-200 p-2.5 rounded-xl"
      >
        <div class="flex justify-between">
          <div>
            <div class="font-semibold">
              {{ item.user.name }}
            </div>
            <div class="text-sm">
              {{ item.challenge.title }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-primary font-semibold">
              {{ number.format(item.amount) }} đ
            </div>
          </div>
        </div>
        <br />
        <div class="text-sm italic flex justify-between">
          <span>
            {{ t('created_at') }}
          </span>
          <span>
            {{ dayjs(item.createdAt).format('HH:mm DD-MM-YYYY') }}
          </span>
        </div>
      </div>
    </div>

    <br />

    <UPagination
      v-model="pagination.page"
      class="justify-end"
      :page-count="pagination.size"
      :total="pagination.totalElements"
    />
  </div>
</template>

<style scoped lang="scss">
.custom-table {
  :deep(th) {
    // color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    // background-color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
    background-color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
  }

  :deep(td) {
    border-color: rgb(241 245 249 / var(--tw-text-opacity));
  }
}
</style>
