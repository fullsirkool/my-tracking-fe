<template>
  <h1 class="text-cyan-700">{{ title }}</h1>
  <StravaConnect></StravaConnect>
</template>
<script setup>
import StravaConnect from '~/component/common/StravaConnect.vue';
const title = ref("Index Page");
</script>
<style></style>
