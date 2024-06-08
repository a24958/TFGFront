<script setup lang="ts">
import MostPopularGames from '@/components/MostPopularGames.vue';
import GameForm from '@/components/home-form/GameForm.vue';
import Button from 'primevue/button';
import router from '@/router';
import Card from 'primevue/card';



const load = async () => {
    router.push({ name: 'multiplayer' })
}
</script>

<template>
    <section>
        <article>
            <div class="test">
                <h2>JUEGOS MAS POPULARES</h2>
                <MostPopularGames></MostPopularGames>
            </div>
        </article>
        <article class="card">
            <Card style="width: 25rem ; overflow: hidden">
                <template  #header>
                    <div class="image">
                        <img alt="user header" src="@/assets/images/duelo.jpg" />

                    </div>
                </template>
                <template #title>Multijugador</template>
                <template #content>
                    <p class="m-0">
                        ¿Aceptas el desafio de jugar contra tu compañero, en un Pasapalabra con preguntas aleatorias?
                    </p>
                </template>
                <template #footer>
                    <div class="boton">
                        <Button @click="load" label="Jugar" class="w-full" />
                    </div>
                </template>
            </Card>
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
        align-items: stretch;
        justify-content: space-around;
        margin-left: 16px;
        margin-right: 16px;
    }
}
.p-card p-component{
    display: flex;
    align-items: center;
}

img{
    height: 250px;
}

.boton{
    display: flex;
    flex-direction: column;
}
.image{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>