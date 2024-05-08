<script setup lang="ts">

const props = defineProps<{
    id: number,
    temaJuego: string,
    codigo: string,
    tipoJuego: number
}>()

</script>

<template>
    <!-- <p>{{ id }}</p> -->
    <p>{{ temaJuego }}</p>
    <div v-if="tipoJuego==1">
        <RouterLink  :to="'/pasapalabra/'+ id"><button>JUEGOS</button></RouterLink>
    </div>

</template>
