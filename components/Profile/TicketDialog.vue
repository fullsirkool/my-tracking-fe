<script setup lang="ts">
import { useTicket } from '~/composable/useTicket'

interface ITicketDialog {
  groupId: number
}

const props = withDefaults(defineProps<ITicketDialog>(), {})

const { t } = useI18n()
const toast = useToast()
const {
  listTicketOfGroup,
  groupIdForTicket,
  ticketOfGroupPaging,
  isLoadingTicketOfGroup,
  fetchTicketOfGroup
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
    key: 'isCompleted',
    label: t('ticket_status')
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
  label: t('no_payments')
}))

const fetchData = async () => {
  const pagingParam = { page: paging.value.page, size: paging.value.size }
  await fetchTicketOfGroup(pagingParam)
  const { size, page, totalPages, totalElement } = ticketOfGroupPaging.value
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

watch(() => isOpen.value, (newVal) => {
  if (newVal) {
    groupIdForTicket.value = props.groupId
    fetchData()
  }
})

watch(() => paging.value.page, (newVal) => {
  console.log('change page', newVal)
  if (newVal) {
    ticketOfGroupPaging.value.page = newVal
    fetchData()
  }
})
</script>

<template>
  <div>
    <UButton variant="link" color="blue" class="p-0" @click="isOpen = true">
      <slot name="default"></slot>
    </UButton>
    <UModal v-model="isOpen" class="custom-modal">
      <div class="w-fit">
        <h1 class="text-3xl font-semibold text-center my-4">{{ $t('tickets_of_group') }}</h1>
        <div class="p-4 max-h-[600px] min-w-[300px] overflow-auto">
          <UTable
            :rows="listTicketOfGroup"
            :columns="columns"
            class="custom-table shadow rounded-xl bg-white hidden md:block"
            :empty-state="getEmptyTableStyle"
            :loading="isLoadingTicketOfGroup"
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
            <template #ticketCode-data="{ row }">
              <UButton variant="link" color="cancel" @click="handleCopyTicketCode(row.ticketCode)">
              <span class="font-semibold flex items-center gap-1">
                {{ row.ticketCode }}
                <Icon name="octicon:copy-16" width="0.75rem" height="0.75rem" />
              </span>
              </UButton>
            </template>
            <template #isCompleted-data="{ row }">
              <div v-if="row.isCompleted" class="text-center">
                <UBadge :label="$t('completed')" color="green" />
              </div>
              <div v-else>
                <UBadge :label="$t('not_completed')" color="red" />
              </div>
            </template>
          </UTable>
          <div class="block md:hidden">
            <div v-for="ticket in listTicketOfGroup">
              <TicketCard :key="ticket.id" :ticket="ticket"></TicketCard>
            </div>
          </div>
          <div class="flex items-center justify-end mt-4">
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
      </div>
    </UModal>
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