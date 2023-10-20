import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("from", from);
  const { user } = useUserStore();
  console.log("middleware", user, isEmpty(user));

  if (isEmpty(user)) {
    return navigateTo("/login");
  }

  if (from.fullPath === "/profile") {
    return navigateTo(`profile/${user?.stravaId}`);
  }
});
