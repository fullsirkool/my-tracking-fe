<template>
  <div class="mt-10">
    <UCard
      class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]"
      style="box-shadow: none"
    >
      <h1 class="text-2xl font-semibold mb-2">{{ t('rank') }}</h1>
      <div>
        <UTable
          v-model:sort="sort"
          :rows="rows"
          :columns="columns"
          :ui="{
            th: {
              size: 'text-sm md:text-base',
            },
          }"
          :empty-state="getEmptyTableStyle"
          @update:sort="handleSort"
        >
          <template #name-data="{ row }">
            <div>
              <NuxtLink :to="`/profile/${row.id}`" class="flex items-center gap-3">
                <UAvatar :src="row.avatar" alt="Avatar" size="md" />
                <span
                    class="text-gray-800 dark:text-white font-medium text-base md:text-base"
                >{{ row.name }}</span
                >
              </NuxtLink>
            </div>
          </template>
          <template #groupname-data="{ row }">
            <span class="text-gray-800 dark:text-white font-medium text-base">
              {{ row.groupname }}
            </span>
          </template>
          <template #totaldistance-data="{ row }">
            <span class="text-gray-800 dark:text-white font-medium text-base">
              {{ row.distance.toFixed(1) }} km
            </span>
          </template>

          <template #target-data="{ row }">
            <span class="text-gray-800 dark:text-white font-medium text-base"
              >{{ number.format(row.target) }} km
            </span>
          </template>

          <template #process-data="{ row }">
            <div>
              <UProgress
                :value="row.process"
                size="md"
                :color="colorProcess(row.process)"
              >
                <template #indicator="{ percent }">
                  <div class="text-right text-xs font-bold rounded-lg">
                    <span :class="`text-${colorProcess(row.process)}-500`">
                      {{ percent ? percent.toFixed(1) : 0 }}%
                      {{ $t('completed') }}
                      <!-- {{ JSON.stringify(percent) }} -->
                    </span>
                  </div>
                </template>
              </UProgress>
            </div>
          </template>
        </UTable>

        <div
          class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
          <UPagination
            v-model="page"
            :page-count="challengeUsersPageSize"
            :total="totalChallengeUsers"
            @update:model-value="handleChangePage"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChallengeStore } from '~/stores/challenge.store'
import { number } from '~/utils/numberWithCommas'

const { t } = useI18n()

const challengeStore = useChallengeStore()
const { challengeUsers, challengeUsersPageSize, totalChallengeUsers } =
  storeToRefs(challengeStore)
const page = ref(1)
const sort = ref<{column: string | null, direction: string}>({ column: 'totaldistance', direction: 'desc' })

const columns = [
  {
    key: 'name',
    label: t('name'),
  },
  {
    key: 'groupname',
    label: t('group'),
    sortable: true,
  },
  {
    key: 'totaldistance',
    label: t('completed'),
    sortable: true,
    class: 'min-w-[170px] md:min-w-auto',
  },
  {
    key: 'target',
    label: t('target'),
    class: 'min-w-[100px] md:min-w-auto',
  },
  {
    key: 'process',
    label: t('process'),
    sortable: true,
  },
]

const getEmptyTableStyle = computed(() => ({
  icon: 'i-heroicons-circle-stack-20-solid',
  label: t('no_items'),
}))

const rows = computed(() => {
  if (!challengeUsers.value) return []
  const res = challengeUsers.value.map((user, index) => {
    return {
      id: user.id,
      groupname: user.groupname,
      name: user.name,
      avatar: user.profilelong,
      distance: user.totaldistance / 1000,
      target: user.target / 1000,
      process: user.process,
    }
  })
  return res
})

const colorProcess = (value: number) => {
  switch (true) {
    case value < 25:
      return 'red'
    case value < 50:
      return 'orange'
    case value < 75:
      return 'yellow'
    case value < 100:
      return 'green'
    case value === 100:
      return 'blue'
    default:
      return 'red'
  }
}

const handleChangePage = async (pageNumber: number) => {
  if (!sort.value.column) {
    await challengeStore.fetchChallengeUsers({
      page: pageNumber,
    })
    return
  }

  await challengeStore.fetchChallengeUsers({
    page: pageNumber,
    sort: `${sort.value.column},${sort.value.direction}`,
  })
}

const handleSort = async (sortData: {
  column: string | null
  direction: 'asc' | 'desc'
}) => {
  const cloneSort = {...sortData}
  if (cloneSort.column === 'groupname') {
    cloneSort.column = 'groupid'
  }
  page.value = 1
  sort.value = cloneSort
  handleChangePage(page.value)
}
</script>
