<template>
  <nav
      class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full"
  >
    <div class="mb-2 sm:mb-0">
      <NuxtLink
          to="/"
          class="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
      >
        {{ $t('home') }}
      </NuxtLink>
    </div>
    <div class="flex items-center gap-4">
      <NuxtLink
          to="/challenge"
          class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
      >
        {{ $t('challenge') }}
      </NuxtLink>
      <template v-if="user && user.id">
        <NuxtLink
            to="/profile"
            class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
        >
          <UAvatar alt="Profile" size="lg" :src="user.profile"/>
        </NuxtLink>
        <UButton color="orange" variant="outline" :ui="{ rounded : 'rounded-full' }" @click="logout" >
          <template #leading>
            <Icon name="heroicons:arrow-right-on-rectangle-solid" width="1.5rem" height="1.5rem"/>
          </template>
          {{ $t('sign_out') }}
        </UButton>
      </template>
      <NuxtLink
          v-else
          to="/signin"
          class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
      >
        <UButton color="orange" variant="outline" :ui="{ rounded: 'rounded-full' }">
          <template #leading>
            <Icon name="heroicons:arrow-left-end-on-rectangle-solid" width="1.5rem" height="1.5rem"/>
          </template>
          {{ $t('sign_in') }}
        </UButton>
      </NuxtLink>

      <CommonLanguageSwitcher></CommonLanguageSwitcher>
    </div>
  </nav>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useUserStore} from '~/stores/userStore'

const userStore = useUserStore()
const {logout} = userStore
const {user} = storeToRefs(userStore)
</script>
