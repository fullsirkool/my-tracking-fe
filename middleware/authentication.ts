import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, initValue } = useUserStore();
  console.log('middleware', user)
  await initValue()
  if (isEmpty(user)) {
    return navigateTo("/login");
  }

  if (from.fullPath === "/profile") {
    return navigateTo(`profile/${user?.stravaId}`);
  }
});
