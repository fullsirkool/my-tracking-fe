import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async () => {
  const { user, initValue } = useUserStore()
  await initValue()
  if (!user) {
    return navigateTo('/login')
  }

  return navigateTo(`/profile/${user.id}`)
})
