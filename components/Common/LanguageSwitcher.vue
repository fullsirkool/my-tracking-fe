<template>
  <div>
    <USelectMenu v-model="language" :options="locales" value-attribute="code" option-attribute="name" class="w-fit">
      <template #label>
        {{ label }}
      </template>
    </USelectMenu>
  </div>
</template>
<script setup>
const { locales, locale, setLocale } = useI18n()
const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value)
  }
})

const label = computed(() => {
  const selected = locales.value.find(item => item.code === locale.value)
  return selected.name
})
</script>