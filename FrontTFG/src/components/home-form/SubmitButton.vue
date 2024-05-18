<script setup lang="ts">
import Button from 'primevue/button';
import { gameFormStore } from '@/stores/storeGameForm';
import { ref } from 'vue';
import router from '@/router';

const store = gameFormStore();

const loading = ref(false);

const load = async () => {
    const test = await store.load(loading);
    test != 1 ? router.push({ name: 'game-search-result' }) : router.push({ name: 'pasapalabra-id' })
}

</script>

<template>
    <div class="card flex justify-content-center">
        <Button type="button" label="Buscar Juegos" icon="pi pi-search" :loading="loading" @click="load" />
    </div>
</template>

<style scoped></style>