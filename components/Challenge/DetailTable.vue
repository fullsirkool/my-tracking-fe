<template>
  <div class="mt-10 px-0 sm:px-6 lg:px-8 max-w-7xl">
    <UCard
      class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]"
      style="box-shadow: none"
    >

      <h1 class="text-2xl font-semibold mb-2">{{ t('rules') }}</h1>
      <ChallengeRuleTable></ChallengeRuleTable>

    </UCard>
  </div>
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
