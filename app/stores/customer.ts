export interface ICreateCustomer {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface ICustomer extends ICreateCustomer {
  id: number;
}
export const useCustomerStore = defineStore("customer", () => {
  const namespace = useRuntimeConfig().public?.apiNamespace  || '';
  const crm = useCRM(namespace);
  const customers = ref<ICustomer[]>([]);

  async function fetchCustomers() {
    try {
      const result = await crm.clients.list();
      customers.value = result.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function addCustomer(customerData: ICreateCustomer) {
    try {
      await crm.clients.create(customerData);
      await fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCustomer(id: number) {
    try {
      await crm.clients.delete(id);
      await fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  async function getCustomerById(id: number) {
    try {
      return await crm.clients.get(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { customers, fetchCustomers, addCustomer, deleteCustomer, getCustomerById };
});
