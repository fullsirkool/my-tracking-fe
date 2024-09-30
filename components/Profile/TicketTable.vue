<script setup lang="ts">
const { t } = useI18n()
const selectedTab = ref('group_ticket')
const tabs = ref([
  {
    key: 'individual_ticket',
    title: t('individual_ticket'),
  },
  {
    key: 'group_ticket',
    title: t('group_ticket'),
  },
])

const handleChangeTab = (key: string) => {
  selectedTab.value = key
}
</script>
<template>
  <div class="p-4">
    <div class="flex justify-start items-center gap-1">
      <UButton
        v-for="tab in tabs"
        :variant="tab.key === selectedTab ? 'solid' : 'outline'"
        :label="tab.title"
        class="flex-1 justify-center"
        @click="handleChangeTab(tab.key)"
      />
    </div>
    <div v-if="selectedTab === 'group_ticket'" class="mt-4">
      <ProfileTicketGroupTable />
    </div>
    <div v-else-if="selectedTab === 'individual_ticket'" class="mt-4">
      <ProfileTicketIndividualTable />
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
