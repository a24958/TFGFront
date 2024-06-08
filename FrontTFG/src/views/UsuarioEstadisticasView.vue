<script setup lang="ts">
import UsuarioEstadisticas from '@/components/UsuarioEstadisticas.vue';
import { usuarioEstadisticasStore } from '@/stores/storeUsuarioEstadisticas';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import router from "@/router";
import UsuarioIntranetMenu from '@/components/general-utils/UsuarioIntranetMenu.vue';


const store = usuarioEstadisticasStore();

const userData = localStorage.getItem('userData');
const id = userData ? JSON.parse(userData).id : null;
onBeforeMount(async () => {
    await store.getUsuarioById(id);
});

const { seatData: data } = storeToRefs(store);


</script>

<template>
    <UsuarioIntranetMenu></UsuarioIntranetMenu>
    <div v-for="element in data" :key="element.id">
        <UsuarioEstadisticas :id="element.id" :name="element.name" :email="element.email" :acertadas="element.acertadas" :media="element.media"
        :juegosCompletados="element.juegosCompletados" :falladas="element.falladas" :resultados="element.resultados" ></UsuarioEstadisticas>
    </div>

</template>

<style scoped>
</style>