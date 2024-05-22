<script setup lang="ts">
import { gameFormStore } from '@/stores/storeGameForm';
import { storeToRefs } from 'pinia';
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import { ref, watch } from "vue";

const selectedItem = ref();
const store = gameFormStore();

const props = defineProps<{
    labelText: string,
    itemList: Curso[] | Asignatura[] | undefined,
}>()

watch(selectedItem, (newValue, oldValue) => {
    store.fillRequestOption(newValue, props.labelText);
});

interface Curso {
    id: number,
    nombreCurso: string,
}

interface Asignatura {
    id: number,
    nombreAsignatura: string
}

</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedItem" :options="props.itemList" showClear :optionLabel="`nombre${labelText}`"
                class="w-full md:w-14rem" inputId="bc" style="width: 16rem;" />
            <label for="bc">{{ labelText }}</label>
        </FloatLabel>
    </div>
</template>

<style scoped></style>
