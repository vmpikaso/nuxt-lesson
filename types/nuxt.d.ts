declare module '#app' {
  interface NuxtApp {
    $apiNamespace: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apiNamespace: string
  }
}
