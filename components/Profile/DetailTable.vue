<template>
  <UCard
    class="rounded-2xl bg-[#f5f5f5] overflow-auto min-h-[300px]"
    style="box-shadow: none"
  >
    <div>
      <UTabs v-model="selected" :items="tabs">
        <template #default="{ item, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
            <div class="truncate font-semibold text-xl">
              {{ item.label }}</div
            >
            <span
              v-if="selected"
              class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
            />
          </div>
        </template>
        <template #activities>
          <ProfileActivityTable />
        </template>
        <template #joined-challenges>
          <ProfileJoinedChallengeTable />
        </template>
        <template #ticket>
          <ProfileTicketTable/>
        </template>
      </UTabs>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user.store'
import { useProfileStore } from '~/stores/profile.store'

const { t } = useI18n()
const profileStore = useProfileStore()
const { user } = storeToRefs(profileStore)
const userStore = useUserStore()

const isProfileOwner = computed(() => {
  console.log(user.value, userStore.user)
  const currentUser = userStore.user
  if (!currentUser || currentUser.id !== user.value.id) {
    return false
  }
  return true
})

const tabs = computed(() => {
  if (isProfileOwner.value) {
    console.log('tab', 1)
    return [
      {
        slot: 'activities',
        icon: 'i-heroicons-bolt',
        label: t('activities')
      },
      {
        slot: 'joined-challenges',
        icon: 'i-heroicons-bolt',
        label: t('joined_challenge')
      },
      {
        slot: 'ticket',
        icon: 'i-heroicons-ticket',
        label: t('ticket')
      }
    ]
  }
  console.log('tab', 2)
  return [
    {
      slot: 'activities',
      icon: 'i-heroicons-bolt',
      label: t('activities')
    },
    {
      slot: 'joined-challenges',
      icon: 'i-heroicons-bolt',
      label: t('joined_challenge')
    }
  ]
})

const route = useRoute()
const router = useRouter()

const selected = computed({
  get () {
    const index = tabs.value.findIndex((item) => item.slot === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({ query: { tab: tabs.value[value].slot } })
  }
})
</script>
