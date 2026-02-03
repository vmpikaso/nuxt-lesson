import { watch } from "vue";
import { useRouter } from "#app";
import { useUserStore } from "./app/stores/user";

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  const router = useRouter();

  watch(
    () => userStore.isConnected,
    async (connected) => {
      console.log("Auth state changed, connected:", connected);
      try {
        if (connected) {
          if (router.currentRoute.value.path !== "/") {
            const res = await router.push("/");
            console.debug("router.push(/) result:", res);
          }
        } else {
          console.log(
            "User not connected, redirecting to /login",
            router.currentRoute.value.path !== "/login",
          );
          if (router.currentRoute.value.path !== "/login") {
            const res = await router.push("/login");
            console.debug("router.push(/login) result:", res);
          }
        }
      } catch (err) {
        console.error("Redirect error:", err);
      }
    },
    { immediate: true },
  );
});
