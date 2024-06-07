<script setup lang="ts">
import Curso from '@/components/Curso.vue';
import { gameTypeStore } from '@/stores/storeGameType';
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

const store = gameTypeStore();

onBeforeMount(async () => {
    data.value?.slice(data.value.length)
    await store.getTipoJuego();
});

const { seatData: data } = storeToRefs(store);

interface GameType {
    id: number,
    tipo: string,
}

const selectedTiposJuego = ref();
const submitted = ref(false);
const tipoJuegoDialog = ref(false);
const deleteTipoJuegoDialog = ref(false);
const deleteTiposJuegoDialog = ref(false);
const tipoJuego = ref<GameType>({
    id: 0,
    tipo: ""
});

const openNew = () => {
    tipoJuego.value = {
        id: 0,
        tipo: ""
    };
    submitted.value = false;
    tipoJuegoDialog.value = true;
};

const deleteTipoJuego = (id: number) => {
    store.deleteTipoJuego(id);
    deleteTipoJuegoDialog.value = false;
    window.location.reload();
};

const deleteTiposJuego = async () => {
    for (const tipoJuego of selectedTiposJuego.value) {
        await store.deleteTipoJuego(tipoJuego.id);
    }

    deleteTiposJuegoDialog.value = false;
    selectedTiposJuego.value = null;
    window.location.reload();
};


const editTipoJuego = (prod: GameType) => {
    tipoJuego.value = { ...prod };
    tipoJuegoDialog.value = true;
};

const confirmDeleteTipoJuego = (prod: GameType) => {
    tipoJuego.value = prod;
    tipoJuegoDialog.value = true;
};

const confirmDeleteSelected = () => {
    deleteTiposJuegoDialog.value = true;
};

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const hideDialog = () => {
    tipoJuegoDialog.value = false;
    submitted.value = false;
};

const saveTipoJuego = async () => {
    submitted.value = true;

    if (tipoJuego.value.tipo.trim() != '') {
        if (tipoJuego?.value.id == 0) {
            await store.addTipoJuego(tipoJuego.value.tipo);
        } else {
            await store.editTipoJuego(tipoJuego.value);
        }
        tipoJuegoDialog.value = false;
        tipoJuego.value = {
            id: 0,
            tipo: "",
        };
        window.location.reload()
    }

};

</script>

<template>
    <div class="card align-items-end">
        <DataTable ref="dt" :value="data" striped-rows v-model:selection="selectedTiposJuego" dataKey="id"
            :filters="filters">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                :disabled="!selectedTiposJuego || !selectedTiposJuego.length" />
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
            <Column field="tipo" header="TIPO DE JUEGO" sortable style="min-width:16rem"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editTipoJuego(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteTipoJuego(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="tipoJuegoDialog" :style="{ width: '450px' }" header="Detalle" :modal="true"
        class="p-fluid">
        <div class="card flex justify-content-center">
            <FloatLabel>
                <label for="name">Tipo de Juego</label>
                <InputText id="name" v-model.trim="tipoJuego.tipo" required="true" autofocus
                    :invalid="submitted && !tipoJuego.tipo" />
            </FloatLabel>
            <small class="p-error" v-if="submitted && !tipoJuego.tipo">El campo es obligatorio</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text @click="saveTipoJuego" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteTipoJuegoDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="tipoJuego">¿Estás seguro de borrar <b>{{ tipoJuego.tipo
                    }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteTipoJuegoDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteTipoJuego(tipoJuego.id)" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteTiposJuegoDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="tipoJuego">¿Estás seguro de borrar los tipos de juego seleccionados?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteTiposJuegoDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteTiposJuego" />
        </template>
    </Dialog>
</template>