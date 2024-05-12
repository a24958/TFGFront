<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import { ref } from "vue";

const selectedGame = ref();

const games = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Zaragoza', code: 'PRS' },
    { name: 'Barcelona', code: 'PRS' },
    { name: 'Madrid', code: 'PRS' },
    { name: 'Sevilla', code: 'PRS' },
    { name: 'Bilbao', code: 'PRS' },
]);
</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedGame" :options="games" optionLabel="name" inputId="gm" class="w-full md:w-14rem"
                style="width: 14rem;" />
            <label for="gm">Tipo de Juego</label>
        </FloatLabel>
    </div>
</template>

<style scoped></style>