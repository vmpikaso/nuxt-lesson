<script setup>
import { useUserStore } from '~/stores/user';

const {isConnected,user} = storeToRefs(useUserStore());
const {logout} = useUserStore();

function handleLogout() {
    logout();
    navigateTo('/login');
}

</script>
<template>
    <main class="">
        <header class="flex justify-between bg-blue-500 text-white p-2">
            <h1 class="text-5xl">CRM</h1>
            <ul v-if="isConnected" class="flex gap-2 p-4">
                <li><NuxtLink to="/">Accueil</NuxtLink></li>
                <li><NuxtLink to="/customers">Clients</NuxtLink></li>
                <li><NuxtLink to="/tasks">Tâches</NuxtLink></li>
            </ul>
            <div class="p-2">
                <button v-if="isConnected" @click="handleLogout">{{ user.email }}</button>
            </div>
        </header>
        <div class="p-4 flex justify-center gap-y-8 items-center flex-col">
            <slot />
        </div>
        <footer>
            <p>© 2024 - My CRM App</p>
        </footer>
    </main>
</template>