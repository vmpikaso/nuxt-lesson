<script setup lang="ts">

const {tasks} = storeToRefs(useTaskStore());

const {fetchTasks} = useTaskStore();
const router = useRouter();

onMounted(async () => {
    await fetchTasks();
});

</script>
<template>
<section>
    <div v-if="tasks?.length">

            <UCard v-for="task in tasks" :key="task.id" clickable @click="navigateTo(`/tasks/${task.id}`)">
                {{ task.title }}
            </UCard>

    </div>

    <UButton color="primary" @click.prevent="router.push('/tasks/create')">Ajouter une tâche</UButton>
</section>
</template>
