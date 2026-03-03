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
    <UHeading level="1">Liste des clients</UHeading>


        <UCard v-for="customer in customers" :key="customer.id" clickable @click="navigateTo(`customers/${customer.id}`)">
            {{ customer.name }}
        </UCard>


    <UButton color="primary" @click="handleCreateCustomer">Ajouter un client</UButton>
</template>
