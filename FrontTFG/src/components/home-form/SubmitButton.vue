<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';

const loading = ref(false);

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};

</script>

<template>
    <div class="card flex justify-content-center">
        <Button type="button" label="Buscar Juegos" icon="pi pi-search" :loading="loading" @click="load" />
    </div>
</template>

<style scoped></style>