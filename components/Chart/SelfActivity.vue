<template>
  <UCard>
    <apexchart
      :key="series"
      height="500"
      width="100%"
      :options="options"
      :series="series"
    ></apexchart>
  </UCard>
</template>
<script setup lang="ts">
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
  // {
  //   name: "Team 2",
  //   data: [10, 7, 8, 9, 7, 6],
  // },
]);
</script>
