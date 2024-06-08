<script setup lang="ts">
import { asignaturaStore } from '@/stores/storeAsignatura';
import Asignatura from '../Asignatura.vue';
import { onBeforeMount, ref } from "vue";
import { storeToRefs, type StateTree } from "pinia";
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


const store = asignaturaStore();

onBeforeMount(async () => {
    data.value.slice(0, data.value.length);
    await store.getAsignaturas();
});

const { asignaturas: data } = storeToRefs(store);

interface Asignatura {
    id: number;
    nombreAsignatura: string;
}

const selectedAsignaturas = ref();
const submitted = ref(false);
const asignaturaDialog = ref(false);
const deleteAsignaturaDialog = ref(false);
const deleteAsignaturasDialog = ref(false);
const asignatura = ref<Asignatura>({
    id: 0,
    nombreAsignatura: ""
});

const openNew = () => {
    asignatura.value = {
        id: 0,
        nombreAsignatura: ""
    };
    submitted.value = false;
    asignaturaDialog.value = true;
};

const deleteAsignatura = (id: number) => {
    store.deleteAsignatura(id);
    deleteAsignaturaDialog.value = false;
    window.location.reload();
};

const deleteAsignaturas = () => {
    for (const asignatura of selectedAsignaturas.value) {
        store.deleteAsignatura(asignatura.id);
    }

    deleteAsignaturasDialog.value = false;
    selectedAsignaturas.value = null;
    window.location.reload();
};


const editAignatura = (prod: Asignatura) => {
    asignatura.value = { ...prod };
    asignaturaDialog.value = true;
};

const confirmDeleteAsignatura = (prod: Asignatura) => {
    asignatura.value = prod;
    deleteAsignaturaDialog.value = true;
};

const confirmDeleteSelected = () => {
    deleteAsignaturasDialog.value = true;
};

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const hideDialog = () => {
    asignaturaDialog.value = false;
    submitted.value = false;
};

const saveAsignatura = async () => {
    submitted.value = true;

    if (asignatura.value.nombreAsignatura.trim() != '') {
        if (asignatura?.value.id == 0) {
            await store.addAsignatura(asignatura.value.nombreAsignatura);
        } else {
            await store.editAsignatura(asignatura.value);
        }
        asignaturaDialog.value = false;
        asignatura.value = {
            id: 0,
            nombreAsignatura: "",
        };
        window.location.reload()
    }

};

</script>

<template>
    <AdminIntranetMenu></AdminIntranetMenu>

    <div class="card align-items-end">
        <DataTable ref="dt" :value="data" striped-rows v-model:selection="selectedAsignaturas" dataKey="id"
            :filters="filters">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                :disabled="!selectedAsignaturas || !selectedAsignaturas.length" />
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
            <Column field="nombreAsignatura" header="ASIGNATURA" sortable style="min-width:16rem"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editAignatura(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteAsignatura(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="asignaturaDialog" :style="{ width: '450px' }" header="Detalle" :modal="true"
        class="p-fluid">
        <div class="card flex justify-content-center">
            <FloatLabel>
                <label for="name">Asignatura</label>
                <InputText id="name" v-model.trim="asignatura.nombreAsignatura" required="true" autofocus
                    :invalid="submitted && !asignatura.nombreAsignatura" />
            </FloatLabel>
            <small class="p-error" v-if="submitted && !asignatura.nombreAsignatura">El campo es obligatorio</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text @click="saveAsignatura" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteAsignaturaDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="asignatura">¿Estás seguro de borrar <b>{{ asignatura.nombreAsignatura
                    }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteAsignaturaDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteAsignatura(asignatura.id)" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteAsignaturasDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="asignatura">¿Estás seguro de borrar las asignaturas seleccionadas?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteAsignaturasDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteAsignaturas" />
        </template>
    </Dialog>
</template>

<style scoped></style>
