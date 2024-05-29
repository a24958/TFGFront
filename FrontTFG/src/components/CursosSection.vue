<script setup lang="ts">
import Curso from '@/components/Curso.vue';
import { cursoStore } from '@/stores/storeCurso';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const store = cursoStore();
onBeforeMount(async () => {
    await store.getCursos();
})
const { seatData: data } = storeToRefs(store);


</script>

<template>
    <div v-for="element in data" :key="element.id">
        <Curso :id="element.id" :nombreCurso="element.nombreCurso"></Curso>
    </div>
</template>

<style scoped></style>