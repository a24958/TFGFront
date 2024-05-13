<script setup lang="ts">
import GameSelector from '@/components/home-form/GameSelector.vue';
import ClearSelector from '@/components/home-form/ClearSelector.vue';
import SubmitButton from '@/components/home-form/SubmitButton.vue';
import Fieldset from 'primevue/fieldset';
import { cursoStore } from '@/stores/storeCurso';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { asignaturaJuegoStore } from '@/stores/storeAsignaturaJuego';

const cursosStore = cursoStore();
const asignaturasStore = asignaturaJuegoStore();

onBeforeMount(async () => {
    await cursosStore.getCursos();
    await asignaturasStore.getAsignaturas();
})
const { seatData: cursosData } = storeToRefs(cursosStore);
const { setAsignatuaJuegoData: asignaturasData } = storeToRefs(asignaturasStore);
</script>

<template>
    <Fieldset legend="BUSCADOR" class="h1">
        <div class="gameForm-container">
            <GameSelector></GameSelector>
            <ClearSelector :label-text="'Curso'" :item-list="cursosData"></ClearSelector>
            <ClearSelector :label-text="'Asignatura'" :item-list="asignaturasData"></ClearSelector>
            <SubmitButton></SubmitButton>
        </div>
    </Fieldset>
</template>

<style scoped>
.gameForm-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 275px;
    margin-top: 24px;
}

span {
    color: #3B82F6;
}
</style>