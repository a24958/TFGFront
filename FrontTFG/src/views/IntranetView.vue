<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import AsignaturasCard from '@/components/intranet-admin/AsignaturasCard.vue';
import CursosCard from '@/components/intranet-admin/CursosCard.vue';
import TipoJuegoCard from '@/components/intranet-admin/TipoJuegoCard.vue';
import AdminIntranetMenu from '@/components/general-utils/AdminIntranetMenu.vue';
import UsuariosCard from '@/components/intranet-admin/UsuariosCard.vue';


var userData = localStorage.getItem('userData');
var nombre = ''
if (userData != null) {
    nombre = JSON.parse(userData).nombre;
}
</script>

<template>
    <AdminIntranetMenu></AdminIntranetMenu>
    <section>
        <article>
            <h1>INTRANET ADMINISTRADOR</h1>
        </article>
        <article>
            <h2>Bienvenido {{ nombre }} </h2>
        </article>
        <article class="tarjetas">
            <AsignaturasCard></AsignaturasCard>
            <CursosCard></CursosCard>
            <TipoJuegoCard></TipoJuegoCard>
            <UsuariosCard></UsuariosCard>
        </article>
    </section>


</template>

<style scoped>
.tarjetas {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2,
h1 {
    color: #3B82F6;
}

@media screen and (min-width: 800px) {
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-left: 16px;
        margin-right: 16px;
    }

    .tarjetas {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>