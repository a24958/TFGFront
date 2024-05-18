<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    letra: string,
    contestado: boolean,
    acertado: boolean,
}>()

const dynamicClass = computed(() => ({
    acertado: props.acertado,
    fallado: !props.acertado && props.contestado,
    default: !props.contestado,
}))
</script>

<template>
    <div :class="dynamicClass">
        <p>{{ letra }}</p>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    height: 38px;
    width: 38px;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
    text-shadow: 0px 1px 1px black;
}

.default {
    background: linear-gradient(#3663aff7, #005eff82);
}

.acertado {
    background-color: rgb(0, 197, 0);
}

.fallado {
    background-color: red;
}
</style>