<script setup lang="ts">
import Curso from '@/components/Curso.vue';
import { cursoStore } from '@/stores/storeCurso';
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


const store = cursoStore();

onBeforeMount(async () => {
    data.value?.slice(data.value.length)
    await store.getCursos();
});

const { seatData: data } = storeToRefs(store);

interface Curso {
    id: number;
    nombreCurso: string;
}

const selectedCursos = ref();
const submitted = ref(false);
const cursoDialog = ref(false);
const deleteCursoDialog = ref(false);
const deleteCursosDialog = ref(false);
const curso = ref<Curso>({
    id: 0,
    nombreCurso: ""
});

const openNew = () => {
    curso.value = {
        id: 0,
        nombreCurso: ""
    };
    submitted.value = false;
    cursoDialog.value = true;
};

const deleteCurso = (id: number) => {
    store.deleteCurso(id);
    deleteCursoDialog.value = false;
    window.location.reload();
};

const deleteCursos = () => {
    for (const curso of selectedCursos.value) {
        store.deleteCurso(curso.id);
    }

    deleteCursosDialog.value = false;
    selectedCursos.value = null;
    window.location.reload();
};


const editCurso = (prod: Curso) => {
    curso.value = { ...prod };
    cursoDialog.value = true;
};

const confirmDeleteCurso = (prod: Curso) => {
    curso.value = prod;
    cursoDialog.value = true;
};

const confirmDeleteSelected = () => {
    deleteCursosDialog.value = true;
};

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const hideDialog = () => {
    cursoDialog.value = false;
    submitted.value = false;
};

const saveCurso = async () => {
    submitted.value = true;

    if (curso.value.nombreCurso.trim() != '') {
        if (curso?.value.id == 0) {
            await store.addCurso(curso.value.nombreCurso);
        } else {
            await store.editCurso(curso.value);
        }
        cursoDialog.value = false;
        curso.value = {
            id: 0,
            nombreCurso: "",
        };
        window.location.reload()
    }

};

</script>

<template>
    <AdminIntranetMenu></AdminIntranetMenu>
    <div class="card align-items-end">
        <DataTable ref="dt" :value="data" striped-rows v-model:selection="selectedCursos" dataKey="id"
            :filters="filters">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                :disabled="!selectedCursos || !selectedCursos.length" />
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

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="id" header="ID" sortable style="min-width:12rem"></Column>
            <Column field="nombreCurso" header="CURSO" sortable style="min-width:16rem"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCurso(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteCurso(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="cursoDialog" :style="{ width: '450px' }" header="Detalle" :modal="true" class="p-fluid">
        <div class="card flex justify-content-center">
            <FloatLabel>
                <label for="name">Curso</label>
                <InputText id="name" v-model.trim="curso.nombreCurso" required="true" autofocus
                    :invalid="submitted && !curso.nombreCurso" />
            </FloatLabel>
            <small class="p-error" v-if="submitted && !curso.nombreCurso">El campo es obligatorio</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text @click="saveCurso" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteCursoDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="curso">¿Estás seguro de borrar <b>{{ curso.nombreCurso
                    }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteCursoDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteCurso(curso.id)" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteCursosDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="curso">¿Estás seguro de borrar los cursos seleccionados?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteCursosDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteCursos" />
        </template>
    </Dialog>
</template>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
