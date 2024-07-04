<template>
  <VDatePicker v-model="date" :attributes="attrs" :max-date="maxDate">
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
    
    <template v-if="$slots.default" #default>
      <slot></slot>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </VDatePicker>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
  maxDate: {
    type: Date,
    default: new Date('2100-01-01'),
  },
})
const emit = defineEmits(['update:model-value', 'close'])
const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'red',
      fillMode: 'outline',
    },
    dates: new Date(),
  },
])
const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value) {
      emit('update:model-value', value)
    }
  },
})
</script>
