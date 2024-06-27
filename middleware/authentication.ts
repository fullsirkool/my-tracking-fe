import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async (from) => {
  // const { user, initValue } = useUserStore()
  const userStore = useUserStore()
  const adminStore = useAdminStore()
  console.log('middleware', userStore.user)
  const adminUser = adminStore.getUser()

  console.log('from.fullPath', from.fullPath)
  if (from.fullPath.startsWith('/admin') && !adminUser) {
    // return navigateTo('/admin/signin')
  }

  await userStore.initValue()
  if (isEmpty(userStore.user)) {
    const savePath = from.fullPath
    localStorage.setItem('saved-path', savePath)
    return navigateTo('/signin')
  }

  if (from.fullPath === '/profile') {
    return navigateTo(`/profile/${userStore.user?.id}`)
  }
})
