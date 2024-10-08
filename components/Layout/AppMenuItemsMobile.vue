<script setup>
import { useUserStore } from '~/stores/user.store'
import { useAdminStore } from '~/stores/admin.store'

const userStore = useUserStore()
const adminStore = useAdminStore()

const user = computed(() => userStore.user)
const adminUser = computed(() => adminStore.user)

const isAdmin = computed(() => !!adminUser.value)
const isUser = computed(() => !!user.value)

const logout = () => {
  userStore.logout()
  adminStore.logout()
  location.reload()
}
</script>

<template>
  <div
    class="items-center lg:hidden fixed flex flex-col-reverse gap-3 left-3 bottom-3 z-50"
  >
    <UTooltip v-if="isAdmin" :text="$t('create_challenge')">
      <NuxtLink
        to="/challenge/create"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full text-slate-100 bg-primary-600 shadow-xl mx-2"
      >
        <Icon name="system-uicons:create" />
      </NuxtLink>
    </UTooltip>
    <UTooltip :text="$t('view_challenge')">
      <NuxtLink
        to="/challenge"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full text-slate-100 bg-primary-600 shadow-xl mx-2"
      >
        <Icon name="fluent:run-16-filled" class="relative" />
      </NuxtLink>
    </UTooltip>

    <UTooltip v-if="isAdmin" :text="$t('payment')">
      <NuxtLink
        to="/admin/payment"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full text-slate-100 bg-primary-600 shadow-xl mx-2"
      >
        <Icon name="fa6-solid:dollar-sign" class="relative" />
      </NuxtLink>
    </UTooltip>

    <UTooltip v-if="isAdmin" :text="$t('athletes')">
      <NuxtLink
        to="/admin/athletes"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full text-slate-100 bg-primary-600 shadow-xl mx-2"
      >
        <Icon name="mdi:accounts-group-outline" class="relative" />
      </NuxtLink>
    </UTooltip>

    <template v-if="isUser">
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
          <ul class="flex flex-col w-36 items-start">
            <NuxtLink
              class="inline-flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-primary-600"
              to="/profile"
            >
              <Icon name="heroicons:user" width="1.25rem" height="1.25rem" />
              {{ $t('view_profile') }}
            </NuxtLink>
            <div class="border-b border-slate-100"></div>

            <div class="border-b border-slate-100"></div>
            <NuxtLink
              class="inline-flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-primary-600"
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

    <template v-else-if="isAdmin">
      <UPopover class="inline-flex items-center">
        <NuxtLink
          class="text-2lg text-grey-darkest hover:text-blue-dark bg-transparent inline-flex justify-center items-center bg-white text-primary-600 w-[45px] h-[45px] rounded-full shadow"
        >
          <Icon name="mdi:user" width="1.25rem" height="1.25rem" />
        </NuxtLink>

        <template #panel>
          <ul class="flex flex-col w-36">
            <div class="border-b border-slate-100"></div>
            <NuxtLink
              class="inline-flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-primary-600"
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

    <UTooltip v-else :text="$t('sign_in')">
      <NuxtLink
        to="/signin"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full bg-slate-100 text-primary-600 shadow-xl mx-2"
      >
        <Icon
          name="heroicons:arrow-left-end-on-rectangle-solid"
          style="top: -1px"
        />
      </NuxtLink>
    </UTooltip>
  </div>
</template>
