// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
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
