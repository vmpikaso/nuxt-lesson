import { watch } from "vue";
import { useRouter } from "#app";
import { useUserStore } from "./app/stores/user";

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  const router = useRouter();

  watch(
    () => userStore.isConnected,
    async (connected) => {
      try {
        if (connected) {
          if (router.currentRoute.value.path !== "/") {
            const res = await router.push("/");
          }
        } else {        
          if (router.currentRoute.value.path !== "/login") {
            const res = await router.push("/login");
          }
        }
      } catch (err) {
        console.error("Redirect error:", err);
      }
    },
    { immediate: true },
  );
});
