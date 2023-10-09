import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(
    localStorage.getItem("user-info")
      ? JSON.parse(localStorage.getItem("user-info"))
      : {}
  );

  const setUser = (u) => {
    user.value = u;
  };

  return {
    user,
    setUser,
  };
});
