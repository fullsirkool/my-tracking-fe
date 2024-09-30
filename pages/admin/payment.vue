<script setup lang="ts">
import paymentRepository from '~/repository/payment.repository'
import { type PaymentDto, type PaymentFilter, PaymentStatus, PaymentStatusDto } from '~/types/dto/payment.dto'

definePageMeta({
  middleware: ['authentication']
})

const dayjs = useDayjs()
const { t } = useI18n()
const toast = useToast()

const pagination = reactive({
  page: 1,
  size: 20,
  totalElements: 1,
  totalPages: 1
})

const paymentList = ref<PaymentDto[]>([])

const columns = ref([
  {
    key: 'paymentCode',
    label: t('payment_code')
  },
  {
    key: 'user.name',
    label: t('username')
  },
  {
    key: 'challenge.title',
    label: t('challenge')
  },
  {
    key: 'amount',
    label: t('amount')
  },
  {
    key: 'phoneNumber',
    label: t('phone_number')
  },
  {
    key: 'numberOfPlayer',
    label: t('number_of_player')
  },
  {
    key: 'createdAt',
    label: t('created_at')
  },
  {
    key: 'status',
    label: t('status')
  },
  {
    key: 'action',
    label: t(''),
    class: 'w-[300px]'
  }
])

const filter = ref<PaymentFilter>({
  query: '',
  createdDate: undefined,
  challengeId: undefined
})

const fetchPaymentList = async () => {
  const { data } = await paymentRepository.fetchPaymentList({
    page: pagination.page,
    size: pagination.size,
    createdAt: filter.value.createdDate
      ? dayjs(filter.value.createdDate).toISOString()
      : '',
    query: filter.value.query,
    challengeId: filter.value.challengeId
  })

  if (data) {
    paymentList.value = data.data
    pagination.totalElements = data.totalElement
    pagination.totalPages = data.totalPages
  }
}

const getEmptyTableStyle = computed(() => ({
  icon: 'i-heroicons-circle-stack-20-solid',
  label: t('no_payments')
}))

const handleCompletePayment = async (paymentId: number) => {
  const { error, data } = await paymentRepository.updatePaymentStatus({ paymentId, status: PaymentStatusDto.COMPLETE })
  if (error) {
    toast.add({
      id: 'confirm-payment',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: error.message
    })
    return
  }

  toast.add({
    id: 'confirm-payment',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    color: 'green',
    title: t('confirm_payment_success')
  })

  fetchPaymentList()
}

const handleRejectPayment = async (paymentId: number) => {
  const { error, data } = await paymentRepository.updatePaymentStatus({ paymentId, status: PaymentStatusDto.REJECT })
  if (error) {
    toast.add({
      id: 'confirm-payment',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 4000,
      title: error.message
    })
    return
  }

  toast.add({
    id: 'confirm-payment',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    color: 'green',
    title: t('confirm_payment_success')
  })

  fetchPaymentList()
}

const handleClickChallengeTitle = (challengeId: number) => {
  window.open(`/challenge/${challengeId}`)
}

watch(
  () => pagination.page,
  () => fetchPaymentList()
)

watch(filter, () => fetchPaymentList(), { deep: true })
</script>

<template>
  <div class="p-5">
    <PaymentFilter
      :model-value="filter"
      @update:model-value="filter = { ...$event }"
    />

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
      <template #challenge.title-data="{ row }">
        <div>
          <UButton color="blue" variant="link" :label="row.challenge.title" @click="handleClickChallengeTitle(row.challenge.id)"/>
        </div>
      </template>
      <template #amount-data="{ row }">
        <div>{{ number.format(row.amount) }} đ</div>
      </template>
      <template #phoneNumber-data="{ row }">
        <div v-if="row.playerGroup">{{ row.playerGroup.representativePhoneNumber }}</div>
        <div v-else>{{ row.challengePlayers[0].phoneNumber }}</div>
      </template>
      <template #numberOfPlayer-data="{ row }">
        <div>{{ row._count.challengePlayers }}</div>
      </template>
      <template #status-data="{ row }">
        <div v-if="row.status === PaymentStatus.COMPLETED" class="flex items-center justify-start">
          <UBadge :label="$t('completed')" color="green" />
        </div>
        <div v-else-if="row.status === PaymentStatus.REJECTED" class="flex items-center justify-start">
          <UBadge :label="$t('rejected')" color="red" />
        </div>
        <div v-else class="flex items-center justify-start">
          <UBadge :label="$t('not_completed')" color="white" />
        </div>
      </template>
      <template #action-data="{ row }">
        <div v-if="row.status === PaymentStatus.PENDING" class="flex justify-end items-center w-fit gap-4">
          <UButton v-if="!row.isCompleted" size="xs" color="green" variant="outline" :label="$t('confirm_check')"
                   @click="handleCompletePayment(row.id)" />
          <UButton v-if="!row.isCompleted" size="xs" variant="outline" :label="$t('reject_payment')"
                   @click="handleRejectPayment(row.id)" />
        </div>
      </template>
    </UTable>

    <!-- Mobile -->
    <div class="md:hidden block">
      <div
        v-for="item in paymentList"
        :key="item.id"
        class="mb-2.5 border border-slate-200 p-2.5 rounded-xl"
      >
        <div class="flex justify-between mb-2">
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
        <div class="text-sm italic flex justify-between">
          <span>
            {{ t('created_at') }}
          </span>
          <span>
            {{ dayjs(item.createdAt).format('HH:mm DD-MM-YYYY') }}
          </span>
        </div>
        <div class="text-sm italic flex justify-between">
          <span>
            {{ t('number_of_player') }}:
          </span>
          <span>
            {{ item._count.challengePlayers }}
          </span>
        </div>
        <br>
        <div class="text-sm italic flex justify-between py-2">
          <span>
            <div v-if="item.status === PaymentStatus.COMPLETED" class="text-center">
              <UBadge :label="$t('completed')" color="green" />
            </div>
            <div v-else-if="item.status === PaymentStatus.REJECTED" class="text-center">
              <UBadge :label="$t('rejected')" color="red" />
            </div>
            <div v-else>
              <UBadge :label="$t('not_completed')" color="white" />
            </div>
          </span>
        </div>
        <div v-if="item.status === PaymentStatus.PENDING" class="text-sm italic flex justify-between">
          <span>
              <UButton size="xs" color="green" variant="outline" :label="$t('confirm_check')"
                       @click="handleCompletePayment(item.id)" />
          </span>
          <span>
            <UButton size="xs" variant="outline" :label="$t('reject_payment')"
                     @click="handleRejectPayment(item.id)" />
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
    background-color: rgb(var(--color-primary-600) / var(--tw-bg-opacity));
    color: rgb(var(--color-primary-50) / var(--tw-bg-opacity));
  }

  :deep(td) {
    border-color: rgb(241 245 249 / var(--tw-text-opacity));
  }
}
</style>
