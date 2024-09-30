<script setup lang="ts">
defineProps<{ label: string; value: string | number }>()
</script>

<template>
  <div class="flex justify-between">
    <label
      class="font-semibold min-w-[120px]">
      {{ label }}
    </label>

    <p class="text-right"> {{ value }} </p>
  </div>
</template>
