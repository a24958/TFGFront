<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import FloatLabel from "primevue/floatlabel";
import { ref } from "vue";

const props = defineProps<{
    labelText: string,
    array: any,
    optionLabel: string,
}>();

const selectedCity = ref();
</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedCity" :options="props.array" showClear :optionLabel="optionLabel"
                class="w-full md:w-14rem" id="gs" style="width: 14rem;" />
            <label for="gs">{{ labelText }}</label>
        </FloatLabel>
    </div>
</template>
