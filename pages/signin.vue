<template>
  <AuthSignIn></AuthSignIn>
</template>
<script setup lang="ts">
import authentication from '~/middleware/authentication';

definePageMeta({
  layout: 'auth',
  middleware: [authentication]
})
</script>
