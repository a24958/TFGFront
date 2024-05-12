<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import { ref } from "vue";

const selectedItem = ref();

const props = defineProps<{
    itemList: { name: string; }[],
    labelText: string,
}>()

</script>

<template>
    <div class="card flex justify-content-center">
        <FloatLabel>
            <Dropdown v-model="selectedItem" :options="props.itemList" showClear optionLabel="name"
                class="w-full md:w-14rem" inputId="bc" style="width: 14rem;" />
            <label for="bc">{{ labelText }}</label>
        </FloatLabel>
    </div>
</template>

<style scoped></style>
