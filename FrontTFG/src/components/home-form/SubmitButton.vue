<script setup lang="ts">
import Button from 'primevue/button';
import { gameFormStore } from '@/stores/storeGameForm';
import { ref } from 'vue';

const store = gameFormStore();

const loading = ref(false);

const load = () => {
    store.load(loading);
}

</script>

<template>
    <div class="card flex justify-content-center">
        <Button type="button" label="Buscar Juegos" icon="pi pi-search" :loading="loading" @click="load" />
    </div>
</template>

<style scoped></style>