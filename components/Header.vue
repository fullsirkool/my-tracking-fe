<template>
  <nav
    class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between sm:items-center bg-orange-600 sticky top-0 z-20 shadow w-full px-5 py-2"
  >
    <div class="mb-2 sm:mb-0">
      <UTooltip :text="$t('home')">
        <NuxtLink
          to="/"
          class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full bg-slate-100 text-orange-600 shadow-xl mx-2"
        >
          <Icon
            name="basil:home-outline"
            width="38"
            height="38"
            class="relative"
            style="top: -1px"
          />
        </NuxtLink>
      </UTooltip>
    </div>
    <div class="flex items-center">
      <UTooltip :text="$t('challenge')">
        <NuxtLink
          to="/challenge"
          class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full bg-slate-100 text-orange-600 shadow-xl mx-2"
        >
          <Icon name="ep:aim" class="relative" style="top: 1px" />
        </NuxtLink>
      </UTooltip>

      <template v-if="user && user.id">
        <UPopover class="inline-flex items-center">
          <NuxtLink
            class="text-lg text-grey-darkest hover:text-blue-dark ml-2 bg-transparent inline-flex items-center"
          >
            <UAvatar
              alt="Profile"
              size="lg"
              class="shadow-md"
              :src="user.profile"
            />
          </NuxtLink>

          <template #panel>
            <ul class="flex flex-col w-36">
              <NuxtLink
                class="inline-flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-orange-600"
                to="/profile"
              >
                View Profile
              </NuxtLink>
              <div class="border-b border-slate-100"></div>
              <CommonLanguageSwitcher></CommonLanguageSwitcher>
              <div class="border-b border-slate-100"></div>
              <NuxtLink
                class="inline-flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-orange-600"
                @click="logout"
              >
                <Icon
                  name="heroicons:arrow-right-on-rectangle-solid"
                  width="1.25rem"
                  height="1.25rem"
                />
                {{ $t('sign_out') }}
              </NuxtLink>
            </ul>
          </template>
        </UPopover>
      </template>
      <NuxtLink
        v-else
        to="/signin"
        class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
      >
        <UButton
          color="orange"
          variant="outline"
          :ui="{ rounded: 'rounded-full' }"
        >
          <template #leading>
            <Icon
              name="heroicons:arrow-left-end-on-rectangle-solid"
              width="1.5rem"
              height="1.5rem"
            />
          </template>
          {{ $t('sign_in') }}
        </UButton>
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()
const { logout } = userStore
const { user } = storeToRefs(userStore)
</script>
