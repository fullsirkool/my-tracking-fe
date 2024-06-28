<template>
  <UCard
    class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]"
    style="box-shadow: none"
  >
    <div>
      <UTabs :items="tabs">
        <template #default="{ item, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate font-semibold text-xl">
              {{ item.label }}</span
            >
            <span
              v-if="selected"
              class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
            />
          </div>
        </template>
        <template #activities>
          <ProfileActivityTable></ProfileActivityTable>
        </template>
      </UTabs>
    </div>
  </UCard>
</template>
<script setup lang="ts">
const { t } = useI18n()
const tabs = [
  {
    slot: 'activities',
    icon: 'i-heroicons-bolt',
    label: t('activities'),
  }
]
</script>
