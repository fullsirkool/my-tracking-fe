<template>
  <UContainer>
    <UCard
      class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]"
      style="box-shadow: none"
    >
      <UTabs v-model="selectedItem" :items="tabs">
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
        <template #rule>
          <ChallengeRuleTable></ChallengeRuleTable>
        </template>
        <template #chart>
          <ChallengeActivityChart></ChallengeActivityChart>
        </template>
        <template #joined-user>
          <ChallengeProcessTable></ChallengeProcessTable>
        </template>
      </UTabs>
    </UCard>
  </UContainer>
</template>
<script setup lang="ts">
const { t } = useI18n()
const tabs = ref([
  {
    slot: 'rule',
    icon: 'i-heroicons-adjustments-horizontal',
    label: t('rules'),
  },
  {
    slot: 'chart',
    icon: 'i-heroicons-chart-bar-square',
    label: t('activity_chart'),
  },
  {
    slot: 'joined-user',
    icon: 'i-heroicons-user-group',
    label: t('joined_users'),
  },
])

const route = useRoute()
const router = useRouter()

const selectedItem = computed({
  get() {
    const index = tabs.value.findIndex((item) => item.slot === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set(value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({ query: { tab: tabs.value[value].slot } })
  },
})
</script>
