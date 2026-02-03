<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
  <div class="max-w-lg mx-auto">
    <h1 class="text-2xl mb-4">Créer une tâche</h1>
    <form @submit="handleSubmit" class="space-y-4">
      <div>
        <label class="block">Titre</label>
        <input v-model="title" class="w-full border p-2" required/>
      </div>
      <div>
        <label class="block">Description</label>
        <textarea v-model="description" class="w-full border p-2"></textarea>
      </div>
      <div>
        <label class="block">Client</label>
        <select v-model="client_id" class="w-full border p-2" required>
          <option :value="null">-- Sélectionner --</option>
          <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label class="block">Statut</label>
        <select v-model="status" class="w-full border p-2">
          <option value="pending">pending</option>
          <option value="in_progress">in_progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <div>
        <label class="block">Date d'échéance (ISO)</label>
        <input v-model="due_date" class="w-full border p-2" placeholder="2026-02-10T10:00:00.000Z" />
      </div>
      <div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">Créer</button>
        <button type="button" class="ml-2 p-2" @click.prevent="router.push('/tasks')">Annuler</button>
      </div>
    </form>
  </div>
</template>
