<script setup lang="ts">
import paymentRepository from '~/repository/payment.repository'
import { PaymentDto } from '~/types/dto/payment.dto'
import DatePicker from '~/components/Common/DatePicker.vue'

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

const filterTemp = reactive({
  createdDate: undefined,
  query: '',
})

const filter = reactive({
  createdDate: undefined,
  query: '',
})

const calendarLabel = computed(() => {
  return filterTemp.createdDate
    ? dayjs(filterTemp.createdDate).format('DD/MM/YYYY')
    : t('all_time')
})

const fetchPaymentList = async () => {
  const { data } = await paymentRepository.fetchPaymentList({
    page: pagination.page,
    size: pagination.size,
    createdAt: filter.createdDate
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

const onFilter = async () => {
  filter.createdDate = filterTemp.createdDate
  filter.query = filterTemp.query
  fetchPaymentList()
}

const onKeydown = (event: KeyboardEvent) => {
  event.key == 'Enter' && onFilter()
}

await onFilter()

watch(
  () => pagination.page,
  () => fetchPaymentList(),
)
</script>

<template>
  <div class="p-5">
    <div
      class="bg-white shadow rounded-xl flex flex-col md:flex-row md:items-end p-5 gap-5"
    >
      <div class="flex md:block gap-5 items-center">
        <label class="text-sm font-semibold">
          {{ $t('start_date') }}
        </label>

        <div class="flex items-center gap-5">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="calendarLabel"
            />

            <template #panel="{ close }">
              <DatePicker
                v-model="filterTemp.createdDate"
                is-required
                @close="close"
              >
                <template #footer>
                  <div class="text-center mb-5 px-2.5">
                    <UButton block @click="() => {
                      filterTemp.createdDate = undefined;
                      close()
                    }">
                      {{ $t('all_time') }}
                    </UButton>
                  </div>
                </template>
              </DatePicker>
            </template>
          </UPopover>
        </div>
      </div>

      <div class="flex-1 flex items-end gap-5 w-100">
        <div class="flex-1">
          <label class="text-sm font-semibold" for="query">
            {{ $t('search_by_keyword') }}
          </label>
          <UInput
            v-model="filterTemp.query"
            placeholder="Keyword"
            name="query"
            @keydown="onKeydown"
          />
        </div>
        <UButton @click="onFilter">{{ $t('search') }}</UButton>
      </div>
    </div>

    <div class="h-5"></div>

    <!-- Desktop -->
    <UTable
      :rows="paymentList"
      :columns="columns"
      class="custom-table shadow rounded-xl bg-white hidden md:block"
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
            {{ $t('created_at') }}
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
