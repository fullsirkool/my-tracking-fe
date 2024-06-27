<template>
  test
  <div v-if="message " class="aaa">{{ message }}</div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const {BASE_URL} = runtimeConfig.public

const message = ref(null);
let eventSource;

const init = () => {
  eventSource = new EventSource(`${BASE_URL}/payment/sse`);

  eventSource.onmessage = (event) => {
    console.log('event', event)
    message.value = event.data;
  };

  eventSource.onerror = (event) => {
    console.error('Error:', event);
    eventSource.close();
  };
}

init()

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close();
  }
});
</script>