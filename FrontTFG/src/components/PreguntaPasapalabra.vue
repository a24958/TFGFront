<script setup lang="ts">
const props = defineProps<{
    id: number,
    pregunta: string,
    respuesta: string,
    letra: string,
    contestado: boolean,
    acertado: boolean,
}>()
</script>

<template>
    <div>
        <p>{{ letra }}</p>
        <p>{{ pregunta }}</p>
        <p>{{ respuesta }}</p>
    </div>
</template>

<style scoped></style>