<script setup lang="ts">
import router from "@/router";
import { asignaturaStore } from '@/stores/storeAsignatura';
import Asignatura from './Asignatura.vue';
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";

const store = asignaturaStore();

onBeforeMount(async () => {
    await store.getAsignaturas();
});

const { asignaturas: data } = storeToRefs(store);

interface Asignatura {
    id: number;
    nombreAsignatura: string;
}

const nuevaAsignatura = ref<{ nombreAsignatura: string }>({ nombreAsignatura: "" });

const agregarAsignatura = async () => {
    if (nuevaAsignatura.value.nombreAsignatura.trim()) {
        const addedAsignatura = await store.addAsignatura(nuevaAsignatura.value);
        if (addedAsignatura) {
            data.value.push(addedAsignatura);  // Añadir la nueva asignatura a la lista reactiva
            nuevaAsignatura.value.nombreAsignatura = "";
        }
    } else {
        alert("El nombre de la asignatura no puede estar vacío");
    }
};
</script>

<template>
    <section class="sessionContainer">
        <div>
            <h1>ASIGNATURAS DISPONIBLES</h1>
            
            <!-- Formulario para agregar una nueva asignatura -->
            <form @submit.prevent="agregarAsignatura">
                <input v-model="nuevaAsignatura.nombreAsignatura" placeholder="Nombre de la asignatura" />
                <button type="submit">Agregar Asignatura</button>
            </form>

            <div v-for="element in data" :key="element.id" class="sessionContainerItem">
                <Asignatura :key="element.id" :id="element.id" :nombreAsignatura="element.nombreAsignatura"></Asignatura>
            </div>
        </div>
    </section>
</template>
