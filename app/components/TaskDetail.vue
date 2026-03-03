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

</script>
<template>
    <UCard v-if="task">
        <UHeading level="1">Tâche - {{ task.title }} (N° {{ id }})</UHeading>


            <UText><strong>Description:</strong></UText>
            <UCard >{{ task.description || '—' }}</UCard>

            <UText><strong>Statut:</strong> {{ task.status || '—' }}</UText>
            <UText><strong>Client (id):</strong> {{ task.client_id ?? '—' }}</UText>
            <UText><strong>Date d'échéance:</strong> {{ task.due_date || '—' }}</UText>

            <UButton  @click="handleDelete(id)">Supprimer la tâche</UButton>

    </UCard>
</template>