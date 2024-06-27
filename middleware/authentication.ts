import { useAdminStore } from '~/stores/admin.store'
import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async (from) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()
  const adminUser = adminStore.getUser()
  const roleCookie = useCookie('role')

  // console.log('from.fullPath', from.fullPath)

  if (roleCookie.value === 'admin') {
    await adminStore.verifyUser()
    console.log('adminUser.value', adminUser.value)
    if (!adminUser.value) return navigateTo('/admin/signin')
  } else {
    await userStore.initValue()
    console.log('userStore.user', userStore.user)
    if (!userStore.user) return navigateTo('/signin')
  }

  // if (isEmpty(userStore.user)) {
  //   const savePath = from.fullPath
  //   localStorage.setItem('saved-path', savePath)
  //   return navigateTo('/signin')
  // }

  // if (from.fullPath === '/profile') {
  //   return navigateTo(`/profile/${userStore.user?.id}`)
  // }
})
