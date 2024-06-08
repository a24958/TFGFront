<script setup lang="ts">
import Ahorcado from '@/components/Ahorcado.vue';
import { ahorcadoStore } from '@/stores/storeAhorcado';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import router from "@/router";


let id = '';
for (const curso of router.currentRoute.value.params.id
) {
    id += curso
}

const store = ahorcadoStore();
onBeforeMount(async () => {
    await store.getAhorcadoById(id);
})
const { seatData: data } = storeToRefs(store);
</script>

<template>
    <div>
        <Ahorcado  />
    </div>
</template>