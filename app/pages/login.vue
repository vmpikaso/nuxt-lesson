<script setup lang="ts">

const { isConnected } = storeToRefs(useUserStore());
const { login } = useUserStore();

async function onLogin(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries()) as { username: string; password: string };
    await login(formObj);
    if(isConnected) {
        navigateTo('/');
    }
}

onMounted(() => {
    if(isConnected) {
        navigateTo('/');
    }
});

</script>
<template>
    <form class="flex flex-col items-center justify-center min-h-screen gap-y-8" @submit="onLogin">
        <div class="flex flex-col">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" name="username" placeholder="Username" />
        </div>
        <div class="flex flex-col">
            <label for="password">Mot de passe</label>
                    <input type="password" name="password" placeholder="Password" />
        </div>

        <input class="p-2 text-white bg-indigo-600 rounded" type="submit" value="Se connecter"/>
    </form>
</template>
