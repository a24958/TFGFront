<script setup lang="ts">
import CourseSelector from './components/CourseSelector.vue'
import GameSelector from './components/GameSelector.vue'
</script>

<template>
    <CourseSelector></CourseSelector>
    <GameSelector></GameSelector>
    <button>
        <RouterLink to="/pasapalabra">Jugar</RouterLink>
    </button>
    <RouterView></RouterView>
</template>

<style scoped></style>
