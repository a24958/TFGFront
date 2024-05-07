<script setup lang="ts">

const props = defineProps<{
    id: number,
    temaJuego: string,
    codigo: string
}>()

</script>

<template>
    <!-- <p>{{ id }}</p> -->
    <p>{{ temaJuego }}</p>
    <!-- <RouterLink  :to="'/asignatura/'+ id"><button>JUEGOS</button></RouterLink> -->

</template>
