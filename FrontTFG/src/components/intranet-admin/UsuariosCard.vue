<script setup lang="ts">
import Button from 'primevue/button';
import router from '@/router';
import Card from 'primevue/card';


const load = async () => {
    router.push({ name: 'usuarios' })
}
</script>

<template>
    <article class="card">
        <Card style="width: 25rem ; overflow: hidden">
            <template #header>
                <div class="image">
                    <img alt="user header" src="@/assets/images/usuarios.jpg" />

                </div>
            </template>
            <template #title>Usuarios</template>
            <template #content>
                <p class="m-0">
                    Añadir, Actualizar o Eliminar Usuarios
                </p>
            </template>
            <template #footer>
                <div class="boton">
                    <Button @click="load" label="Usuarios" class="w-full" />
                </div>
            </template>
        </Card>
    </article>
</template>

<style scoped>
@media screen and (min-width: 800px) {}

img {
    height: 250px;
}

.boton {
    display: flex;
    flex-direction: column;
}

.image {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card {
    margin-bottom: 24px;
}
</style>
