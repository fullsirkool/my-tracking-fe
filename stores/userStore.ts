import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(JSON.parse(localStorage.getItem('user-info')) || {});

  const setUser = (u) => {
    user.value = u;
  };

  return {
    user,
    setUser,
  };
});
