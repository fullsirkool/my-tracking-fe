import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserStore();

  if (isEmpty(user)) {
    return navigateTo("/login");
  }

  if (from.fullPath === "/profile") {
    return navigateTo(`profile/${user?.stravaId}`);
  }
});
