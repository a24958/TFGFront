<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PreguntaPasapalabra from './PreguntaPasapalabra.vue';
import { pasapalabraStore } from '@/stores/storePasapalabra';
import vueDebounce, { debounce } from 'vue-debounce'
import { useToast } from 'vue-toast-notification';


const vDebounce = vueDebounce({ lock: true })
const toast = useToast();
const store = pasapalabraStore();


interface PreguntaPasapalabra {
    id: number,
    pregunta: string,
    respuesta: string,
    letra: string,
    contestado: boolean,
    acertado: boolean,
}

const props = defineProps<{
    id: number,
    name: string,
    preguntas: PreguntaPasapalabra[]
}>()



const idFirstQuestion = ref(0)
const inputValue = ref('');

function nextQuestion() {
    let currentIndex = idFirstQuestion.value;
    let nextIndex = (currentIndex + 1) % props.preguntas.length;

    // Avanzar al siguiente índice no contestado
    while (props.preguntas[nextIndex].contestado) {
        nextIndex = (nextIndex + 1) % props.preguntas.length;
        if (nextIndex === currentIndex) {
            // Todas las preguntas han sido contestadas, detener el ciclo
            break;
        }
    }

    // Si se llegó al final y todas las preguntas están contestadas, mostrar el mensaje de "Has acabado"
    if (nextIndex === currentIndex && props.preguntas[nextIndex].contestado) {
        toast.success('¡Has acabado!');
        return;
    }

    // Si no se ha llegado al final o aún quedan preguntas por contestar, cambiar la pregunta
    idFirstQuestion.value = nextIndex;
}


function functionTestEnter(value: string) {
    // Verificar si todas las preguntas ya han sido contestadas
    const todasContestadas = props.preguntas.every(pregunta => pregunta.contestado);

    // Si todas las preguntas ya han sido contestadas, detener el juego
    if (todasContestadas) {
        toast.info('¡Has acabado!');
        return;
    }

    // Resto del código para comprobar la respuesta y avanzar a la siguiente pregunta
    if (value.trim().toLowerCase() === props.preguntas[idFirstQuestion.value].respuesta.trim().toLowerCase()) {
        props.preguntas[idFirstQuestion.value].acertado = true;
        props.preguntas[idFirstQuestion.value].contestado = true;
        toast.success('¡CORRECTO!');
        nextQuestion();
        inputValue.value = '';
    } else if (value.trim().toLowerCase() === '') {
        nextQuestion();
    } else {
        props.preguntas[idFirstQuestion.value].acertado = false;
        props.preguntas[idFirstQuestion.value].contestado = true;
        toast.error('¡ERROR!');
        nextQuestion();
        inputValue.value = '';
    }
}


const handleInputChange = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value;
    handleInputChangeDebounced(inputValue);
}

const handleInputChangeDebounced = debounce((value: string) => {
    if (value.trim().toLowerCase() === props.preguntas[idFirstQuestion.value].respuesta.trim().toLowerCase()) {
        props.preguntas[idFirstQuestion.value].acertado = true;
        props.preguntas[idFirstQuestion.value].contestado = true;
        toast.success('!CORRECTO!')
        nextQuestion()
        inputValue.value = '';
    }
}, 200)

</script>

<template>
    <div>
        <p> {{ name }}</p>
        <br>
        <div class="game-container">
            <div id="rosco-container">
                <ul id="rosco">
                    <li v-for="element in props.preguntas">
                        <PreguntaPasapalabra :id="element.id" :pregunta="element.pregunta"
                            :respuesta="element.respuesta" :letra="element.letra" :contestado="element.contestado"
                            :acertado="element.acertado">
                        </PreguntaPasapalabra>
                    </li>
                </ul>
            </div>
        </div>
        <div class="inputs">
            <input type="text" @input="handleInputChange" @keyup.enter="functionTestEnter(inputValue)"
                v-model="inputValue">
            <button @click="nextQuestion">Pasapalabra</button>
        </div>
    </div>
</template>

<style scoped>
.inputs {
    position: absolute;
    left: 42%;
    bottom: 5%;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#rosco-container {
    position: relative;
    width: 500px;
    height: 500px;
}

#rosco {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

#rosco li {
    position: absolute;
}

#rosco li.correct {
    background-color: #8eff8e;
}

#rosco li.incorrect {
    background-color: #ff8e8e;
}

#rosco li:nth-child(1) {
    transform: rotate(-90deg) translate(250px) rotate(90deg);
}

#rosco li:nth-child(2) {
    transform: rotate(-76.15deg) translate(250px) rotate(76.15deg);
}

#rosco li:nth-child(3) {
    transform: rotate(-62.3deg) translate(250px) rotate(62.3deg);
}

#rosco li:nth-child(4) {
    transform: rotate(-48.45deg) translate(250px) rotate(48.45deg);
}

#rosco li:nth-child(5) {
    transform: rotate(-34.6deg) translate(250px) rotate(34.6deg);
}

#rosco li:nth-child(6) {
    transform: rotate(-20.75deg) translate(250px) rotate(20.75deg);
}

#rosco li:nth-child(7) {
    transform: rotate(-6.9deg) translate(250px) rotate(6.9deg);
}

#rosco li:nth-child(8) {
    transform: rotate(6.95deg) translate(250px) rotate(-6.95deg);
}

#rosco li:nth-child(9) {
    transform: rotate(20.8deg) translate(250px) rotate(-20.8deg);
}

#rosco li:nth-child(10) {
    transform: rotate(34.65deg) translate(250px) rotate(-34.65deg);
}

#rosco li:nth-child(11) {
    transform: rotate(48.5deg) translate(250px) rotate(-48.5deg);
}

#rosco li:nth-child(12) {
    transform: rotate(62.35deg) translate(250px) rotate(-62.35deg);
}

#rosco li:nth-child(13) {
    transform: rotate(76.2deg) translate(250px) rotate(-76.2deg);
}

#rosco li:nth-child(14) {
    transform: rotate(90.05deg) translate(250px) rotate(-90.05deg);
}

#rosco li:nth-child(15) {
    transform: rotate(103.9deg) translate(250px) rotate(-103.9deg);
}

#rosco li:nth-child(16) {
    transform: rotate(117.75deg) translate(250px) rotate(-117.75deg);
}

#rosco li:nth-child(17) {
    transform: rotate(131.6deg) translate(250px) rotate(-131.6deg);
}

#rosco li:nth-child(18) {
    transform: rotate(145.45deg) translate(250px) rotate(-145.45deg);
}

#rosco li:nth-child(19) {
    transform: rotate(159.3deg) translate(250px) rotate(-159.3deg);
}

#rosco li:nth-child(20) {
    transform: rotate(173.15deg) translate(250px) rotate(-173.15deg);
}

#rosco li:nth-child(21) {
    transform: rotate(187deg) translate(250px) rotate(-187deg);
}

#rosco li:nth-child(22) {
    transform: rotate(200.85deg) translate(250px) rotate(-200.85deg);
}

#rosco li:nth-child(23) {
    transform: rotate(214.7deg) translate(250px) rotate(-214.7deg);
}

#rosco li:nth-child(24) {
    transform: rotate(228.55deg) translate(250px) rotate(-228.55deg);
}

#rosco li:nth-child(25) {
    transform: rotate(242.4deg) translate(250px) rotate(-242.4deg);
}

#rosco li:nth-child(26) {
    transform: rotate(256.25deg) translate(250px) rotate(-256.25deg);
}
</style>