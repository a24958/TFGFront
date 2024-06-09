<script setup lang="ts">
import Button from 'primevue/button';
import router from '@/router';
import Card from 'primevue/card';



const load = async () => {
    router.push({ name: 'asignatura' })
}
</script>

<template>
        <article class="card">
            <Card style="width: 25rem ; overflow: hidden">
                <template  #header>
                    <div class="image">
                        <img alt="user header" src="@/assets/images/asignatura.jpg" />

                    </div>
                </template>
                <template #title>Cursos</template>
                <template #content>
                    <p class="m-0">
                        Añadir, Actualizar o Eliminar Asignaturas
                    </p>
                </template>
                <template #footer>
                    <div class="boton">
                        <Button @click="load" label="Asignatura" class="w-full" />
                    </div>
                </template>
            </Card>
        </article>
</template>

<style scoped>

@media screen and (min-width: 800px) {

}
img{
    height: 250px;
}

.boton{
    display: flex;
    flex-direction: column;
}
.image{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

