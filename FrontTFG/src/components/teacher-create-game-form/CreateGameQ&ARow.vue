<script setup lang="ts">
import CreateGameTextInput from './CreateGameTextInput.vue';

const props = defineProps<{
    letra: string,
    labelQuestionText: string,
    labelAnswerText: string,
    isValid: boolean,
}>();
</script>

<template>
    <div>
        <p>{{ letra }}</p>
        <CreateGameTextInput :label-text="labelQuestionText" :letra="letra" :is-valid="isValid" class="inputs">
        </CreateGameTextInput>
        <CreateGameTextInput :label-text="labelAnswerText" :letra="letra" :is-valid="isValid" class="inputs">
        </CreateGameTextInput>
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    width: 930px;
}

p {
    flex: 1;
}

.inputs {
    flex: 8;
}
</style>