<template>
  <AuthSignIn></AuthSignIn>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['authentication']
})
</script>
