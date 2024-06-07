<script setup lang="ts">
import MostPopularGames from '@/components/MostPopularGames.vue';
import GameForm from '@/components/home-form/GameForm.vue';
import Button from 'primevue/button';
import router from '@/router';

const load = async () => {
    router.push({ name: 'multiplayer' })
}
</script>

<template>
    <section>
        <article>
            <div class="test">
                <h2>NUESTROS JUEGOS MAS POPULARES</h2>
                <MostPopularGames></MostPopularGames>
            </div>
        </article>
        <article>
            <Button type="button" label="Multijugador" icon="" @click="load"
                style="width: 30rem; height: 5rem; " />
        </article>
        <article>
            <div style="width: 400px;">
                <GameForm></GameForm>
            </div>
        </article>
    </section>

</template>

<style scoped>
.test {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 24px;
    margin-left: 24px;
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