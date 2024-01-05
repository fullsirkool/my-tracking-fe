import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async (from) => {
  const { user, initValue } = useUserStore()
  console.log('middleware', user)
  await initValue()
  if (isEmpty(user)) {
    const savePath = from.fullPath
    localStorage.setItem('saved-path', savePath)
    return navigateTo('/signin')
  }

  if (from.fullPath === '/profile') {
    return navigateTo(`/profile/${user?.id}`)
  }
})
