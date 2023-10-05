<template>
  <UCard>
    <div class="flex items-center justify-center gap-4">
      <UButton
        icon="i-heroicons-chevron-left"
        size="xs"
        :ui="{ rounded: 'rounded-full' }"
        color="white"
        variant="solid"
        @click="handleChangeMonth('-')"
      />
      <h2 class="font-bold">Biểu đồ hoạt động tháng {{ getMonthDisplay }}</h2>
      <UButton
        icon="i-heroicons-chevron-right"
        size="xs"
        :ui="{ rounded: 'rounded-full' }"
        color="white"
        variant="solid"
        @click="handleChangeMonth('+')"
      />
    </div>
    <apexchart
      :key="getChartSeries"
      height="300"
      width="100%"
      :options="getOptions"
      :series="getChartSeries"
    ></apexchart>
  </UCard>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile.store";
const dayjs = useDayjs();

//STORE//

const profileStore = useProfileStore();
const { handleChangeMonth } = profileStore;
const { chartDate, series } = storeToRefs(profileStore);

//END STORE//

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
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    color: "#FEBC04",
    width: 2,
  },
  colors: ["#FEBC04", "#E91E63", "#9C27B0"],
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
    categories: [],
  },
  yaxis: {
    forceNiceScale: true,
    min: 0,
  },
});

const getChartSeries = computed(() => {
  const seriesData = [...series.value];
  const data =  Array.from({ length: numberOfDate(chartDate.value) }, (_, index) => {
    if (!seriesData.length) {
      return 0;
    }

    if (new Date(seriesData[0].startDate).getDate() !== index + 1) {
      return 0;
    }

    const item = seriesData.shift();
    return (item.distance / 1000).toFixed(2);
  });
  return [
    {
      name: "activities",
      data: data,
    },
  ];
});

const getOptions = computed(() => {
  const completeOptions = {
    ...options.value,
    xaxis: {
      categories: Array.from(
        { length: numberOfDate(chartDate.value) },
        (_, index) => index + 1
      ),
    },
  };
  return completeOptions;
});

// COMPUTED //
const getMonthDisplay = computed(() => {
  return dayjs(chartDate.value).format("MM/YYYY");
});
</script>
