<template>
  <AuthSignUp></AuthSignUp>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['authentication']
})
</script>
