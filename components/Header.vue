<template>
  <div>
    <nav
      class="font-sans flex text-center justify-center sm:flex-row sm:text-left lg:justify-between items-center bg-primary-600 sticky top-0 z-20 shadow w-full px-5 py-2"
    >
      <div class="mb-0 mr-2.5">
        <UTooltip :text="$t('home')">
          <NuxtLink
            to="/"
            class="text-2xl no-underline text-grey-darkest hover:text-blue-dark inline-flex items-center justify-center w-[45px] h-[45px] rounded-full bg-slate-100 text-primary-600 shadow-xl mx-2"
          >
            <Icon
              name="basil:home-outline"
              width="38"
              height="38"
              class="relative"
              style="top: -1px"
            />
            <img src="~/assets/twendee-logo.png" />
          </NuxtLink>
        </UTooltip>
      </div>
      <div
        class="leading-10 text-4xl uppercase font-black text-slate-100 tracking-widest lg:absolute left-1/2 lg:-translate-x-1/2"
      >
        <NuxtLink to="/">Twendee Tracking</NuxtLink>
      </div>

      <LayoutAppMenuItems />
      <!-- <LayoutAppMenuItemsMobile /> -->
      <LayoutAppMenuItemsAlt />
    </nav>
  </div>

</template>
<script setup>
import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/user.store'

const userStore = useUserStore()
const adminStore = useAdminStore()

const user = computed(() => userStore.user)
const adminUser = computed(() => adminStore.user)
</script>
