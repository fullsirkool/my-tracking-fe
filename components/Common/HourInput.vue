<template>
  <div class="flex items-center justify-center border border-solid rounded-lg" :class="{ 'text-gray-400': disabled }">
    <UInput type="number" v-model="hour" color="white" variant="none" name="input" placeholder="Hour"
      class="hour-input w-fit" :disabled="disabled" />
    <span>:</span>
    <UInput type="number" v-model="minute" color="white" variant="none" name="input" placeholder="Minute"
      class="hour-input w-fit" max="60" :disabled="disabled" />
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '00:00'
  },
  disabled: {
    type: Boolean,
  }
})
const emit = defineEmits(['update:model-value'])
const hour = computed({
  get: () => props.modelValue.split(":")[0],
  set: (value) => {
    const val = `${value}:${props.modelValue.split(":")[1]}`
    emit('update:model-value', val)
  }
})
const minute = computed({
  get: () => props.modelValue.split(":")[1],
  set: (value) => {
    const val = `${props.modelValue.split(":")[0]}:${value}`
    emit('update:model-value', val)
  }
})
</script>
<style>
.hour-input input {
  text-align: center;
}

.hour-input input[type="number"]::-webkit-inner-spin-button,
.hour-input input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>