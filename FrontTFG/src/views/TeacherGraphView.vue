<script setup lang="ts">
import GameGraph from '@/components/teachers-stadistics/GameGraph.vue';
import ErrorsGraph from '@/components/teachers-stadistics/ErrorsGraph.vue';
import CoursesGraph from '@/components/teachers-stadistics/CoursesGraph.vue';
import TeacherIntranetMenu from '@/components/general-utils/TeacherIntranetMenu.vue';
import UsuarioResultados from '@/components/teachers-stadistics/UsuarioResutados.vue';
import UsuarioTituloResultados from '@/components/teachers-stadistics/UsuarioTituloResutados.vue';
import { resultadosStore } from '@/stores/storeResultados';
import Resultados from '@/components/teachers-stadistics/Resultados.vue';


import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import router from "@/router";

const store = resultadosStore();

const userData = localStorage.getItem('userData');
const id = userData ? JSON.parse(userData).id : null;
onBeforeMount(async () => {
    await store.getResultadosProfesor(id);
});

const { resultado: data } = storeToRefs(store);

</script>

<template>
    <TeacherIntranetMenu></TeacherIntranetMenu>
    <h1>ESTADISTICAS GENERALES</h1>
    <div class="container">
        <div class="subjectGames">
            <h3>JUEGOS COMPLETADOS POR ASIGNATURA</h3>
            <GameGraph></GameGraph>
        </div>
        <div class="subjectErrors">
            <h3>CURSOS MAS JUGADOS</h3>
            <CoursesGraph></CoursesGraph>
        </div>
    </div>
    <br>
    <br>
    <br>
    <div class="container-courses">
        <!-- <UsuarioTituloResultados></UsuarioTituloResultados> -->
        <!-- <div v-for="element in data"  class="result-item">
            <UsuarioResultados :juego="element.juego" :usuario="element.usuario" 
                :acertadas="element.acertadas" :resultado="element.resultado"
                :falladas="element.falladas" />
        </div> -->
        <Resultados></Resultados>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.container-courses {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

h1,
h3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #3B82F6;
}
</style>