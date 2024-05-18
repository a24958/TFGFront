<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PreguntaPasapalabra from './PreguntaPasapalabra.vue';
import { pasapalabraStore } from '@/stores/storePasapalabra';
import vueDebounce, { debounce } from 'vue-debounce'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const store = pasapalabraStore();

const acierto = ref<HTMLAudioElement | null>(null);
const fallo = ref<HTMLAudioElement | null>(null);
acierto.value = new Audio('/src/assets/acierto.mp3');
fallo.value = new Audio('/src/assets/fallo.mp3');

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
const timeValue = ref(300);

const decrementTime = () => {
    if (timeValue.value > 0) {
        timeValue.value--;
    }
}

setInterval(decrementTime, 1000)

function stopStyleClass(index: number) {
    const current = document.getElementById(`${index}`);
    current?.classList.remove('parpadeo');
    timeValue.value = 0;
}

function toggleClass(currentIndex: number, nextIndex: number) {
    const current = document.getElementById(`${currentIndex}`);
    current?.classList.remove('parpadeo');

    const next = document.getElementById(`${nextIndex}`);
    next?.classList.add('parpadeo');
}

function nextQuestion() {
    let currentIndex = idFirstQuestion.value;
    let nextIndex = (currentIndex + 1) % props.preguntas.length;

    // Avanzar al siguiente índice no contestado
    while (props.preguntas[nextIndex].contestado) {
        nextIndex = (nextIndex + 1) % props.preguntas.length;
        if (nextIndex === currentIndex) {
            break;
        }
    }

    // Si se llegó al final y todas las preguntas están contestadas, mostrar el mensaje de "Has acabado"
    if (nextIndex === currentIndex && props.preguntas[nextIndex].contestado) {
        toast.add({ severity: 'info', summary: 'Fin', detail: 'Has contestado a todas las preguntas', life: 3000 });
        stopStyleClass(idFirstQuestion.value);
        return;
    }

    // Si no se ha llegado al final o aún quedan preguntas por contestar, cambiar la pregunta
    idFirstQuestion.value = nextIndex;
    inputValue.value = '';
    toggleClass(currentIndex, nextIndex);
}

function functionKeyUpEnter(value: string) {
    // Verificar si todas las preguntas ya han sido contestadas
    const todasContestadas = props.preguntas.every(pregunta => pregunta.contestado);

    // Si todas las preguntas ya han sido contestadas, detener el juego
    if (todasContestadas) {
        stopStyleClass(idFirstQuestion.value)
        toast.add({ severity: 'info', summary: 'Fin', detail: 'Has contestado a todas las preguntas', life: 3000 });
        return;
    }

    // Resto del código para comprobar la respuesta y avanzar a la siguiente pregunta
    if (value.trim().toLowerCase() === props.preguntas[idFirstQuestion.value].respuesta.trim().toLowerCase()) {
        props.preguntas[idFirstQuestion.value].acertado = true;
        props.preguntas[idFirstQuestion.value].contestado = true;
        acierto.value!.currentTime = 0.5;
        acierto.value?.play()
        nextQuestion();
        inputValue.value = '';
    } else if (value.trim().toLowerCase() === '') {
        nextQuestion();
    } else {
        props.preguntas[idFirstQuestion.value].acertado = false;
        props.preguntas[idFirstQuestion.value].contestado = true;
        fallo.value!.currentTime = 0.75;
        fallo.value?.play();
        nextQuestion();
        inputValue.value = '';
    }
}

</script>

<template>
    <div>
        <br>
        <p class="title"> {{ name.replace('pasapalabra', '').toUpperCase() }}</p>
        <div class="game-container">
            <div id="rosco-container">
                <div class="current_letter_container">
                    <p>LETRA</p>
                    <p class="current_letter"> {{ props.preguntas[idFirstQuestion].letra }}</p>
                </div>
                <ul id="rosco">
                    <li v-for="element in props.preguntas" :id="(element.id - 1).toString()"
                        :class="{ 'parpadeo': element.id === 1 }">
                        <PreguntaPasapalabra :letra="element.letra" :contestado="element.contestado"
                            :acertado="element.acertado">
                        </PreguntaPasapalabra>
                    </li>
                </ul>
            </div>
            <div class="pregunta">{{ preguntas[idFirstQuestion].pregunta }}</div>
            <div class="inputs">
                <div class="card flex justify-content-center">
                    <InputText type="text" v-model="inputValue" @keyup.enter="functionKeyUpEnter(inputValue)"
                        class="input_style" />
                </div>
                <div class="card flex justify-content-center">
                    <Button label="Pasapalabra" @click="nextQuestion" severity="secondary" class="button_style" />
                </div>
                <div class="time">
                    <p>{{ timeValue }}</p>
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<style scoped>
.current_letter {
    display: flex;
    align-items: center;
    font-size: 190px;
    margin-top: 0;
}

.current_letter_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 12%;
    left: 18%;
    font-size: 50px;
    color: white;
    font-weight: bold;
    width: 300px;
}

.current_letter_container p {
    margin-bottom: 0;
}

.time {
    background-color: #3663aff7;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
    box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
    border: 2px solid white;
    height: 50px;
    width: 50px;
    color: white;
}

.input_style,
.button_style {
    background-color: #3663aff7;
    color: white;
    font-weight: bold;
    box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
    border: 2px solid white;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 50px;
    margin-left: 16px;
}

.pregunta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    font-size: 22px;
    color: white;
}

.inputs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 450px;
    margin-top: 22px;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#rosco-container {
    position: relative;
    width: 450px;
    height: 450px;
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

@keyframes parpadeo {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.parpadeo {
    animation: parpadeo 1.2s infinite;
}
</style>