<template>
  <nav
    class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 mb-4 bg-white shadow sm:items-baseline w-full">
    <div class="mb-2 sm:mb-0">
      <NuxtLink to="/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
        {{ $t('home') }}
      </NuxtLink>
    </div>
    <div class="flex items-center gap-4">
      <NuxtLink to="/challenge" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
        {{ $t('challenge') }}
      </NuxtLink>
      <NuxtLink v-if="user && user.profile" to="/profile"
        class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
        <UAvatar alt="Profile" size="xl" :src="user.profile" />
      </NuxtLink>
      <CommonLanguageSwitcher></CommonLanguageSwitcher>
    </div>
  </nav>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

</script>