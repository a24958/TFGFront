<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    letrasDisponibles: {
        type: Array as () => string[],
        default: () => [] as string[]
    }
});
</script>
<template>
    <div id="abcdario">
        <button v-for="letra in letrasDisponibles" :key="letra" @click="$emit('intento', letra)" class="letra">{{ letra
            }}</button>
    </div>
</template>

<style scoped>
#abcdario {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

#abcdario button {
    margin: 5px;
    font-size: 16px;
    border: 2px solid #3B82F6;
    background-color: #f0f0f0;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

#abcdario button:hover {
    background-color: #3B82F6;
    color: #fff;
}

.letra {
    border-radius: 50%; /* Añade bordes redondeados */
    font-weight: bold; /* Hace que el texto sea más grueso */
    text-transform: uppercase; /* Convierte el texto a mayúsculas */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Añade una sombra */
}

.letra:disabled {
    color: rgba(255, 0, 0, 0.5);
    cursor: not-allowed;
}
</style>