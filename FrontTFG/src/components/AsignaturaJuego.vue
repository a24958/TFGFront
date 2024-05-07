<script setup lang="ts">

const props = defineProps<{
    id: number,
    juegoAsignatura: string
}>()

</script>

<template>
    <p>{{ id }}</p>
    <p>{{ juegoAsignatura }}</p>
    <RouterLink  :to="'/asignatura-juego/'+ id"><button>JUEGOS</button></RouterLink>

</template>
