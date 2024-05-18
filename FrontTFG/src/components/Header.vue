<script setup lang="ts">
var userData = localStorage.getItem('userData');
var rol = ''
var nombre = ''
if (userData != null) {
    rol = JSON.parse(userData).rol;
    nombre = JSON.parse(userData).nombre;
}
</script>

<template>
    <header>
        <RouterLink to="/">HOME</RouterLink>

        <div v-if="rol !== 'Alumno'">
            <RouterLink to="/login" id="responsive-item">O</RouterLink>
            <RouterLink to="/login" id="no-responsive-item">Login</RouterLink>
        </div>
        <div v-else>
            <RouterLink to="/login">{{ nombre }}</RouterLink>

        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin-left: 8px;
    margin-right: 8px;
}

a {
    text-decoration: none;
}

#responsive-item {
    display: flex;
}

#no-responsive-item {
    display: none;
}

@media screen and (min-width: 800px) {

    #responsive-item {
        display: none;
    }

    #no-responsive-item {
        display: flex;
    }
}
</style>