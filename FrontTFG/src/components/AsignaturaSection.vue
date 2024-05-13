<script setup lang="ts">
import router from "@/router";
import { asignaturaStore } from '@/stores/storeAsignatura';

import Asignatura from './Asignatura.vue';
import { onBeforeMount, ref, toValue } from "vue";
import { storeToRefs } from "pinia";

const store = asignaturaStore();


onBeforeMount(async () => {
    await store.getAsignaturas();
})

const { asignaturas: data } = storeToRefs(store);

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
                <Asignatura :key="element.id" :id="element.id"
                    :nombreAsignatura="element.nombreAsignatura">
                </Asignatura>
            </div>
        </div>
    </section>
</template>