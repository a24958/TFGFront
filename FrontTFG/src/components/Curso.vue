<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { cursoStore } from '@/stores/storeCurso';
import vueDebounce, { debounce } from 'vue-debounce'
import { useToast } from 'vue-toast-notification';

const store = cursoStore();


const props = defineProps<{
    id: number,
    nombreCurso: string,
}>()

// const inputValue = ref('');


</script>

<template>
    <div>
        <p>{{ id }}</p>
        <p> {{ nombreCurso }}</p>
    </div>
</template>

<style scoped></style>