<template>
  <UCard class="rounded-3xl bg-[#f5f5f5] challenge-card" style="box-shadow: none;">
    <img :src="challenge.image" class="rounded-xl" />
    <h1 class="font-semibold mt-4">{{ challenge.title }}</h1>
  </UCard>
</template>
<script setup>
const props = defineProps({
  challenge: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style>
.challenge-card {
  img {
    transition: transform 0.3s ease-in-out;
  }
}
.challenge-card:hover {
  img {
    transform: scale(1.2);
  }
}
</style>