import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  console.log("middleware", user.value, !user.value);
  if (!user.value) {
    return navigateTo("/login");
  }

  return navigateTo(`profile/${user.value.stravaId}`);
});
