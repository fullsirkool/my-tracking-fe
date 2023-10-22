<template>
  <UContainer>
    <CommonStepper v-model="selectedStep" :steps="steps"></CommonStepper>
  </UContainer>
</template>
<script setup>
const steps = ref([
  { key: "information", title: "Information" },
  { key: "rules", title: "Rules" },
  { key: "review", title: "Review" },
])
const selectedStep = ref({ key: "information", title: "Information" })

</script>