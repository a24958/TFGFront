<script setup lang="ts">
import vueDebounce, { debounce } from 'vue-debounce';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import { useToast } from "primevue/usetoast";
import { usuarioEstadisticasStore } from '@/stores/storeUsuarioEstadisticas';
import UsuarioResultados from './UsuarioResutados.vue';
import UsuarioTituloResultados from './UsuarioTituloResutados.vue';


import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const toast = useToast();
const store = usuarioEstadisticasStore();

interface Resultado {
    idUsuario: number,
    idJuego: number,
    juego: string,
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
    <div class="user-stats-container">
        <div class="user-info">
            <div class="user-info-name">
                <h2> <strong> {{ name }}</strong></h2>
                <p><strong>Email:</strong> {{ email }}</p>
            </div>

            <div class="user-info-stats">
                <div>
                    <p><strong>Media</strong> </p>
                    <p>{{ media }}</p>
                </div>
                <div>
                    <p><strong>Juegos Completados</strong> </p>
                    <p>{{ juegosCompletados }}</p>
                </div>
                <div>
                    <p><strong>Acertadas</strong> </p>
                    <p>{{ acertadas }}</p>
                </div>
                <div>
                    <p><strong>Falladas</strong> </p>
                    <p>{{ falladas }}</p>
                </div>
            </div>

        </div>

        <div class="user-results">
            <h3>Resultados de Juegos</h3>
            <UsuarioTituloResultados></UsuarioTituloResultados>
            <div v-for="element in resultados" :key="element.idJuego" class="result-item">
                <UsuarioResultados :idJuego="element.idJuego" :idUsuario="element.idUsuario" :juego="element.juego"
                    :acertadas="element.acertadas" :completado="element.completado" :resultado="element.resultado"
                    :falladas="element.falladas" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-stats-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    margin: 0 auto;
}

.user-info {
    margin-bottom: 20px;
}

strong{
    color: #3B82F6;

}

h3{
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-info-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.user-info-stats{
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.user-info-stats div {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border: 1px solid #3B82F6; /* Borde fino azul */
    border-radius: 8px; /* Esquinas redondeadas */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Sombreado */
}


.user-info h2 {
    margin-bottom: 10px;
}

.user-info p {
    margin: 5px 0;
}

.user-results {
    margin-top: 20px;
}

</style>