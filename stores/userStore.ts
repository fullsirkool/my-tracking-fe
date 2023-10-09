import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const setUser = (u) => {
    user.value = u;
  };

  return {
    user,
    setUser,
  };
});
