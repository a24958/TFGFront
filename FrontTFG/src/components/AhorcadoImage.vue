<template>
    <picture>
        <img v-for="n in 8" :key="n" :src="`/src/assets/images/ahorcado/ahorcado_${n }.png`" :class="{ 'fade-in': intentos && intentos <= n }"
            :id="'image' + (6 - n)" />
    </picture>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    intentos: Number
});
</script>

<style scoped>
picture {
    position: relative;
}

picture img {
    position: absolute;
    top: -203px;
    left: -205px;
    height: 225px;
}

#image5,
#image4,
#image3,
#image2,
#image1,
#image0 {
    opacity: 0;
    transition: opacity .3s ease;
}

.fade-in {
    opacity: 1 !important;
}
</style>