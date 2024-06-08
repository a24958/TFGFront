<script setup lang="ts">
import Curso from '@/components/Curso.vue';
import { resultadosStore } from '@/stores/storeResultados';
import { storeToRefs } from 'pinia';
import { ref, onBeforeMount } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext";
import { FilterMatchMode } from 'primevue/api';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import FloatLabel from "primevue/floatlabel";
import AdminIntranetMenu from '@/components/general-utils/AdminIntranetMenu.vue';


const store = resultadosStore();

const userData = localStorage.getItem('userData');
const id = userData ? JSON.parse(userData).id : null;


onBeforeMount(async () => {
    data.value?.slice(data.value.length)
    await store.getResultadosProfesor(id);
});

const { resultado: data } = storeToRefs(store);

interface Resultado {
    usuario: string,
    juego: string,
    resultado: number,
    acertadas: number,
    falladas: number,
}


const selectedCursos = ref();



const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});


</script>

<template>
    <div class="card-align-items-end">
        <DataTable ref="dt" scrollable scrollHeight="500px" :value="data" striped-rows v-model:selection="selectedCursos" dataKey="id"
            :filters="filters">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <Toolbar class="mb-4">
                        <template #start>
                                RESULTADOS
                        </template>
                        <template #end>
                            <IconField iconPosition="left">
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </template>
                    </Toolbar>
                </div>
            </template>
            
            <Column field="usuario" header="USUARIO" sortable style="min-width:12rem"></Column>
            <Column field="juego" header="JUEGO" sortable style="min-width:16rem"></Column>
            <Column field="resultado" header="RESULTADO" sortable style="min-width:12rem"></Column>
            <Column field="acertadas" header="ACERTADAS" sortable style="min-width:12rem"></Column>
            <Column field="falladas" header="FALLADAS" sortable style="min-width:12rem"></Column>

        </DataTable>
    </div>
    <br>
    <br>
    <br>
    <br>

</template>

<style scoped>
.card-align-items-end{
    margin-top: 50px;
}
</style>
