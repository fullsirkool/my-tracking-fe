import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async () => {
  const { user, initValue } = useUserStore()
  console.log('middleware', user)
  await initValue()
  if (!user) {
    return navigateTo('/login')
  }

  return navigateTo(`/profile/${user.id}`)
})
