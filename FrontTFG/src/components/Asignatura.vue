<script setup lang="ts">
import { asignaturaStore } from '@/stores/storeAsignatura';

const store = asignaturaStore();

const props = defineProps<{
    id: number,
    nombreAsignatura: string
}>()

const deleteAsignatura = store.deleteAsignatura

</script>

<template>
    <!-- <p>{{ id }}</p> -->
    <p>{{ nombreAsignatura }}</p>
    <button id="delete" @click="deleteAsignatura(id)"><img src="" alt=""></button>

</template>
