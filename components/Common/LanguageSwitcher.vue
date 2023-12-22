<template>
  <div>
    <UButton color="orange" variant="outline" :ui="{ rounded: 'rounded-full' }" @click="isOpen = true">
      <Icon name="heroicons:cog-8-tooth" width="1.5rem" height="1.5rem"/>
    </UButton>
    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1"
             :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <Placeholder class="h-8"/>
          <h1 class="text-center text-2xl font-semibold">Setting</h1>
        </template>
        <div class="flex items-center gap-4">
          <label for="">Language:</label>
          <USelectMenu
              v-model="language"
              :options="locales"
              value-attribute="code"
              option-attribute="name"
              class="w-fit"
          >
            <template #label>
              {{ label }}
            </template>
          </USelectMenu>
        </div>
        <template #footer>
          <Placeholder class="h-8"/>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
<script setup>
const {locales, locale, setLocale} = useI18n()
const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value)
  },
})

const label = computed(() => {
  const selected = locales.value.find((item) => item.code === locale.value)
  return selected.name
})

const isOpen = ref(false)
</script>
