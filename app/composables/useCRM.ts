interface IApiResponse<T> {
  data: T;
  token: string;
}

export function useCRM(namespace: string) {
  const baseUrl = `/api/crm/${namespace}`;

  return {
    clients: {
      list: () =>
        $fetch<IApiResponse<ICustomer[]>>(`${baseUrl}/clients`).then(
          ({ data }) => ({
            data,
          }),
        ),
      get: (id: number) =>
        $fetch<IApiResponse<ICustomer>>(`${baseUrl}/clients/${id}`).then(
          ({ data }) => data,
        ),
      create: (data: any) =>
        $fetch(`${baseUrl}/clients`, { method: "POST", body: data }),
      update: (id: number, data: any) =>
        $fetch(`${baseUrl}/clients/${id}`, { method: "PUT", body: data }),
      delete: (id: number) =>
        $fetch(`${baseUrl}/clients/${id}`, { method: "DELETE" }),
    },
    tasks: {
      list: () =>
        $fetch<IApiResponse<ITask[]>>(`${baseUrl}/tasks`).then(
          ({ data }) => data,
        ),
      get: (id: number) =>
        $fetch<IApiResponse<ITask>>(`${baseUrl}/tasks/${id}`).then(
          ({ data }) => data,
        ),
      create: (data: any) =>
        $fetch(`${baseUrl}/tasks`, { method: "POST", body: data }),
      delete: (id: number) =>
        $fetch(`${baseUrl}/tasks/${id}`, { method: "DELETE" }),
      // ... autres méthodes
    },
    auth: {
      register: (data: any) =>
        $fetch(`${baseUrl}/auth/register`, { method: "POST", body: data }),
      login: (data: { username: string; password: string }) =>
        $fetch<IApiResponse<{ username: string; email: string }>>(
          `${baseUrl}/auth/login`,
          { method: "POST", body: data },
        ).then(({ data, token }) => ({ user: data, token })),
    },
  };
}
