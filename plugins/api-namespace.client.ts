import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const apiNamespace = useRuntimeConfig().public.apiNamespace || ''
  nuxtApp.$apiNamespace = apiNamespace
  nuxtApp.provide('apiNamespace', apiNamespace)
  nuxtApp.vueApp.config.globalProperties.$apiNamespace = apiNamespace
  return {
    provide: {
      apiNamespace,
    },
  }
})
