import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async (from) => {
  const { user, initValue } = useUserStore()
  await initValue()
  if (isEmpty(user)) {
    const savePath = from.fullPath
    localStorage.setItem('saved-path', savePath)
    return navigateTo('/login')
  }

  if (from.fullPath === '/profile') {
    return navigateTo(`/profile/${user?.id}`)
  }
})
