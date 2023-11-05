<template>
  <div>
    <div class="rounded-2xl bg-[#f5f5f5] pt-6 pr-6 pl-6">
      <apexchart :key="chartRenderKey" height="400" :options="options" :series="getChartSeries">
      </apexchart>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChallengeStore } from '~/stores/challenge.store';
const challengeStore = useChallengeStore()
const { challengeDetail } = storeToRefs(challengeStore)

const chartRenderKey = ref<number>(0)

const options = ref({
  chart: {
    type: "area",
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: "#000",
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
    curve: "smooth",
    color: "#FEBC04",
    width: 2,
  },
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
  fill: {
    type: "gradient",
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
    type: 'datetime'
  },
  yaxis: {
    forceNiceScale: true,
    min: 0,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px',
    fontWeight: 400,
    itemMargin: {
      horizontal: 5,
      vertical: 10
    },
  }
});

const getOptions = computed(() => {
  // if (!challengeDetail.value) {
  //   return options.value
  // }
  // const { startDate, endDate } = challengeDetail.value

  // const dates = getFormatedDateArrayBetween(startDate, endDate)

  const completeOptions = {
    ...options.value,
    xaxis: {
      // categories: dates,
      type: 'datetime'
    },
  };
  return completeOptions;

});

const getChartSeries = computed(() => {
  if (!challengeDetail.value) {
    return []
  }

  const { userActivitites, startDate, endDate } = challengeDetail.value
  const series = userActivitites.map(item => {
    const { user, statistics } = item

    const data = statistics.map(i => {
      const { distance, startDateLocal } = i
      return {
        x: new Date(startDateLocal).getTime(),
        y: +(distance / 1000).toFixed(2)
      }
    })

    if (data.length) {
      if (data[0]?.x > new Date(startDate).getTime()) {
        data.unshift({
          x: new Date(startDate).getTime(),
          y: 0
        })
      }
      if (data[data.length - 1]?.x < new Date(endDate).getTime()) {
        data.push({
          x: new Date(endDate).getTime(),
          y: 0
        })
      }
    }

    return {
      name: `${user.firstName} ${user.lastName}`,
      data
    }
  })
  console.log('series', series)
  return series
})

watch(
  () => challengeDetail,
  () => {
    chartRenderKey.value++;
  },
  {
    deep: true
  }
);
</script>