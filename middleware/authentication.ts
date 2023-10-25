import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, initValue } = useUserStore();
  await initValue()
  console.log('middleware', user, isEmpty(user))
  if (isEmpty(user)) {
    return navigateTo("/login");
  }

  if (from.fullPath === "/profile") {
    return navigateTo(`profile/${user?.stravaId}`);
  }
});
