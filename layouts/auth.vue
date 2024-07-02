<template>
  <div class="relative">
    <div class="m-5">
      <nuxt-link
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full text-slate-100 bg-primary-600 shadow-xl mx-2"
        @click="handleBack"
      >
        <Icon
          name="heroicons:chevron-left-20-solid"
          width="38"
          height="38"
          class="relative"
          style="top: -1px"
        />
      </nuxt-link>
    </div>
    <div class="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
      <slot></slot>
    </div>
    <UNotifications />
    <CommonAlert />
  </div>
</template>
<script setup lang="ts">
const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>
