<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
var userData = localStorage.getItem('userData');
var nombre = ''
if (userData != null){
    nombre = JSON.parse(userData).nombre;
}
</script>

<template>
    <h1>INTRANET ADMINISTRADOR</h1>
    <h2 >Bienvenido {{ nombre }} </h2>
</template>

<style scoped>
    
</style>