import { unref } from "vue";
import { useUserStore } from "../stores/user";

export default defineNuxtRouteMiddleware(async (to) => {
  // Avoid running on the server where client store state may not be available
  if (import.meta.server) return;

  const userStore = useUserStore();

  // Ensure the store is initialised from localStorage (important after F5)
  try {
    if (userStore.hydrate)  userStore.hydrate();
  } catch (err) {
    // proceed even if hydration fails
    console.error("user store hydrate error in middleware:", err);
  }

  const isConnected = unref(userStore.isConnected);

  try {
    if (isConnected) {
      if (to.path === "/login") {
        return navigateTo("/");
      }
    } else {
      if (to.path !== "/login") {
        return navigateTo("/login");
      }
    }
  } catch (err) {
    console.error("auth-redirect middleware error:", err);
  }
});
