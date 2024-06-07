<script setup lang="ts">
import vueDebounce, { debounce } from 'vue-debounce';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import { useToast } from "primevue/usetoast";
import { usuarioEstadisticasStore } from '@/stores/storeUsuarioEstadisticas';
import UsuarioResultados from './UsuarioResutados.vue';

import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const toast = useToast();
const store = usuarioEstadisticasStore();

interface Resultado {
    idUsuario: number,
    idJuego: number,
    juego:string,
    completado: string,
    resultado: number,
    acertadas: number,
    falladas: number,
}

const props = defineProps<{
    id: number,
    name: string,
    email: string,
    media: number,
    juegosCompletados: number,
    acertadas: number,
    falladas: number,
    resultados: Resultado[]
}>();
</script>

<template>
    <div>NOMBRE: {{ name }}</div>
    <div>EMAIL: {{ email }}</div>
    <div>MEDIA: {{ media }}</div>
    <div>JUEGOS COMPLETADOS: {{ juegosCompletados }}</div>
    <div>ACERTADAS: {{ acertadas }}</div>
    <div>FALLADAS: {{ falladas }}</div>

    <div v-for="element in resultados" :key="element.idJuego">
        <UsuarioResultados 
            :idJuego="element.idJuego" 
            :idUsuario="element.idUsuario"  
            :juego="element.juego"
            :acertadas="element.acertadas" 
            :completado="element.completado"
            :resultado="element.resultado" 
            :falladas="element.falladas"  
        />
    </div>
</template>

<style scoped>
</style>
