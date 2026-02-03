<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
let customer = ref<ICustomer | null>(null);

const { deleteCustomer, getCustomerById } = useCustomerStore();

onMounted(async () => {
    customer.value = await getCustomerById(Number(route.params.id));
});

async function handleDelete() {
    if (!customer?.value) return;
    const ok = confirm(`Confirmer la suppression de ${customer.value.name} ?`);
    if (!ok) return;
    await deleteCustomer(Number(route.params.id));
    router.push('/customers');
}

</script>
<template>
    <div>
        <div><span>{{ customer?.name }}</span></div>
        <div class="mt-4">
            <button class="bg-red-500 p-2 text-white rounded" @click="handleDelete">Supprimer le client</button>
        </div>
    </div>
</template>