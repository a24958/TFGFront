<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import { onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from 'pinia';
import { gameTypeStore } from '@/stores/storeGameType';
import { gameFormStore } from '@/stores/storeGameForm';

const store = gameTypeStore();
const gameStore = gameFormStore();

onBeforeMount(async () => {
    await store.getTipoJuego();
})
const { seatData: data } = storeToRefs(store);
const selectedGame = ref();

watch(selectedGame, (newValue, oldValue) => {
    gameStore.fillRequestOption(newValue, "");
});

</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedGame" :options="data" optionLabel="tipo" inputId="gm" class="w-full md:w-14rem"
                style="width: 16rem;" />
            <label for="gm">Tipo de Juego</label>
        </FloatLabel>
    </div>
</template>

<style scoped></style>