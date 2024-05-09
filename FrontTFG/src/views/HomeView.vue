<script setup lang="ts">
import MostPopularGames from '@/components/MostPopularGames.vue';
</script>

<template>
    <section>
        <article>
            <div>
                <h2>NUESTROS JUEGOS MAS POPULARES</h2>
                <MostPopularGames></MostPopularGames>
            </div>
        </article>
        <article>
            <div>
                WIP NOT IMPLEMENTED
            </div>
        </article>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

@media screen and (min-width: 800px) {
    section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-left: 16px;
        margin-right: 16px;
    }
}
</style>