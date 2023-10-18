import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("from", from);
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  console.log("middleware", user._rawValue, isEmpty(user._rawValue));
  
  if (isEmpty(user._rawValue)) {
    return navigateTo("/login");
  }

  if (from.fullPath === "/profile") {
    return navigateTo(`profile/${user.value.stravaId}`);
  }
});
