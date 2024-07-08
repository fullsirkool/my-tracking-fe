<script lang="ts" setup>
const props = defineProps<{
  distance: string
  pace: string
  activity: number
  time: string
}>()

const { t } = useI18n()
const state = reactive({
  distance: {
    label: t('distance'),
    value: computed(() => props.distance),
  },
  pace: {
    label: t('pace'),
    value: computed(() => props.pace),
  },
  activity: {
    label: t('activities'),
    value: computed(() => props.activity),
  },
  time: {
    label: t('time'),
    value: computed(() => props.time),
  },
})
</script>

<template>
  <UContainer
    class="md:hidden grid gap-1 z-10 justify-between py-2.5 overflow-x-auto w-full grid-cols-2"
  >
    <div v-for="item in state" class="grid-span-1 text-center text-slate-700">
      <div
        class="mx-auto text-xl text-primary-600 font-extrabold tracking-widest w-32 flex items-center justify-center"
      >
        {{ item?.value }}
      </div>
      <span class="text text-slate-700 font-bold">{{ item?.label }}</span>
    </div>
  </UContainer>
</template>
