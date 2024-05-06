<script setup lang="ts">
import Curso from '@/components/Curso.vue';
import { cursoStore } from '@/stores/storeCurso';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const store = cursoStore();
// onBeforeMount(async () => {
//     await store.getCursos();
// })
// const { seatData: data } = storeToRefs(store);


const cursos = store.cursos;


</script>

<template>
    <div v-for="element in cursos" :key="element.id">
        <Curso :id="element.id" :nombreCurso="element.nombreCurso"></Curso>
    </div>
</template>

<style scoped></style>