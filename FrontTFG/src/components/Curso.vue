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
const deleteCurso = store.deleteCurso;

</script>

<template>
    <div>
        <p>{{ nombreCurso }}</p>
        <button id="delete" @click="deleteCurso(id)"><img src="" alt=""></button>
    </div>
</template>

<style scoped></style>