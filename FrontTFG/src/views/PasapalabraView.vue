<script setup lang="ts">
import Pasapalabra from '@/components/Pasapalabra.vue';
import { pasapalabraStore } from '@/stores/storePasapalabra';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import router from "@/router";


let id = '';
for (const curso of router.currentRoute.value.params.id
) {
    id += curso
}

const store = pasapalabraStore();
onBeforeMount(async () => {
    await store.getPasapalabraById(id);
})
const { seatData: data } = storeToRefs(store);


</script>

<template>
    <div v-for="element in data" :key="element.id">
        <Pasapalabra :id="element.id" :name="element.name" :preguntas="element.preguntas"></Pasapalabra>
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