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
      :key="series"
      height="300"
      width="100%"
      :options="options"
      :series="series"
    ></apexchart>
  </UCard>
</template>
<script setup lang="ts">
const dayjs = useDayjs();

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
    categories: [1, 2, 3, 4, 5, 6],
  },
  yaxis: {
    forceNiceScale: true,
    min: 0,
  },
});
const series = ref([
  {
    name: "Team 1",
    data: [5, 6, 5, 6, 9, 7],
  },
]);

const date = ref(dayjs(new Date()));

// COMPUTED //

const getMonthDisplay = computed(() => {
  return date.value.format("MM/YYYY");
});

const getNumberOfDays = computed(() => {
  return numberOfDate();
});

// METHODS //
const handleChangeMonth = (sign: string) => {
  date.value =
    sign === "+" ? date.value.add(1, "month") : date.value.subtract(1, "month");
};

// WATCH //
watch(
  () => date.value,
  (newVal) => {
    console.log(newVal);
    //call api here
  }
);
</script>
