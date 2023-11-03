import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, initValue } = useUserStore();
  console.log("middleware", user);
  await initValue();
  if (!user) {
    return navigateTo("/login");
  }

  return navigateTo(`/profile/${user.stravaId}`);
});
