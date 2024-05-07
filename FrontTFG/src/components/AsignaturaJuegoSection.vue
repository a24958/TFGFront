<script setup lang="ts">
import router from "@/router";
import { asignaturaJuegoStore } from '@/stores/storeAsignaturaJuego';

import AsignaturaJuego from './AsignaturaJuego.vue';
import { onBeforeMount, ref, toValue } from "vue";
import { storeToRefs } from "pinia";

const store = asignaturaJuegoStore();
let id = '';
for (const curso of router.currentRoute.value.params.id
) {
   id += curso 
}

onBeforeMount(async () => {
    await store.getAsignaturaById(id);
})

const { seatData: data } = storeToRefs(store);

interface Asignatura {
    id: number,
    nombreAsignatura: string,
    asignaturasJuegos: AsignaturaJuego[]
}

interface AsignaturaJuego {
    id: number;
    juegoAsignatura: string,

}


</script>
<template>
    <section class="sessionContainer">
        <div>
            <!-- {{data.id}}
            {{data.nombreAsignatura}} -->

        </div>
        <div>
            <h1>ASIGNATURAS DISPONIBLES</h1>
            <div v-for="element in data" :key="element.id" class="sessionContainerItem">
                <AsignaturaJuego v-for="asignaturasJuego in element.asignaturasJuegos" :key="asignaturasJuego.id" :id="asignaturasJuego.id"
                    :juegoAsignatura="asignaturasJuego.juegoAsignatura">
                </AsignaturaJuego>
            </div>
        </div>
    </section>
</template>