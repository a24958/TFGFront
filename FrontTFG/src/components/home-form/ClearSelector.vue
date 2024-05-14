<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import { ref } from "vue";

const selectedItem = ref();

interface Curso {
    id: number,
    nombreCurso: string,
}

interface Asignatura {
    id: number,
    nombreAsignatura: string
}

const props = defineProps<{
    labelText: string,
    itemList: Curso[] | Asignatura[] | undefined,
}>()

</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedItem" :options="props.itemList" showClear :optionLabel="`nombre${labelText}`"
                class="w-full md:w-14rem" inputId="bc" style="width: 14rem;" />
            <label for="bc">{{ labelText }}</label>
        </FloatLabel>
    </div>
</template>

<style scoped></style>
