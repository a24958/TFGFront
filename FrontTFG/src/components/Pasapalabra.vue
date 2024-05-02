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
    if (idFirstQuestion.value == props.preguntas.length - 1) {
        idFirstQuestion.value = 0
        return
    }

    idFirstQuestion.value += 1
}

function functionTestEnter(value: string) {
    if (value.trim().toLowerCase() === props.preguntas[idFirstQuestion.value].respuesta.trim().toLowerCase()) {
        props.preguntas[idFirstQuestion.value].acertado = true;
        props.preguntas[idFirstQuestion.value].contestado = true;
        toast.success('!CORRECTO!')
        nextQuestion()
        inputValue.value = '';
    } else if (value.trim().toLowerCase() === '') {
        nextQuestion()
    } else {
        props.preguntas[idFirstQuestion.value].acertado = false;
        props.preguntas[idFirstQuestion.value].contestado = true;
        toast.error('!ERROR!')
        nextQuestion()
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
        <p>{{ id }}</p>
        <p> {{ name }}</p>
        <br>
        <PreguntaPasapalabra :id="preguntas[idFirstQuestion].id" :pregunta="preguntas[idFirstQuestion].pregunta"
            :respuesta="preguntas[idFirstQuestion].respuesta" :letra="preguntas[idFirstQuestion].letra"
            :contestado="preguntas[idFirstQuestion].contestado" :acertado="preguntas[idFirstQuestion].acertado"
            v-if="preguntas[idFirstQuestion].contestado === false">
        </PreguntaPasapalabra>
        <input type="text" @input="handleInputChange" @keyup.enter="functionTestEnter(inputValue)" v-model="inputValue">
        <button @click="nextQuestion">Pasapalabra</button>
    </div>
</template>

<style scoped></style>