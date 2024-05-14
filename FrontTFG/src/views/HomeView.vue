<script setup lang="ts">
import MostPopularGames from '@/components/MostPopularGames.vue';
import GameForm from '@/components/home-form/GameForm.vue';
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
                <GameForm></GameForm>
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

h2 {
    color: #3B82F6;
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