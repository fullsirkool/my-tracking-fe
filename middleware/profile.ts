import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  console.log("middleware", user.value);
  if (!user) {
    return navigateTo("/login");
  }

  return navigateTo(`profile/${user.id}`);
});
