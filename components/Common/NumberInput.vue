<template>
  <UInput v-model="stringValue" :disabled="readonly" @keydown="checkInput">
    <template #trailing>
      <span class="text-gray-400 text-sm">{{ $t('m') }}</span>
    </template>
  </UInput>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  readonly: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:model-value'])
const valueString = computed({
  get: () => props.modelValue,
  set: (value) => {
    
  }
})

const checkInput = (event: any) => {
  const isNumber = isFinite(event.key)
  // Optionally handle other keys like backspace, delete, decimal point, etc.
  if (
    !(
      isNumber ||
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === '.' ||
      event.key === ','
    )
  ) {
    event.preventDefault()
  }
}
</script>
