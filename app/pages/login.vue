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



<UFormField label="Nom d'utilisateur" name="username">
             <UInput name="username" label="Nom d'utilisateur" placeholder="Username" />
</UFormField>
<UFormField label="Mot de passe" name="password">
             <UInput name="password" type="password" label="Mot de passe" placeholder="Password" />
</UFormField>

                <UButton type="submit" color="primary">Se connecter</UButton>
    </form>
</template>
