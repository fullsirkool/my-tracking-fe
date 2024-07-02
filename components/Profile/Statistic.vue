<script lang="ts" setup>
defineProps<{
  distance: string
  pace: string
  activity: number
  time: string
}>()
</script>

<template>
  <div
    class="hidden md:grid w-fit grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-4 font-semibold z-10 relative"
  >
    <div
      class="shadow rounded-full flex items-center justify-center flex-col text-center p-3 justfiy-center w-32 h-32 border bg-white border-none text-gray-700"
    >
      <p class="text-red-500 text-4xl font-extrabold">
        {{ distance }}
      </p>

      Km
    </div>
    <div
      class="shadow rounded-full flex items-center justify-center flex-col text-center p-3 justfiy-center w-32 h-32 border bg-white border-none text-gray-700"
    >
      <p class="text-red-500 text-4xl font-extrabold">
        {{ pace }}
      </p>
      {{ $t('pace') }}
    </div>
    <div
      class="shadow rounded-full flex items-center justify-center flex-col text-center p-3 justfiy-center w-32 h-32 border bg-white border-none text-gray-700"
    >
      <p class="text-red-500 text-4xl font-extrabold">{{ activity }}</p>
      {{ $t('activities') }}
    </div>
    <div
      class="shadow rounded-full flex items-center justify-center flex-col text-center p-3 justfiy-center w-32 h-32 border bg-white border-none text-gray-700"
    >
      <p class="text-red-500 text-4xl font-extrabold">
        {{ time }}
      </p>
      {{ $t('time') }}
    </div>
  </div>
</template>
