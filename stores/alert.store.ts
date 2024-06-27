import { defineStore } from 'pinia'

type AlertOptions = {
  message?: string
  title?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export const useAlertStore = defineStore('alert', () => {
  const isOpen = ref(false)
  const message = ref('')
  const title = ref('')
  const type = ref('')

  const open = (options: AlertOptions) => {
    isOpen.value = true
    message.value = options?.message ?? ''
    title.value = options?.title ?? 'Info'
    type.value = options?.type ?? 'info'
  }

  const close = () => {
    isOpen.value = false
    message.value = ''
    title.value = ''
    type.value = 'info'
  }

  return {
    isOpen,
    title,
    message,
    open,
    close,
  }
})
