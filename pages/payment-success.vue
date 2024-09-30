<script setup lang="ts">
import paymentSuccessImage from '~/assets/payment-success.webp'
import {useUserStore} from "~/stores/user.store";

definePageMeta({
  middleware: ['payment']
})

const userStore = useUserStore()
const handleRedirect = () => {
  const userId = userStore.userId
  if (userId) {
    navigateTo(`/profile/${userId}?tab=ticket`)
  }
}
</script>

<template>
  <div>
    <div class="text-center">
      <img :src="paymentSuccessImage" alt="payment-success" class="inline"/>

      <div
          class="text-4xl font-semibold tracking-wider flex items-center justify-center"
      >
        <Icon
            name="mdi:check-decagram"
            color="green"
            width="50"
            height="50"
            class="mr-2"
        />
        {{ $t('register_success') }}
      </div>
    </div>

    <div class="text-center text-blue-500 hover:text-blue-600 hover:underline mt-5">
      <NuxtLink @click="handleRedirect"> {{ $t('view_tickets') }}</NuxtLink>
    </div>
  </div>
</template>
