import { unref } from "vue";
import { useUserStore } from "./app/stores/user";

export default defineNuxtRouteMiddleware((to) => {
  // Skip server-side check to avoid SSR redirect when client holds auth state
  if (process.server) return;

  const userStore = useUserStore();
  const isConnected = unref(userStore.isConnected);
  const user = unref(userStore.user);

  const publicPaths = ["/", "/login"];
  // debug log to help troubleshooting
  console.debug("[auth] middleware", { path: to.path, isConnected, user });

  if (!isConnected && !publicPaths.includes(to.path)) {
    // when not authenticated, redirect to the login page
    return navigateTo("/login");
  }
});
