<template>
  <nav
    class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
    <div class="mb-2 sm:mb-0">
      <NuxtLink to="/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
        {{ $t('home') }}
      </NuxtLink>
    </div>
    <div class="flex items-center gap-4">
      <NuxtLink to="/challenge" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
        {{ $t('challenge') }}
      </NuxtLink>
      <template v-if="user && user.profile">
        <NuxtLink to="/profile" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
          <UAvatar alt="Profile" size="lg" :src="user.profile" />
        </NuxtLink>
        <a href="javascript:void(0)" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2" @click="logout">Sign Out</a>
      </template>
      <NuxtLink v-else to="/login" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
        {{ $t('sign_in') }}
      </NuxtLink>
      <CommonLanguageSwitcher></CommonLanguageSwitcher>
    </div>
  </nav>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/stores/userStore';
const userStore = useUserStore()
const { logout } = userStore
const { user } = storeToRefs(userStore)
</script>