import { useRuntimeConfig } from '#app'

export function getBaseUrl() {
  const { public: { apiBaseUrl = '', apiNamespace = '' } = {} } = useRuntimeConfig();
  return `${apiBaseUrl}api/crm/${apiNamespace}/`;
}

