<script setup lang="ts">
import { onMounted } from 'vue';

const route = useRoute();
const id = Number(route.params.id);

const { deleteTask, getTaskById } = useTaskStore();

const task = await getTaskById(id);

const handleDelete = async (taskId: number) => {
    await deleteTask(taskId);
    navigateTo('/tasks');
};

onMounted(() => {
    console.log('TaskDetail mounted');
});

</script>
<template>
    <div v-if="task" class="p-2">
        <h1 class="text-2xl">Tâche - {{ task.title }} (N° {{ id }})</h1>

        <div class="mt-4">
            <div><strong>Description:</strong></div>
            <div class="border p-2 rounded mt-1">{{ task.description || '—' }}</div>
        </div>

        <div class="mt-2"><strong>Statut:</strong> {{ task.status || '—' }}</div>

        <div class="mt-2"><strong>Client (id):</strong> {{ task.client_id ?? '—' }}</div>

        <div class="mt-2"><strong>Date d'échéance:</strong> {{ task.due_date || '—' }}</div>

        <div class="mt-4">
            <button class="bg-red-500 p-2 text-white rounded" @click="handleDelete(id)">Supprimer la tâche</button>
        </div>
    </div>
</template>