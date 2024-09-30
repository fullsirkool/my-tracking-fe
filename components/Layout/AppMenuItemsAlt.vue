<script setup>
import { useUserStore } from '~/stores/user.store'
import { useAdminStore } from '~/stores/admin.store'

const userStore = useUserStore()
const adminStore = useAdminStore()
const route = useRoute()

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
    class="items-center lg:hidden fixed flex flex-row-reverse justify-between z-50 left-0 bottom-0 bg-[#eee] border-t w-full overflow-x-auto"
  >
    <template v-if="isUser">
      <UPopover class="inline-flex items-center">
        <NuxtLink
          class="text-lg text-grey-darkest hover:text-blue-dark ml-2 bg-transparent inline-flex items-center"
        >
          <UAvatar
            alt="Profile"
            size="md"
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
              <Icon name="heroicons:user" width="1.5rem" height="1.5rem" />
              {{ $t('view_profile') }}
            </NuxtLink>
            <div class="border-b border-slate-100"></div>
            <NuxtLink
              class="inline-flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-primary-600"
              @click="logout"
            >
              <Icon
                name="heroicons:arrow-right-on-rectangle-solid"
                width="1.5rem"
                height="1.5rem"
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
          class="flex flex-col no-underline text-grey-darkest hover:text-blue-dark items-center justify-center p-2"
        >
          <Icon name="mdi:user" width="1.5rem" height="1.5rem" />
          <span class="text-xs whitespace-nowrap"> {{ $t('account') }} </span>
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

    <NuxtLink
      v-else
      to="/signin"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
    >
      <Icon
        name="heroicons:arrow-left-end-on-rectangle-solid"
        style="top: -1px"
      />
      <span class="text-xs">
        {{ $t('sign_in') }}
      </span>
    </NuxtLink>
    <NuxtLink
      v-if="isAdmin"
      to="/challenge/create"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: route.name === 'challenge-create' }"
    >
      <Icon name="system-uicons:create" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        {{ $t('create_challenge') }}
      </span>
    </NuxtLink>

    <NuxtLink
      v-if="isAdmin"
      to="/article/create"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: route.name === 'article-create' }"
    >
      <Icon name="mdi:newspaper-plus" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        {{ $t('create_article') }}
      </span>
    </NuxtLink>

    <NuxtLink
      to="/challenge"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: ['challenge', 'challenge-id'].includes(route.name) }"
    >
      <Icon name="fluent:run-16-filled" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        {{ $t('view_challenge') }}
      </span>
    </NuxtLink>

    <NuxtLink
      to="/article"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: ['article', 'article-id'].includes(route.name) }"
    >
      <Icon
        name="mdi:newspaper-variant-outline"
        width="1.5rem"
        height="1.5rem"
      />
      <span class="text-xs whitespace-nowrap">
        {{ $t('warm_feet_activity') }}
      </span>
    </NuxtLink>

    <NuxtLink
      v-if="isAdmin"
      to="/admin/payment"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: route.name === 'admin-payment' }"
    >
      <Icon name="fa6-solid:dollar-sign" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        {{ $t('payment') }}
      </span>
    </NuxtLink>

    <NuxtLink
      v-if="isAdmin"
      to="/admin/athletes"
      class="flex flex-col no-underline text-grey-darkest hover:text-blue-dark items-center justify-center p-2"
      :class="{ active: route.name === 'admin-athletes' }"
    >
      <Icon name="mdi:accounts-group-outline" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        {{ $t('athletes') }}
      </span>
    </NuxtLink>
    <NuxtLink
      v-if="!isAdmin"
      to="/guide"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: route.name === 'guide' }"
    >
      <Icon name="material-symbols:help-outline" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        HDSD
      </span>
    </NuxtLink>
    <NuxtLink
      to="/"
      class="flex flex-col no-underline text-grey-darkest items-center justify-center p-2"
      :class="{ active: route.name === 'index' }"
    >
      <Icon name="fluent:home-16-regular" width="1.5rem" height="1.5rem" />
      <span class="text-xs whitespace-nowrap">
        {{ $t('home_page') }}
      </span>
    </NuxtLink>

  </div>
</template>

<style scoped lang="scss">
.text-xxs {
  font-size: 8px;
}

.active {
  @apply bg-primary-600;
  @apply text-white;
}
</style>
