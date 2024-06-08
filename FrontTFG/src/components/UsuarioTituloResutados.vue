<script setup lang="ts">

</script>

<template>
    <div class="result-details">
        <p><strong>Juego</strong> </p>
        <p><strong>Resultado</strong> </p>
        <p><strong>Acertadas</strong> </p>
        <p><strong>Falladas</strong> </p>
    </div>
</template>

<style scoped>
.result-details {
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    border: 1px solid #3B82F6; 
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}
.result-details p {
    margin: 5px 0;
}

p{
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

strong{
    color: #3B82F6;
}
</style>
