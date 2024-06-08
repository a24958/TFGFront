<script setup lang="ts">

</script>

<template>
    <div class="cards-container">
        <div class="card">
            <img src="/src/assets/images/pasapalabra.jpg" alt="" class="card-images">
            <div class="card-texts">
                <p>PASAPALABRA</p>
                <p>¿Estas dispuesto a enfrentarte a este maravilloso reto?</p>
                <div class="card-game-quality">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                </div>
            </div>
        </div>
        <div class="card">
            <img src="/src/assets/images/ahorcado_card.jpg" alt="" class="card-images">
            <div class="card-texts">
                <p>AHORCADO</p>
                <p>¿Podrás sobrevivir antes este complicado juego de letras?</p>
                <div class="card-game-quality">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                    <img src="/src//assets/images/estrella.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cards-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    
}

.card {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 24px;
}

.card-texts {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    max-width: 300px;
    margin-left: 24px;
}

.card-images {
    height: 100px;
}

p {
    display: flex;
    align-items: start;
    margin-bottom: 8px;
    margin-top: 0px;
}

.card-game-quality {
    display: flex;
    align-items: center;
}
</style>