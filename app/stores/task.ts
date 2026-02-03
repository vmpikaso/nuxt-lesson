import { defineStore } from "pinia";
import { ref } from "vue";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  client_id: number;
  due_date: string;
}

export const useTaskStore = defineStore("task", () => {
  const namespace = useRuntimeConfig().public?.apiNamespace  || '';
  const crm = useCRM(namespace);
  const tasks = ref<ITask[]>([]);

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getTaskById(id: number) {
    return await crm.tasks.get(id);
  }

  async function addTask(taskData: {
    title: string;
    description?: string;
    status?: string;
    client_id: number;
    due_date?: string;
  }) {
    try {
      await crm.tasks.create(taskData);
      await fetchTasks();
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteTask(id: number) {
    await crm.tasks.delete(id);
  }

  async function fetchTasks() {
    loading.value = true;
    error.value = null;

    try {
      tasks.value = await crm.tasks.list();
    } catch (e) {
      error.value = "Failed to fetch tasks";
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return {
    tasks,
    getTaskById,
    addTask,
    deleteTask,
    fetchTasks,
    loading,
    error,
  };
});
