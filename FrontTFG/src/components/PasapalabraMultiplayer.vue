<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PreguntaPasapalabra from './PreguntaPasapalabra.vue';
import { pasapalabraStore } from '@/stores/storePasapalabra';
import vueDebounce, { debounce } from 'vue-debounce'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import { useToast } from "primevue/usetoast";
import { isReactive } from 'vue';
import router from '@/router';

const toast = useToast();
const store = pasapalabraStore();

const AT_START = 1;
const AT_ERRORR = 2;
const AT_END = 3;
const AT_COUNTDOWN = 4

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
    preguntas1: PreguntaPasapalabra[],
    preguntas2: PreguntaPasapalabra[],
}>()

onMounted(() => {
    showDialog(null, null, null, AT_START);
});

const idFirstQuestion1 = ref(0);
const idFirstQuestion2 = ref(0);
const inputValue1 = ref('');
const inputValue2 = ref('');
const timeValue1 = ref(300);
const timeValue2 = ref(300);
const showFirstsQuestions = ref(true);

let intervalId1: ReturnType<typeof setInterval>;
let intervalId2: ReturnType<typeof setInterval>;

const decrementTime = () => {
    if (showFirstsQuestions.value) {
        if (timeValue1.value > 0) {
            timeValue1.value--;
        } else {
            showFirstsQuestions.value = !showFirstsQuestions.value;
            if (timeValue1.value === 0 && timeValue2.value === 0) {
                showDialog(null, null, null, AT_END);
                return;
            }
            showCountDownDialog();
            clearInterval(intervalId1!);
            intervalId1 = null;
        }
    } else {
        if (timeValue2.value > 0) {
            timeValue2.value--;
        } else {
            showFirstsQuestions.value = !showFirstsQuestions.value;
            if (timeValue1.value === 0 && timeValue2.value === 0) {
                showDialog(null, null, null, AT_END);
                return;
            }
            showCountDownDialog();
            clearInterval(intervalId2!);
            intervalId2 = null;
        }
    }
};

const startTimer = () => {
    if (showFirstsQuestions.value) {
        if (!intervalId1) {
            intervalId1 = setInterval(decrementTime, 1000);
        }
    } else {
        if (!intervalId2) {
            intervalId2 = setInterval(decrementTime, 1000);
        }
    }
};

const stopTimer = () => {
    if (intervalId1) {
        clearInterval(intervalId1);
        intervalId1 = null;
    }
    if (intervalId2) {
        clearInterval(intervalId2);
        intervalId2 = null;
    }
};

function stopStyleClass(index: number) {
    const current = document.getElementById(`${index}`);
    current?.classList.remove('parpadeo');
    if (showFirstsQuestions.value) {
        timeValue1.value = 0;
    } else {
        timeValue2.value = 0;
    }
}

function toggleClass(currentIndex: number, nextIndex: number) {
    const current = document.getElementById(`${currentIndex}`);
    current?.classList.remove('parpadeo');

    const next = document.getElementById(`${nextIndex}`);
    next?.classList.add('parpadeo');
}

function nextQuestion(preguntas: PreguntaPasapalabra[], placeWhereIsCall: string | null) {
    if (showFirstsQuestions.value) {
        let currentIndex = idFirstQuestion1.value;
        let nextIndex = (currentIndex + 1) % preguntas.length;

        while (preguntas[nextIndex].contestado) {
            nextIndex = (nextIndex + 1) % preguntas.length;
            if (nextIndex === currentIndex) {
                break;
            }
        }

        if (nextIndex === currentIndex && preguntas[nextIndex].contestado) {
            toast.add({ severity: 'info', summary: 'Fin', detail: 'Has contestado a todas las preguntas', life: 3000 });
            stopStyleClass(idFirstQuestion1.value);
            showDialog(null, null, null, AT_END);
        } else {
            idFirstQuestion1.value = nextIndex;
            inputValue1.value = '';
            toggleClass(currentIndex, nextIndex);

            if (placeWhereIsCall === 'button' || placeWhereIsCall === 'pasapalabra') {
                if (!(props.preguntas2.every(pregunta => pregunta.contestado)) && timeValue2.value > 0) {
                    stopTimer();
                    showCountDownDialog();
                    showFirstsQuestions.value = !showFirstsQuestions.value;
                }
            }
        }
    } else {
        let currentIndex = idFirstQuestion2.value;
        let nextIndex = (currentIndex + 1) % preguntas.length;

        while (preguntas[nextIndex].contestado) {
            nextIndex = (nextIndex + 1) % preguntas.length;
            if (nextIndex === currentIndex) {
                break;
            }
        }

        if (nextIndex === currentIndex && preguntas[nextIndex].contestado) {
            toast.add({ severity: 'info', summary: 'Fin', detail: 'Has contestado a todas las preguntas', life: 3000 });
            stopStyleClass(idFirstQuestion2.value);
            showDialog(null, null, null, AT_END);
        } else {
            idFirstQuestion2.value = nextIndex;
            inputValue2.value = '';
            toggleClass(currentIndex, nextIndex);

            if (placeWhereIsCall === 'button' || placeWhereIsCall === 'pasapalabra') {
                if (!(props.preguntas1.every(pregunta => pregunta.contestado)) && timeValue1.value > 0) {
                    stopTimer();
                    showCountDownDialog();
                    showFirstsQuestions.value = !showFirstsQuestions.value;
                }
            }
        }
    }
}

function functionKeyUpEnter(preguntas: PreguntaPasapalabra[], value: string) {
    const todasContestadas = preguntas.every(pregunta => pregunta.contestado);
    const ambasPreguntasContestadas = props.preguntas1.every(pregunta => pregunta.contestado) && props.preguntas2.every(pregunta => pregunta.contestado);

    if (ambasPreguntasContestadas) {
        showDialog(null, null, null, AT_END);
        return;
    }

    if (todasContestadas) {
        if (showFirstsQuestions.value) {
            stopStyleClass(idFirstQuestion1.value);
            return;
        } else {
            stopStyleClass(idFirstQuestion2.value);
            return;
        }
    }

    if (showFirstsQuestions.value) {
        if (value.trim().toLowerCase() === preguntas[idFirstQuestion1.value].respuesta.trim().toLowerCase()) {
            preguntas[idFirstQuestion1.value].acertado = true;
            preguntas[idFirstQuestion1.value].contestado = true;
            acierto.value!.currentTime = 0.5;
            acierto.value?.play();
            nextQuestion(preguntas, null);
            inputValue1.value = '';
        } else if (value.trim().toLowerCase() === '') {
            nextQuestion(preguntas, 'pasapalabra');
            if (!(props.preguntas2.every(pregunta => pregunta.contestado)) && timeValue2.value > 0) {
                stopTimer();
                showCountDownDialog();
            }

        } else {
            preguntas[idFirstQuestion1.value].acertado = false;
            preguntas[idFirstQuestion1.value].contestado = true;
            fallo.value!.currentTime = 0.75;
            fallo.value?.play();
            showDialog(preguntas[idFirstQuestion1.value].letra, preguntas[idFirstQuestion1.value].pregunta, preguntas[idFirstQuestion1.value].respuesta, AT_ERRORR);
            nextQuestion(preguntas, null);
            if (props.preguntas2.every(pregunta => pregunta.contestado) && timeValue2.value > 0) {
                showCountDownDialog();
                showFirstsQuestions.value = !showFirstsQuestions.value;
            }
            inputValue1.value = '';
        }
    } else {
        if (value.trim().toLowerCase() === preguntas[idFirstQuestion2.value].respuesta.trim().toLowerCase()) {
            preguntas[idFirstQuestion2.value].acertado = true;
            preguntas[idFirstQuestion2.value].contestado = true;
            acierto.value!.currentTime = 0.5;
            acierto.value?.play();
            nextQuestion(preguntas, null);
            inputValue2.value = '';
        } else if (value.trim().toLowerCase() === '') {
            nextQuestion(preguntas, 'pasapalabra');
            if (!(props.preguntas1.every(pregunta => pregunta.contestado)) && timeValue1.value > 0) {
                stopTimer();
                showCountDownDialog();
            }
        } else {
            preguntas[idFirstQuestion2.value].acertado = false;
            preguntas[idFirstQuestion2.value].contestado = true;
            fallo.value!.currentTime = 0.75;
            fallo.value?.play();
            showDialog(preguntas[idFirstQuestion2.value].letra, preguntas[idFirstQuestion2.value].pregunta, preguntas[idFirstQuestion2.value].respuesta, AT_ERRORR);
            nextQuestion(preguntas, null);
            if (props.preguntas1.every(pregunta => pregunta.contestado) && timeValue1.value > 0) {
                showCountDownDialog();
                showFirstsQuestions.value = !showFirstsQuestions.value;
            }
            inputValue2.value = '';
        }
    }
}

const showPanel = ref(true);
const headerText = ref('');
const dialogText = ref('');
const dialogButtonLabel = ref('');
const isFirstTiem = ref(true);

const showCountDown = ref(false);
const countDownText = ref('');
const countDown = ref(5);

function showDialog(letra: string | null, pregunta: string | null, respuesta: string | null, timeWhenIsDisplay: number) {
    switch (timeWhenIsDisplay) {
        case AT_START:
            stopTimer();
            showPanel.value = true;
            headerText.value = "ATENCIÓN";
            dialogText.value = "Le recordamos algo básico y sencillo del juego, las letras MAYÚSCULAS y letras MINÚSCULAS NO SON MOTIVO DE ERROR, pero SI QUE LOS SON LAS TILDES. Para comenzar presione el botón de EMPEZAR";
            dialogButtonLabel.value = "Empezar";
            return;
        case AT_ERRORR:
            stopTimer();
            showPanel.value = true;
            headerText.value = `CON LA LETRA ${letra}`;
            dialogText.value = `${pregunta}: La respuestas correcta era ${respuesta}`;
            dialogButtonLabel.value = "Continuar";
            return;
        case AT_END:
            stopTimer();
            showPanel.value = true;
            headerText.value = `FINAL`;
            dialogText.value = `EL JUGADOR 1 HA ACERTADO ${props.preguntas1.filter((p) => p.acertado).length} / ${props.preguntas1.length} PREGUNTAS\n EL JUGADOR 2 HA ACERTADO ${props.preguntas2.filter((p) => p.acertado).length} / ${props.preguntas2.length} PREGUNTAS`;
            dialogButtonLabel.value = "Continuar";
            return;
    }
}

function showCountDownDialog() {
    stopTimer();
    cuentaRegresiva(5);
    showCountDown.value = true;
    countDownText.value = `TURNO DEL JUGADOR ${showFirstsQuestions.value === true ? 1 : 2}`;
    return;
}

function closeDialog() {
    stopTimer();
    showPanel.value = !showPanel.value;
    if (props.preguntas1.every((p) => p.acertado) || props.preguntas2.every((p) => p.acertado) || (props.preguntas1.every((p) => p.contestado) && props.preguntas2.every((p) => p.contestado)) || (timeValue1.value === 0 && timeValue2.value === 0)) {
        router.push('/');
    } else {
        if ((!(props.preguntas1.every((pregunta) => pregunta.contestado)) && timeValue1.value > 0) && (!(props.preguntas2.every((pregunta) => pregunta.contestado)) && timeValue2.value > 0)) {
            showCountDownDialog();
            if (!isFirstTiem.value) {
                showFirstsQuestions.value = !showFirstsQuestions.value;
            } else {
                isFirstTiem.value = false;
            }
        } else {
            startTimer();
        }
    }
}

function getWidthScreen() {
    return window.innerWidth;
}

function cuentaRegresiva(duracion: number) {
    let contador = duracion;

    stopTimer();

    const intervalo = setInterval(() => {
        countDown.value = contador;
        if (contador === 0) {
            clearInterval(intervalo);
            showCountDown.value = false;
            startTimer();
            countDown.value = 5;
        }
        contador--;
    }, 1000);
}

</script>

<template>
    <Dialog v-model:visible="showPanel" modal :header="headerText" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
            {{ dialogText }}
        </p>
        <Button :label="dialogButtonLabel" @click="closeDialog()"></Button>
    </Dialog>
    <Dialog v-model:visible="showCountDown" modal :header="'ATENCION'" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
            {{ countDownText }}
        </p>
        <p class="m-0"
            style="font-size: 48px; display: flex; flex-direction: row; align-items: center; justify-content: center">
            {{ countDown }}
        </p>
    </Dialog>
    <div v-if="showFirstsQuestions">
        <br>
        <p class="title"> {{ name.replace('pasapalabra', '').toUpperCase() }}</p>
        <div class="game-container">
            <div id="rosco-container">
                <div class="current_letter_container">
                    <p>LETRA</p>
                    <p class="current_letter"> {{ props.preguntas1[idFirstQuestion1].letra }}</p>
                </div>
                <ul id="rosco">
                    <li v-for="(element, index) in props.preguntas1" :id="(index).toString()"
                        :class="{ 'parpadeo': index === idFirstQuestion1 }">
                        <PreguntaPasapalabra :letra="element.letra" :contestado="element.contestado"
                            :acertado="element.acertado">
                        </PreguntaPasapalabra>
                    </li>
                </ul>
            </div>
            <div class="pregunta">{{ preguntas1[idFirstQuestion1].pregunta }}</div>
            <div class="inputs">
                <div class="card flex justify-content-center">
                    <InputText type="text" v-model="inputValue1"
                        @keyup.enter="functionKeyUpEnter(props.preguntas1, inputValue1)" class="input_style" />
                </div>
                <div class="card flex justify-content-center">
                    <Button :label="getWidthScreen() < 700 ? 'Pasa' : 'Pasapalabra'"
                        @click="nextQuestion(props.preguntas1, 'button')" severity="secondary" class="button_style" />
                </div>
                <div class="time">
                    <p>{{ timeValue1 }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!showFirstsQuestions">
        <br>
        <p class="title"> {{ name.replace('pasapalabra', '').toUpperCase() }}</p>
        <div class="game-container">
            <div id="rosco-container">
                <div class="current_letter_container">
                    <p>LETRA</p>
                    <p class="current_letter"> {{ props.preguntas2[idFirstQuestion2].letra }}</p>
                </div>
                <ul id="rosco">
                    <li v-for="(element, index) in props.preguntas2" :id="(index).toString()"
                        :class="{ 'parpadeo': index === idFirstQuestion2 }">
                        <PreguntaPasapalabra :letra="element.letra" :contestado="element.contestado"
                            :acertado="element.acertado">
                        </PreguntaPasapalabra>
                    </li>
                </ul>
            </div>
            <div class="pregunta">{{ preguntas2[idFirstQuestion2].pregunta }}</div>
            <div class="inputs">
                <div class="card flex justify-content-center">
                    <InputText type="text" v-model="inputValue2"
                        @keyup.enter="functionKeyUpEnter(props.preguntas2, inputValue2)" class="input_style" />
                </div>
                <div class="card flex justify-content-center">
                    <Button :label="getWidthScreen() < 700 ? 'Pasa' : 'Pasapalabra'"
                        @click="nextQuestion(props.preguntas2, 'button')" severity="secondary" class="button_style" />
                </div>
                <div class="time">
                    <p>{{ timeValue2 }}</p>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<style scoped>
.current_letter {
    display: flex;
    align-items: center;
    font-size: 150px;
    margin-top: 0;
}

.current_letter_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 16%;
    left: 15%;
    font-size: 40px;
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
    font-size: 18px;
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
    margin-bottom: 16px;
    margin-left: 16px;
}

.pregunta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    margin-top: 60px;
    font-size: 22px;
    color: white;
}

.inputs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 400px;
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
    width: 400px;
    height: 400px;
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

#rosco li:nth-child(1) {
    transform: rotate(-90deg) translate(190px) rotate(90deg);
}

#rosco li:nth-child(2) {
    transform: rotate(-76.15deg) translate(190px) rotate(76.15deg);
}

#rosco li:nth-child(3) {
    transform: rotate(-62.3deg) translate(190px) rotate(62.3deg);
}

#rosco li:nth-child(4) {
    transform: rotate(-48.45deg) translate(190px) rotate(48.45deg);
}

#rosco li:nth-child(5) {
    transform: rotate(-34.6deg) translate(190px) rotate(34.6deg);
}

#rosco li:nth-child(6) {
    transform: rotate(-20.75deg) translate(190px) rotate(20.75deg);
}

#rosco li:nth-child(7) {
    transform: rotate(-6.9deg) translate(190px) rotate(6.9deg);
}

#rosco li:nth-child(8) {
    transform: rotate(6.95deg) translate(190px) rotate(-6.95deg);
}

#rosco li:nth-child(9) {
    transform: rotate(20.8deg) translate(190px) rotate(-20.8deg);
}

#rosco li:nth-child(10) {
    transform: rotate(34.65deg) translate(190px) rotate(-34.65deg);
}

#rosco li:nth-child(11) {
    transform: rotate(48.5deg) translate(190px) rotate(-48.5deg);
}

#rosco li:nth-child(12) {
    transform: rotate(62.35deg) translate(190px) rotate(-62.35deg);
}

#rosco li:nth-child(13) {
    transform: rotate(76.2deg) translate(190px) rotate(-76.2deg);
}

#rosco li:nth-child(14) {
    transform: rotate(90.05deg) translate(190px) rotate(-90.05deg);
}

#rosco li:nth-child(15) {
    transform: rotate(103.9deg) translate(190px) rotate(-103.9deg);
}

#rosco li:nth-child(16) {
    transform: rotate(117.75deg) translate(190px) rotate(-117.75deg);
}

#rosco li:nth-child(17) {
    transform: rotate(131.6deg) translate(190px) rotate(-131.6deg);
}

#rosco li:nth-child(18) {
    transform: rotate(145.45deg) translate(190px) rotate(-145.45deg);
}

#rosco li:nth-child(19) {
    transform: rotate(159.3deg) translate(190px) rotate(-159.3deg);
}

#rosco li:nth-child(20) {
    transform: rotate(173.15deg) translate(190px) rotate(-173.15deg);
}

#rosco li:nth-child(21) {
    transform: rotate(187deg) translate(190px) rotate(-187deg);
}

#rosco li:nth-child(22) {
    transform: rotate(200.85deg) translate(190px) rotate(-200.85deg);
}

#rosco li:nth-child(23) {
    transform: rotate(214.7deg) translate(190px) rotate(-214.7deg);
}

#rosco li:nth-child(24) {
    transform: rotate(228.55deg) translate(190px) rotate(-228.55deg);
}

#rosco li:nth-child(25) {
    transform: rotate(242.4deg) translate(190px) rotate(-242.4deg);
}

#rosco li:nth-child(26) {
    transform: rotate(256.25deg) translate(190px) rotate(-256.25deg);
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

@media screen and (min-width: 800px) {
    .pregunta {
        margin-left: 0px;
    }
}

@media screen and (min-width: 700px) {
    .current_letter {
        font-size: 190px;
    }

    .title {
        margin-bottom: 50px;
    }

    .pregunta {
        margin-top: 100px;
    }

    .current_letter_container {
        top: 12%;
        left: 18%;
        font-size: 50px;
    }

    .time {
        height: 70px;
        width: 70px;
        font-size: 24px;
    }

    .inputs {
        width: 475px;
    }

    #rosco-container {
        width: 450px;
        height: 450px;
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
}
</style>