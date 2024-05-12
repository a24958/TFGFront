<script setup lang="ts">
import GameSelector from '@/components/home-form/GameSelector.vue';
import ClearSelector from '@/components/home-form/ClearSelector.vue';
import SubmitButton from '@/components/home-form/SubmitButton.vue';
import { ref } from 'vue';

//TODO WIP REMOVE ITS ONLY FOR TESTING
const courses = ref([
    { name: '1º Primaria' },
    { name: '2º Primaria' },
    { name: '3º Primaria' },
    { name: '4º Primaria' },
    { name: '5º Primaria' },
    { name: '6º Primaria' },
]);

const subjects = ref([
    { name: 'Lengua' },
    { name: 'Matemáticas' },
    { name: 'Inglés' },
    { name: 'Historia' },
    { name: 'Biología' },
    { name: 'Geología' },
]);
</script>

<template>
    <div class="gameForm-container">
        <h1>BUSCAR JUEGOS</h1>
        <GameSelector></GameSelector>
        <ClearSelector :label-text="'Curso'" :item-list="courses"></ClearSelector>
        <ClearSelector :label-text="'Asignatura'" :item-list="subjects"></ClearSelector>
        <SubmitButton></SubmitButton>
    </div>
</template>

<style scoped>
.gameForm-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 350px;
}

h1 {
    color: #3B82F6;
}
</style>