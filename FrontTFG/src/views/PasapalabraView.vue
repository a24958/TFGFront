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

<style scoped></style>