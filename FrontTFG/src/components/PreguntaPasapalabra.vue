<script setup lang="ts">
import MoonSvg from './MoonSvg.vue';
const props = defineProps<{
    id: number,
    pregunta: string,
    respuesta: string,
    letra: string,
    contestado: boolean,
    acertado: boolean,
}>()
</script>

<template>
    <div>
       <MoonSvg :letra="letra"></MoonSvg>
    </div>
</template>

<style scoped>
div{
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   border: 1px solid black;
   height: 32px;
   width: 32px;
   border-radius: 50%;
}

</style>