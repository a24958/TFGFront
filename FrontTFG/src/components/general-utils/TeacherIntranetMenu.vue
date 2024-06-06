<script setup lang="ts">
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Avatar from 'primevue/avatar';
import 'primevue/resources/themes/aura-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { ref } from 'vue';

const visible = ref(false)
</script>

<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visible">
            <template #header>
                <div class="flex align-items-center gap-2">
                    <RouterLink to="/teacher-intranet/crear-juegos"><img :src="'src/assets/images/pasapalabra.jpg'"
                            alt="" height="24px" width="24px" @click="visible = !visible"></RouterLink>
                </div>
            </template>
            <RouterLink to="/teacher-intranet/crear-juegos">
                <div class="list-item" @click="visible = !visible">
                    <i class="pi pi-plus-circle"></i>
                    <p>Crear Juegos</p>
                </div>
            </RouterLink>
            <RouterLink to="/teacher-intranet/graphs">
                <div class="list-item" @click="visible = !visible">
                    <i class="pi pi-chart-bar"></i>
                    <p>Estadísticas</p>
                </div>
            </RouterLink>
            <div class="list-item-exit-container">
                <RouterLink to="/">
                    <div class="mt-auto" @click="visible = !visible">
                        <i class="pi pi-sign-out"></i>
                        <p>Salir</p>
                    </div>
                </RouterLink>
            </div>
        </Sidebar>
        <Button icon="pi pi-bars" @click="visible = true" outlined />
    </div>
</template>

<style scoped>
.list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    border-radius: 8px;
}

.list-item i {
    margin-right: 16px;
    color: var(--primary-color);
}

a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
}

a:hover,
a:focus,
a:active {
    color: inherit;
    text-decoration: none;
}

.list-item:hover {
    background-color: var(--highlight-bg);
    color: var(--highlight-text-color);
    cursor: pointer
}

.list-item-exit-container {
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.mt-auto {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
    border-radius: 8px;
}

.mt-auto i {
    margin-right: 16px;
    color: var(--red-500);
}

.mt-auto:hover {
    background-color: var(--red-100);
    color: var(--red-500);
    cursor: pointer
}
</style>