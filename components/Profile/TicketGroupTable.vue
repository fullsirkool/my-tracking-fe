<script setup lang="ts">
import { useTicket } from '~/composable/useTicket'
import { PaymentStatus } from '~/types/dto/payment.dto'

const { t } = useI18n()
const dayjs = useDayjs()
const {
  listGroupTicket,
  groupTicketPaging,
  isLoadingGroupTicket,
  fetchGroupTicket,
} = useTicket()

const paging = ref({
  page: 1,
  size: 20,
  totalPages: 1,
  totalElement: 0,
})

const columns = ref([
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'challenge.title',
    label: t('challenge'),
  },

  {
    key: '_count.challengePlayers',
    label: t('number_of_player'),
  },
  {
    key: 'raceType',
    label: t('challenge_type'),
  },
  {
    key: 'payment.completedAt',
    label: t('completed_at'),
  },
  {
    key: 'payment.status',
    label: t('payment_status'),
  },
  {
    key: 'action',
    label: "",
  },
])

const fetchData = async () => {
  const pagingParam = { page: paging.value.page, size: paging.value.size }
  await fetchGroupTicket(pagingParam)
  const { size, page, totalPages, totalElement } = groupTicketPaging.value
  paging.value.totalPages = totalPages
  paging.value.totalElement = totalElement
}

const getEmptyTableStyle = computed(() => ({
  icon: 'i-heroicons-circle-stack-20-solid',
  label: t('no_tickets'),
}))

const init = () => {
  fetchData()
}

watch(
  () => paging.value.page,
  (newVal) => {
    if (newVal) {
      // individualTicketPaging.value.page = newVal
      fetchData()
    }
  },
)

init()
</script>
<template>
  <div>
    <UTable
      :rows="listGroupTicket"
      :columns="columns"
      class="custom-table shadow rounded-xl bg-white hidden md:block"
      :empty-state="getEmptyTableStyle"
      :loading="isLoadingGroupTicket"
    >
      <template #challenge.title-data="{ row }">
        <ProfileTicketDialog v-if="row.payment.status === PaymentStatus.COMPLETED" :group-id="row.id">
          {{ row.challenge.title }}
        </ProfileTicketDialog>
        <span v-else>{{ row.challenge.title }}</span>
      </template>
      <template #raceType-data="{ row }">
        <div class="text-center">
          {{ $t(row.raceType.toLowerCase()) }}
        </div>
      </template>
      <template #payment.completedAt-data="{ row }">
        <div>
          {{ row.payment.completedAt ? dayjs(row.payment.completedAt).format('HH:mm DD-MM-YYYY') : '-' }}
        </div>
      </template>
      <template #payment.status-data="{ row }">
        <div v-if="row.payment.status === PaymentStatus.PENDING" class="text-center">
          <NuxtLink :to="`/ticket/group/edit/${row.id}`"><UBadge :label="$t('not_paid')" color="red" /></NuxtLink>
        </div>
        <div v-else-if="row.payment.status === PaymentStatus.COMPLETED" class="text-center">
          <UBadge :label="$t('completed')" color="green" />
        </div>
        <div v-else-if="row.payment.status === PaymentStatus.REJECTED" class="text-center">
          <UBadge :label="$t('rejected')" color="red" />
        </div>
        <div v-else>
          <UBadge :label="$t('not_completed')" color="white" />
        </div>
      </template>
      <template #action-data="{ row }">
        <div v-if="row.payment.status === PaymentStatus.PENDING" class="text-center">
          <UButton :label="$t('pay')" :to="`/ticket/group/edit/${row.id}`" color="gray"/>
        </div>
        <div v-else></div>
      </template>
    </UTable>
    <div class="block md:hidden">
      <div v-if="listGroupTicket?.length">
        <div v-for="ticket in listGroupTicket">
          <TicketGroupCard :ticket="ticket"></TicketGroupCard>
        </div>
      </div>
      <div v-else  class="py-8">
        <label><UIcon name="i-heroicons-circle-stack-20-solid"/>{{$t('no_tickets')}}</label>
      </div>
    </div>
    <div v-if="listGroupTicket?.length" class="flex items-center justify-end mt-4">
      <UPagination
        v-model="paging.page"
        :page-count="paging.size"
        :total="paging.totalElement"
        :ui="{
          rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
        }"
      >
      </UPagination>
    </div>
  </div>
</template>
<style scoped lang="scss">
.custom-table {
  :deep(th) {
    background-color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
    text-align: center;
  }

  :deep(td) {
    border-color: rgb(241 245 249 / var(--tw-text-opacity));
  }
}
</style>
