<script setup lang="ts">
import PasapalabraMultiplayer from '@/components/PasapalabraMultiplayer.vue';
import { pasapalabraStore } from '@/stores/storePasapalabra';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const store = pasapalabraStore();
onBeforeMount(async () => {
    await store.getMultiplayerPasapalabra();
})
const { seatData: data } = storeToRefs(store);

</script>

<template>
    <div>
        <PasapalabraMultiplayer :id="0" :name="'Pasapalabra Multijugador'" :preguntas1="data![0].preguntas"
            :preguntas2="data![1].preguntas"></PasapalabraMultiplayer>
    </div>
</template>

<style scoped>
div {
    height: 105vh;
    background: linear-gradient(#3663aff7, #005eff82);
}

@media screen and (min-width: 500px) {
    div {
        height: 120vh;
    }
}

@media screen and (min-width: 1440px) {
    div {
        height: 105vh;
    }
}
</style>