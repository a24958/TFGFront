<script setup lang="ts">

const props = defineProps<{
    id: number,
    nombreAsignatura: string
}>()

</script>

<template>
    <!-- <p>{{ id }}</p> -->
    <p>{{ nombreAsignatura }}</p>
    <RouterLink  :to="'/asignatura/'+ id"><button>JUEGOS</button></RouterLink>

</template>
