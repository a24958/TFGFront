<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { ahorcadoStore } from '@/stores/storeAhorcado';
import { storeToRefs } from 'pinia';
import AhorcadoImagen from './AhorcadoImage.vue';
import Abecedario from './Abecedario.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const palabra = ref('');
const palabraOculta = ref([] as string[]);
const intentos = ref(6);
const letrasDisponibles = ref([] as string[]);
const mensajeFinal = ref('');
const acierto = ref('');
const pistaTexto = ref('');
const jugando = ref(true);

const store = ahorcadoStore();
const { seatData } = storeToRefs(store);

let id = '';
for (const curso of router.currentRoute.value.params.id
) {
    id += curso
}

function normalizeString(str: string): string {
    const equivalencias: { [key: string]: string } = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U'
    };

    return str.split('').map(char => equivalencias[char] || char).join('');
}
onBeforeMount(async () => {
    await store.getAhorcadoById(id);
    if (seatData.value && seatData.value.length > 0) {
        const pregunta = seatData.value[0].preguntaAhorcado.pregunta;
        const respuesta = seatData.value[0].preguntaAhorcado.respuesta;
        palabra.value = respuesta.toUpperCase();
        pistaTexto.value = pregunta;
        palabraOculta.value = Array(palabra.value.length).fill('_');
    }
});

function inicio() {
    intentos.value = 6;
    letrasDisponibles.value = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
    mensajeFinal.value = '';
    acierto.value = '';
    jugando.value = true;
    palabraOculta.value = Array(palabra.value.length).fill('_');
}

function intento(letra: string) {
    const indice = letrasDisponibles.value.indexOf(letra);
    if (indice > -1) {
        letrasDisponibles.value.splice(indice, 1);
        if (palabra.value.includes(normalizeString(letra))) {
            acierto.value = "Bien!";
            palabra.value.split('').forEach((char, index) => {
                if (char === letra) {
                    palabraOculta.value[index] = letra;
                }
            });
        } else {
            intentos.value--;
            acierto.value = "Fallo!";
        }
        compruebaFin();
    }
}

function compruebaFin() {
    if (!palabraOculta.value.includes('_')) {
        mensajeFinal.value = "Felicidades !!";
        jugando.value = false;
    } else if (intentos.value === 0) {
        mensajeFinal.value = "Game Over";
        jugando.value = false;
    }
}

onMounted(() => {
    inicio();
});
</script>

<template>
    <div class="main-container">
        <h1 class="titulo">Juego del ahorcado</h1>
        <h1 id="msg-final" :class="{ 'zoom-in': mensajeFinal }">{{ mensajeFinal }}</h1>
        <h3 :class="[acierto, { 'acierto': acierto }]" id="acierto">{{ acierto }}</h3>
        <div class="flex-row no-wrap">
            <AhorcadoImagen :intentos="intentos" />
        </div>
        <div class="flex-col">
            <h2 class="palabra">{{ palabraOculta.join('') }}</h2>
        </div>
        <div class="flex-col" id="turnos">
            <div class="col">
                <h3>Intentos restantes: <span id="intentos">{{ intentos }}</span></h3>
            </div>
            <div class="col">
                <span id="hueco-pista">{{ pistaTexto }}</span>
            </div>
        </div>
        <div v-if="jugando" class="flex-col">
            <div class="col">
                <Abecedario :intentos="intentos" @intento="intento" :letrasDisponibles="letrasDisponibles" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: auto;
}

h1.titulo {
    margin: 50px auto 80px auto;
    text-align: center;
    font-family: Cambria, Cochin, Georgia, Times, Times New Roman, serif;
    color: #3B82F6
}

h1#msg-final {
    text-align: center;
    color: #3B82F6;
    transition: all .5s ease;
    transform: scale(0);
    min-height: 50px;
    margin-bottom: 0;
}

.zoom-in {
    transform: scale(1) !important;
}

.flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
}


#acierto {
    text-align: center;
    min-height: 24px;
    transform: scale(0);
}

.acierto {
    animation: zoomInOut 1s ease;
}

.rojo {
    color: red;
}

.verde {
    color: green;
}

@keyframes zoomInOut {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }

    70% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

h2.palabra {
    margin: 0 auto 25px auto;
    text-align: center;
    color: royalblue;
    text-transform: uppercase;
    letter-spacing: 6px;
}

.flex-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 10px auto;
}

.no-wrap {
    flex-wrap: nowrap !important;
}

.col {
    width: 50%;
    text-align: center;
}

#turnos h3 {
    margin: auto;
}

h3 span {
    color: orangered;
}

.encuadre {
    border: 2px dashed crimson;
    padding: 3px 2px 2px 6px;
}
</style>