<template>
  <VDatePicker v-model="date" :attributes="attrs" mode="dateTime" :timezone="timezone" :max-date="maxDate" :time-accuracy="2">
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

const runtimeConfig = useRuntimeConfig()
const { TIME_ZONE } = runtimeConfig.public

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
const timezone = ref(TIME_ZONE)
const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value) {
      emit('update:model-value', value)
    }
  },
})
</script>
<style>
.vc-base-select select {
  width: 70px
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #D6DADE;
  width: 8px;
  padding-right: 8px;
}
</style>
