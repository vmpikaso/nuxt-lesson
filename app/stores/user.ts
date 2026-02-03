export const useUserStore = defineStore("user", () => {
  const namespace = useRuntimeConfig().public?.apiNamespace  || '';
  const crm = useCRM(namespace);
  const user = ref<{ username: string; email: string } | null>(null);
  const token = ref<string | null>(null);

  // isConnected is based on the presence of a token
  const isConnected = computed(() => token.value !== null);

  // hydrate from localStorage on client
    // Provide an explicit hydrate method so callers (middleware) can initialise
    // the store from localStorage at the right time (e.g. after a full page reload).
    function hydrate() {
      if (!import.meta.client) return;
      try {
        const storedToken = localStorage.getItem("auth.token");
        const storedUser = localStorage.getItem("auth.user");
        if (storedToken) token.value = storedToken;
        if (storedUser) user.value = JSON.parse(storedUser);
      } catch (err) {
        console.error("user store hydration error:", err);
      }
    }

  async function login(body: { username: string; password: string }) {
    const { user: loggedInUser, token: newToken } = await crm.auth.login(body);
    user.value = loggedInUser;
    token.value = newToken ?? null;
    if (import.meta.client) {
      try {
        if (token.value) localStorage.setItem("auth.token", token.value);
        if (user.value) localStorage.setItem("auth.user", JSON.stringify(user.value));
      } catch (err) {
        console.error("user store persist error:", err);
      }
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    if (import.meta.client) {
      try {
        localStorage.removeItem("auth.token");
        localStorage.removeItem("auth.user");
      } catch (err) {
        console.error("user store clear error:", err);
      }
    }
  }

    return { user, isConnected, login, logout, hydrate };
});
