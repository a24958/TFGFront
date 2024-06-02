<script setup lang="ts">
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { ref } from 'vue';
import { computed } from 'vue';
import { watch } from 'vue';
import { useJuegoStore } from '@/stores/storeCrearPasapalabra';

const storeCrearPasapalabra = useJuegoStore();

const value = ref('');
const props = defineProps<{
    letra: string;
    labelText: string;
    isValid: boolean
}>();

const dynamicClass = computed(() => ({
    biggOne: props.labelText === 'Tema del Juego',
    questionAnswer: props.labelText === 'Respuesta' || props.labelText === 'Pregunta',
}))

watch(value, (newValue, oldValue) => {

    if (props.labelText === 'Tema del Juego' || props.labelText === 'Nombre del Juego') {
        storeCrearPasapalabra.fillRequestHeader(newValue, 0, props.labelText);
    } else {
        storeCrearPasapalabra.fillRequestPreguntas(props.letra, newValue, props.labelText);
    }

});

</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <InputText id="username" v-model="value" :class="dynamicClass" :invalid="isValid && value.trim() === ''" />
            <label for="username">{{ labelText }}</label>
        </FloatLabel>
    </div>
</template>

<style scoped>
.biggOne {
    width: 58rem;
}

.questionAnswer {
    width: 24rem;
}
</style>
