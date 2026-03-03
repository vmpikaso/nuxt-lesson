<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { storeToRefs } from 'pinia';

const router = useRouter();
const { customers } = storeToRefs(useCustomerStore());
const { fetchCustomers } = useCustomerStore();
const { addTask } = useTaskStore();

const title = ref('');
const description = ref('');
const status = ref('pending');
const client_id = ref<number | null>(null);
const due_date = ref('');
const customerOptions = computed(() => (customers?.value || []).map(c => ({ label: c.name, value: c.id })));
const statusOptions = [
  { label: 'pending', value: 'pending' },
  { label: 'in_progress', value: 'in_progress' },
  { label: 'done', value: 'done' }
];

onMounted(async () => {
  await fetchCustomers();
});

async function handleSubmit(event: Event) {
  event.preventDefault();
  if (!client_id.value) {
    alert('Le client est requis.');
    return;
  }

  const payload = {
    title: title.value,
    description: description.value,
    status: status.value,
    client_id: Number(client_id.value),
    due_date: due_date.value || undefined,
  };

  await addTask(payload as any);
  router.push('/tasks');
}
</script>

<template>
  <UContainer maxWidth="lg">
    <UHeading level="2">Créer une tâche</UHeading>

    <UForm @submit.prevent="handleSubmit">

        <UInput v-model="title" label="Titre" required />

        <UTextarea v-model="description" label="Description" />

        <USelect v-model="client_id" :options="customerOptions" placeholder="-- Sélectionner --" label="Client" required />

        <USelect v-model="status" :options="statusOptions" label="Statut" />

        <UInput v-model="due_date" label="Date d'échéance (ISO)" placeholder="2026-02-10T10:00:00.000Z" />

        <div>
          <UButton type="submit" color="primary">Créer</UButton>
          <UButton type="button" variant="ghost" @click.prevent="router.push('/tasks')" style="margin-left:8px">Annuler</UButton>
        </div>

    </UForm>
  </UContainer>
</template>
