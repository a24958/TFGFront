<script setup lang="ts">
import Curso from '@/components/Curso.vue';
import { cursoStore } from '@/stores/storeCurso';
import { storeToRefs } from 'pinia';
import { ref, onBeforeMount } from 'vue';

const store = cursoStore();
const { seatData: data } = storeToRefs(store);

const nuevoCurso = ref<{ nombreCurso: string }>({ nombreCurso: "" });

const agregarCurso = async () => {
    if (nuevoCurso.value.nombreCurso.trim()) {
        const addedCurso = await store.addCurso(nuevoCurso.value);
        if (addedCurso) {
            nuevoCurso.value.nombreCurso = ""; // Limpiar el campo del formulario después de agregar el curso
        }
    } else {
        alert("El nombre del curso no puede estar vacío");
    }
};

onBeforeMount(async () => {
    await store.getCursos();
});
</script>

<template>
    <section class="sessionContainer">
        <div>
            <h1>CURSOS DISPONIBLES</h1>

            <!-- Formulario para agregar un nuevo curso -->
            <form @submit.prevent="agregarCurso">
                <input v-model="nuevoCurso.nombreCurso" placeholder="Nombre del curso" />
                <button type="submit">Agregar Curso</button>
            </form>

            <div v-for="element in data" :key="element.id" class="sessionContainerItem">
                <Curso :id="element.id" :nombreCurso="element.nombreCurso"></Curso>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
