<script setup lang="ts">
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { ref } from 'vue';
import { computed } from 'vue';

const value = ref('');
const props = defineProps<{
    labelText: string;
}>();

const dynamicClass = computed(() => ({
    biggOne: props.labelText === 'Tema del Juego',
    questionAnswer: props.labelText === 'Respuesta' || props.labelText === 'Pregunta',
}))

</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <InputText id="username" v-model="value" :class="dynamicClass" />
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
