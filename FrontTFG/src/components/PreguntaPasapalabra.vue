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
        <!-- <p>{{ pregunta }}</p>
        <p>{{ respuesta }}</p> -->
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    height: 38px;
    width: 38px;
    border-radius: 50%;
    background-color: rgb(0, 123, 255);
    color: white;
}
</style>