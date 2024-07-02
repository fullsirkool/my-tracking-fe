<template>
  <div class="relative">
    <UCard
      class="rounded-2xl bg-[#f5f5f5] h-[400px] overflow-auto pt-8"
      style="box-shadow: none"
    >
      <div
        class="flex items-center justify-center gap-4 absolute top-5 -translate-x-2/4 left-2/4"
      >
        <UButton
          icon="i-heroicons-chevron-left"
          size="xs"
          :ui="{ rounded: 'rounded-full' }"
          color="white"
          variant="solid"
          @click="handleChangeMonth('-')"
        />
        <h2 class="font-bold hidden md:block">{{ getMonthDisplay }}</h2>
        <h2 class="font-bold block md:hidden">{{ getShortMonthDisplay }}</h2>
        <UButton
          icon="i-heroicons-chevron-right"
          size="xs"
          :ui="{ rounded: 'rounded-full' }"
          color="white"
          variant="solid"
          @click="handleChangeMonth('+')"
        />
      </div>
      <div class="min-w-[800px] lg:min-w-max pr-6 lg:pr-0">
        <apexchart
          :key="chartRenderKey"
          height="300"
          :options="getOptions"
          :series="getChartSeries"
        >
        </apexchart>
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profile.store'
import { DailyActivityDto } from '~/types/dto/activity.dto'
const dayjs = useDayjs()
const { t } = useI18n()

// STORE//

const profileStore = useProfileStore()
const { handleChangeMonth } = profileStore
const { chartDate, activities } = storeToRefs(profileStore)

// END STORE//
const chartRenderKey = ref(0)
const renderCount = ref(0)

const options = ref({
  chart: {
    type: 'area',
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: '#000',
      opacity: 0.35,
    },
    tools: {
      download: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    color: '#FEBC04',
    width: 2,
  },
  colors: ['#FEBC04', '#E91E63', '#9C27B0'],
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.2,
    },
  },
  markers: {
    size: [5, 5],
    hover: {
      size: undefined,
      sizeOffset: 2,
    },
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    forceNiceScale: true,
    min: 0,
  },
})

// COMPUTED //

const getChartSeries = computed(() => {
  renderCount.value++
  const seriesData: DailyActivityDto[] = [...activities.value]
  const data = Array.from(
    { length: numberOfDate(chartDate.value) },
    (_, index) => {
      if (!seriesData.length) {
        return 0
      }

      if (new Date(`${seriesData[0].startDateLocal}`).getDate() !== index + 1) {
        return 0
      }
      const item = seriesData.shift()
      return (item.distance / 1000).toFixed(2)
    },
  )
  return [
    {
      name: `${t('distance')} (km)`,
      data,
    },
  ]
})

const getOptions = computed(() => {
  const completeOptions = {
    ...options.value,
    xaxis: {
      categories: Array.from(
        { length: numberOfDate(chartDate.value) },
        (_, index) => index + 1,
      ),
    },
  }
  return completeOptions
})

const getMonthDisplay = computed(() => {
  return `${t('monthly_activities_chart')} ${dayjs(chartDate.value).format(
    'MM/YYYY',
  )}`
})

const getShortMonthDisplay = computed(() => {
  return `${dayjs(chartDate.value).format('YYYY, MMMM')}`
})

const init = () => {
  setTimeout(() => {
    chartRenderKey.value++
  }, 500)
}

init()
</script>
