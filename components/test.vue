<template>
  test
  <!--  <div v-if="message " class="aaa">{{ message }}</div>-->
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public

const init = () => {
  const eventSource = new EventSource(`${BASE_URL}/payment/sse`)
  eventSource.addEventListener('new-payment', () => {
    console.log('new event')
  })
  return () => {
    eventSource.close()
  }
}

init()
</script>
