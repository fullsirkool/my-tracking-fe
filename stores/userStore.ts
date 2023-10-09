import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const setUser = (u) => {
    user.value = u;
  };

  const initValue = () => {
    const loadedInfo = localStorage.getItem("user-info");
    if (typeof loadedInfo === "string") {
      user.value = JSON.parse(loadedInfo);
    }
  };

  initValue()

  return {
    user,
    setUser,
  };
});
