<script setup lang="ts">
import router from "@/router";
import { juegoStore } from '@/stores/storeJuego';

import Juego from './Juego.vue';
import { onBeforeMount, ref, toValue } from "vue";
import { storeToRefs } from "pinia";

const store = juegoStore();
let id = '';
for (const curso of router.currentRoute.value.params.id
) {
   id += curso 
}

onBeforeMount(async () => {
    await store.getAsignaturaJuegoById(id);
})

const { seatData: data } = storeToRefs(store);
interface AsignaturaJuego {
    id: number,
    juegoAsignatura: string,
    juegos: Juego[]
}

interface Juego {
    id: number;
    temaJuego: string,
    codigo: string

}


</script>
<template>
    <section class="sessionContainer">
        <div>
            <!-- {{data.id}}
            {{data.nombreAsignatura}} -->

        </div>
        <div>
            <h1>JUEGOS DISPONIBLES</h1>
            <div v-for="element in data" :key="element.id" class="sessionContainerItem">
                <Juego v-for="juego in element.juegos" :key="juego.id" :id="juego.id"
                    :temaJuego="juego.temaJuego" :codigo="juego.codigo">
                </Juego>
            </div>
        </div>
    </section>
</template>