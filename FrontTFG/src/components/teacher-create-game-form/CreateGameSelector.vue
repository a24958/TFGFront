<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import FloatLabel from "primevue/floatlabel";
import { ref } from "vue";
import { watch } from 'vue';
import { useJuegoStore } from '@/stores/storeCrearPasapalabra';

const storeCrearPasapalabra = useJuegoStore();

const props = defineProps<{
    labelText: string,
    array: any,
    optionLabel: string,
}>();

const selectedOption = ref();

watch(selectedOption, (newValue, oldValue) => {
    storeCrearPasapalabra.fillRequestHeader("", newValue, props.labelText);
});
</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedOption" :options="props.array" showClear :optionLabel="optionLabel"
                class="w-full md:w-14rem" id="gs" style="width: 14rem;" />
            <label for="gs">{{ labelText }}</label>
        </FloatLabel>
    </div>
</template>
