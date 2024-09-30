<script lang="ts" setup>
import { type PropType } from '#app/compat/capi'

type OptionType = {
  label: string
  value: string | number
}

const emit = defineEmits<{
  'update:model-value': [value: string | number]
}>()

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  options: {
    type: Array as PropType<OptionType[]>,
    required: true,
  },
  emptyText: {
    type: String,
    default: () => 'No option available'
  }
})
</script>

<template>
  <UPopover>
    <slot name="trigger"></slot>

    <template #panel="{ close }">
      <div class="my-2 px-4 max-h-48 overflow-y-auto">
        <template v-if="options.length">
          <div
            v-for="item in props.options"
            :key="item.value as number | string"
            class="-mx-2.5 px-2.5 py-1 text-sm cursor-pointer hover:bg-primary-100 flex w-100 justify-between items-center rounded gap-5 group"
            :class="{
              'bg-primary-50': modelValue === item.value,
            }"
            @click="
              () => {
                emit('update:model-value', item.value as number | string)
                close()
              }
            "
          >
            <div>
              {{ item.label }}
            </div>
  
            <div>
              <UIcon
                v-if="modelValue === item.value"
                name="i-heroicons-check-20-solid"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <slot v-if="$slots.emptyText" name="emptyText"></slot>
          <div v-else class="text-sm">{{ emptyText }}</div>
        </template>
      </div>
    </template>

    <slot name="error"></slot>
  </UPopover>
</template>
