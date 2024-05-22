<script setup lang="ts">
import GameGraph from '@/components/teachers-stadistics/GameGraph.vue';
import ErrorsGraph from '@/components/teachers-stadistics/ErrorsGraph.vue';
import CoursesGraph from '@/components/teachers-stadistics/CoursesGraph.vue';
</script>

<template>
    <h1>ESTADISTICAS GENERALES</h1>
    <div class="container">
        <div class="subjectGames">
            <h3>JUEGOS COMPLETADOS POR ASIGNATURA</h3>
            <GameGraph></GameGraph>
        </div>
        <div class="subjectErrors">
            <h3>PREGUNTAS FALLADAS POR ASIGNATURA</h3>
            <ErrorsGraph></ErrorsGraph>
        </div>
    </div>
    <br>
    <br>
    <br>
    <div class="container-courses">
        <h3>CURSOS MAS JUGADOS</h3>
        <CoursesGraph></CoursesGraph>
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