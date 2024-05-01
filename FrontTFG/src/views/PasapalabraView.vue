<script setup lang="ts">
import Pasapalabra from '@/components/Pasapalabra.vue';
import { pasapalabraStore } from '@/stores/storePasapalabra';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const store = pasapalabraStore();
onBeforeMount(async () => {
    await store.getPasapalabraById();
})
const { seatData: data } = storeToRefs(store);


</script>

<template>
    <div v-for="element in data" :key="element.id">
        <Pasapalabra :id="element.id" :name="element.name" :preguntas="element.preguntas"></Pasapalabra>
    </div>
</template>

<style scoped></style>