<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('userData');
    window.location.reload();
    router.push('/login');

};

let userData = localStorage.getItem('userData');
let rol = '';
let nombre = '';
if (userData) {
    const parsedData = JSON.parse(userData);
    rol = parsedData.rol;
    nombre = parsedData.nombre;
}
</script>


<template>
    <header>
        <RouterLink to="/"><img src="/src/assets/images/logo.png" alt=""></RouterLink>

        <div class="rol" v-if="rol == 'Alumno'">
            <RouterLink to="/usuario">
                <div class="info-user">
                    <img class="avatar" src="/src/assets/images/astronauta.png" alt="">
                    {{ nombre }}
                </div>
            </RouterLink>
        </div>
        <div v-else>
            <div class="rol" v-if="rol == 'Admin'">
                <RouterLink to="/intranet" id="responsive-item"> <img class="avatar"
                        src="/src/assets/images/astronauta.png" alt=""> </RouterLink>
                <RouterLink to="/intranet" id="no-responsive-item"> <img class="avatar"
                        src="/src/assets/images/astronauta.png" alt=""> </RouterLink>

            </div>
            <div v-else>
                <div class="rol" v-if="rol == 'Profesor'">
                    <RouterLink to="/teacher-intranet/crear-juegos" id="responsive-item"> <img class="avatar"
                            src="/src/assets/images/astronauta.png" alt=""> </RouterLink>
                    <RouterLink to="/teacher-intranet/crear-juegos" id="no-responsive-item"> <img class="avatar"
                            src="/src/assets/images/astronauta.png" alt=""> </RouterLink>

                </div>
                <div v-else>
                    <RouterLink to="/login" id="responsive-item"> <img class="avatar"
                            src="/src/assets/images/astronauta.png" alt=""> </RouterLink>
                    <RouterLink to="/login" id="no-responsive-item"> <img class="avatar"
                            src="/src/assets/images/astronauta.png" alt=""> </RouterLink>
                </div>
            </div>

        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 13px;
    margin-left: 8px;
    margin-right: 8px;
}

.rol {
    display: flex;
    flex-direction: row;
}

a {
    text-decoration: none;
}

img {
    height: 100px;
}

.avatar {
    height: 40px;
}

.cerrar-sesion {
    height: 50px;
}

.info-user {
    display: flex;
    flex-direction: column;
    align-items: center;
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