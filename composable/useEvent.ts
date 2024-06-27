import { ref, watchEffect } from 'vue'

interface SseData {
  // Define the structure of your expected event data
  message: string // Example property
}

const runtimeConfig = useRuntimeConfig()
const { BASE_URL } = runtimeConfig.public
export const useEvent = () => {
  const sseData = ref<SseData | null>(null)

  watchEffect(() => {
    const eventSource = new EventSource(`${BASE_URL}/payment/sse`)

    eventSource.onmessage = (event) => {
      // sseData.value = JSON.parse(event.data) as SseData
      console.log('value', event)
    }

    // Handle errors or disconnections (optional)
    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      // Retry connection logic if needed
    }
  })

  return { sseData }
}
