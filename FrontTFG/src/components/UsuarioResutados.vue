<script setup lang="ts">
const props = defineProps<{
    idUsuario: number,
    idJuego: number,
    juego: string,
    completado: string,
    resultado: number,
    acertadas: number,
    falladas: number,
}>();
</script>

<template>
    <p>Juego: {{ juego }}</p>
    <p>Completado: {{ completado }}</p>
    <p>Resultado: {{ resultado }}</p>
    <p>Acertadas: {{ acertadas }}</p>
    <p>Falladas: {{ falladas }}</p>
</template>

<style scoped>
</style>
