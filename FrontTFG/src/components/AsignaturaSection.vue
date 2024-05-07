<script setup lang="ts">
import router from "@/router";
import { asignaturaStore } from '@/stores/storeAsignatura';

import Asignatura from './Asignatura.vue';
import { onBeforeMount, ref, toValue } from "vue";
import { storeToRefs } from "pinia";

const store = asignaturaStore();
let id = '';
for (const curso of router.currentRoute.value.params.id
) {
   id += curso 
}

onBeforeMount(async () => {
    await store.getCursoById(id);
})

const { seatData: data } = storeToRefs(store);
interface Curso {
    id: number,
    nombreCurso: string,
    asignaturas: Asignatura[]
}

interface Asignatura {
    id: number;
    nombreAsignatura: string,

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
                <Asignatura v-for="asignatura in element.asignaturas" :key="asignatura.id" :id="asignatura.id"
                    :nombreAsignatura="asignatura.nombreAsignatura">
                </Asignatura>
            </div>
        </div>
    </section>
</template>