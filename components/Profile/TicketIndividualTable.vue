<script setup lang="ts">
import { useTicket } from '~/composable/useTicket'

const { t } = useI18n()
const toast = useToast()
const {
  listIndividualTicket,
  individualTicketPaging,
  isLoadingIndividualTicket,
  fetchIndividualTicket
} = useTicket()

const isOpen = ref(false)

const columns = ref([
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'challenge.title',
    label: t('challenge')
  },

  {
    key: 'name',
    label: t('name')
  },
  {
    key: 'email',
    label: t('email')
  },
  {
    key: 'phoneNumber',
    label: t('phone_number')
  },
  {
    key: 'distance',
    label: t('distance')
  },
  {
    key: 'ticketCode',
    label: t('ticket_code')
  },
  {
    key: 'raceType',
    label: t('challenge_type'),
  },
  {
    key: 'isCompleted',
    label: t('ticket_status')
  },
  {
    key: 'action',
    label: ""
  }
])

const paging = ref({
  page: 1,
  size: 20,
  totalPages: 1,
  totalElement: 0
})


const getEmptyTableStyle = computed(() => ({
  icon: 'i-heroicons-circle-stack-20-solid',
  label: t('no_tickets')
}))

const fetchData = async () => {
  const pagingParam = { page: paging.value.page, size: paging.value.size }
  await fetchIndividualTicket(pagingParam)
  const { size, page, totalPages, totalElement } = individualTicketPaging.value
  paging.value.totalPages = totalPages
  paging.value.totalElement = totalElement
}

const handleCopyTicketCode = (ticketCode: string) => {
  navigator.clipboard.writeText(ticketCode)
  toast.add({
    id: 'copy-challenge',
    icon: 'i-heroicons-check-circle',
    timeout: 3000,
    color: 'green',
    title: t('copied_ticket_code_to_clipboard')
  })
}

const init = () => {
  fetchData()
}

watch(() => paging.value.page, (newVal) => {
  console.log('change page', newVal)
  if (newVal) {
    individualTicketPaging.value.page = newVal
    fetchData()
  }
})

init()
</script>

<template>
  <div>
    <UTable
      :rows="listIndividualTicket"
      :columns="columns"
      class="custom-table shadow rounded-xl bg-white hidden md:block"
      :empty-state="getEmptyTableStyle"
      :loading="isLoadingIndividualTicket"
    >
      <template #name-data="{ row }">
        <div class="text-center">
          {{ row.name || '-' }}
        </div>
      </template>
      <template #email-data="{ row }">
        <div class="text-center">{{ row.email || '-' }}</div>
      </template>
      <template #phoneNumber-data="{ row }">
        <div class="text-center">{{ row.phoneNumber || '-' }}</div>
      </template>
      <template #distance-data="{ row }">
        <div class="text-center">
          {{ row.challengeDistance?.distance ? (row.challengeDistance?.distance / 1000).toFixed(0) + 'km' : '-' }}
        </div>
      </template>
      <template #raceType-data="{ row }">
        <div class="text-center">
          {{ $t(row.raceType.toLowerCase()) }}
        </div>
      </template>
      <template #ticketCode-data="{ row }">
        <UButton v-if="row.isPaid" variant="link" color="cancel" @click="handleCopyTicketCode(row.ticketCode)">
              <span class="font-semibold flex items-center gap-1">
                {{ row.ticketCode }}
                <Icon name="octicon:copy-16" width="0.75rem" height="0.75rem" />
              </span>
        </UButton>
        <span v-else>-</span>
      </template>
      <template #isCompleted-data="{ row }">
        <div v-if="!row.isPaid" class="text-center">
          <UBadge :label="$t('not_paid')" color="red" />
        </div>
        <div v-else-if="row.isCompleted" class="text-center">
          <UBadge :label="$t('completed')" color="green" />
        </div>
        <div v-else>
          <UBadge :label="$t('not_completed')" color="red" />
        </div>
      </template>
      <template #action-data="{ row }">
        <div v-if="!row.isPaid" class="text-center">
          <UButton :label="$t('pay')"  :to="`/ticket/individual/edit/${row.id}`" color="gray"/>
        </div>
        <div v-else></div>
      </template>
    </UTable>
    <div class="block md:hidden">
      <div v-if="listIndividualTicket.length">
        <div v-for="ticket in listIndividualTicket">
          <TicketCard :ticket="ticket" :redirect-url="`/ticket/individual/edit/${ticket.id}`"></TicketCard>
        </div>
      </div>
      <div v-else class="py-8">
        <label><UIcon name="i-heroicons-circle-stack-20-solid"/>{{$t('no_tickets')}}</label>
      </div>
    </div>
    <div v-if="listIndividualTicket?.length" class="flex items-center justify-end mt-4">
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
<style>
.custom-modal div.relative {
  max-width: fit-content;
}
</style>