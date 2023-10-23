<template>
    <VDatePicker v-model="date" :attributes="attrs" />
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  },
})
const emit = defineEmits(['update:model-value', 'close'])
const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'green',
      fillMode: 'solid'
    },
    dates: new Date()
  }
])
const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value) {
      emit('update:model-value', value)
    }
  }
})
</script>