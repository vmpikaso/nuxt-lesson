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
    <ul v-if="tasks?.length">
        <li class="border-solid border-2 border-indigo-600 p-4 m-2 cursor-pointer" v-for="task in tasks" :key="task.id" @click="navigateTo(`/tasks/${task.id}`)">{{ task.title }}</li>
    </ul>
    <button class="bg-green-500 p-2 text-white rounded" @click.prevent="router.push('/tasks/create')">Ajouter une tâche</button>
</section>
</template>
