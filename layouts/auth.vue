<template>
  <div class="relative">
    <nuxt-link to="/">
      <UButton color="white" variant="solid" icon="i-heroicons-chevron-left-20-solid">Back</UButton>
    </nuxt-link>
    <div class="flex min-h-full flex-col justify-center px-6 py-20 lg:px-8">
      <slot></slot>
    </div>
    <UNotifications />
  </div>
</template>
<script setup lang="ts">
</script>