<template>
  <UContainer>
    <UCard class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]" style="box-shadow: none;">
      <UTabs :items="tabs">
        <template #default="{ item, index, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate font-semibold text-xl"> {{ item.label }}</span>
            <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
          </div>
        </template>
        <template #rule="{ item }">
          <ChallengeRuleTable></ChallengeRuleTable>
        </template>
        <template #chart="{ item }">
          <ChallengeActivityChart></ChallengeActivityChart>
        </template>
        <template #joined-user="{ item }">
          <ChallengeProcessTable></ChallengeProcessTable>
        </template>
      </UTabs>


    </UCard>
  </UContainer>
</template>
<script setup lang="ts">
const { t } = useI18n()
const tabs = [
  {
    slot: 'rule',
    icon: 'i-heroicons-adjustments-horizontal',
    label: t('rules'),
  },
  {
    slot: 'chart',
    icon: 'i-heroicons-chart-bar-square',
    label: t('activity_chart'),
  }, {
    slot: 'joined-user',
    icon: 'i-heroicons-user-group',
    label: t('joined_user'),
  }]
</script>