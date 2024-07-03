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
import { ROUTE } from '~/types/enum/route.enum'
const route = useRoute()
const router = useRouter()

const handleBack = () => {
  const pathName = route.path
  switch (pathName) {
    case ROUTE.USER_SIGNIN:
      router.push(ROUTE.HOME)
      return
    case ROUTE.USER_SIGNUP:
      router.push(ROUTE.USER_SIGNIN)
      return
    case ROUTE.ADMIN_SIGNIN:
      router.push(ROUTE.HOME)
      return
    default:
      router.back()
  }
}
</script>
