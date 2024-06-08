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
    <div class="result-details">
        <p> {{ juego }}</p>
        <p> {{ resultado }}</p>
        <p> {{ acertadas }}</p>
        <p> {{ falladas }} </p>
    </div>
</template>

<style scoped>
.result-details {
    display: flex;
    justify-content: space-evenly;
    padding: 10px;

}
.result-details p {
    margin: 5px 0;
}

p{
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
