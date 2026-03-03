// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui"],
  runtimeConfig: {
    public: {
      apiBaseUrl: import.meta.env.NUXT_API_BASE_URL || "",
      apiNamespace: import.meta.env.NUXT_API_NAMESPACE || "",
    },
  },

  // Nuxt config here:
  css: ["/assets/css/app.css"],

  routeRules: {
    "api/**": {
      proxy: {
        to: import.meta.env.NUXT_API_BASE_URL + "api/**",
        fetchOptions: {
          credentials: "include",
        },
      },
    },
  },
});
