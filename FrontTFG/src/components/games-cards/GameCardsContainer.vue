<script setup lang="ts">
import { gameFormStore } from '@/stores/storeGameForm';
import { storeToRefs } from 'pinia';
import GameCard from './GameCard.vue';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

interface BuscadorResponseBody {
    id: number,
    temaJuego: string,
    codigo: string,
    idAsignatura: number,
    idCurso: number,
    idTipoJuego: number
}
const loading = ref(false);
const store = gameFormStore();

onBeforeMount(async () => {
    await store.load(loading);
    store.restoreRequestOption();
})

const { seatData: cardsData } = storeToRefs(store);

</script>

<template>
    <h1>Encontrados {{ cardsData?.length }} juegos</h1>
    <div class="gameCardsContainer">
        <div v-for="(element, key) in cardsData" :key="key">
            <GameCard :id="element.id" :id-asignatura="element.idAsignatura" :id-curso="element.idCurso"
                :id-tipo-juego="element.idTipoJuego" :tema-juego="element.temaJuego"></GameCard>
        </div>
    </div>
</template>

<style scoped>
h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3B82F6;
}

.gameCardsContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center
}
</style>