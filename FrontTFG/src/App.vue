<script setup lang="ts">

var userData = localStorage.getItem('userData');
var rol = ''
var nombre = ''
if (userData != null){
    rol = JSON.parse(userData).rol;
    nombre = JSON.parse(userData).nombre;

}
</script>

<!-- <template>
    <CourseSelector></CourseSelector>
    <GameSelector></GameSelector>
    <button>
        <RouterLink to="/pasapalabra">Jugar</RouterLink>
    </button>
    <RouterView></RouterView>
</template> -->

<template>
    <header >
        <RouterLink to="/curso">Curso</RouterLink>
        <div v-if="rol !== 'Alumno'">
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>

        </div>
        <div v-else>
            <RouterLink  to="/login">Bienvenido {{ nombre }}</RouterLink>

        </div>

    </header>
        
    <RouterView></RouterView>
    
</template>

<style scoped>
header{
    display: flex;
    justify-content: space-around;
}

div{
    display: flex;
    justify-content: space-around;

}
</style>
