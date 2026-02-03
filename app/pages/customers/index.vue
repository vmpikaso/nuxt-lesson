<script setup lang="ts">
const {customers} = storeToRefs(useCustomerStore());
const {fetchCustomers, addCustomer} = useCustomerStore();


onMounted(async () => {
    await fetchCustomers();
}); 

async function handleCreateCustomer() {
    const suffix = Math.floor(Math.random() * 1000);
  const body = {
  "name": `Acme Corp ${suffix}`,
  "email": `contact${suffix}@acme.com`,
  "phone": "01 23 45 67 89",
  "company": "Acme Corporation"
}
await addCustomer(body);
await fetchCustomers();
}


</script>
<template>
    <h1 class="text-4xl">Liste des clients</h1>
    <ul>
        <li v-for="customer in customers" :key="customer.id" @click="navigateTo(`customers/${customer.id}`)" class="border-solid border-2 border-indigo-600 p-4 m-2 cursor-pointer"> 
            {{ customer.name }}
        </li>
    </ul>
    <button class="bg-green-500 text-white p-4 rounded" @click="handleCreateCustomer">Ajouter un client</button>
</template>
