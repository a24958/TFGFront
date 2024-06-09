<script setup lang="ts">
import { usuariosStore } from '@/stores/storeUsuarios';
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


const store = usuariosStore();

onBeforeMount(async () => {
    data.value.slice(0, data.value.length);
    await store.getUsuarios();
});

const { usuarios: data } = storeToRefs(store);

interface Usuario {
    id: number,
    name: string,
    email: string,
    rol: string,
}

const selectedUsuarios = ref();
const submitted = ref(false);
const usuarioDialog = ref(false);
const deleteUsuarioDialog = ref(false);
const deleteUsuariosDialog = ref(false);
const usuario = ref<Usuario>({
    id: 0,
    name: "",
    email: "",
    rol: "",
});

const openNew = () => {
    usuario.value = {
        id: 0,
        name: "",
        email: "",
        rol: "",
    };
    submitted.value = false;
    usuarioDialog.value = true;
};

const deleteUsuario = (id: number) => {
    store.deleteUsuario(id);
    deleteUsuarioDialog.value = false;
    window.location.reload();
};

const deleteUsuarios = () => {
    for (const usuario of selectedUsuarios.value) {
        store.deleteUsuario(usuario.id);
    }

    deleteUsuarioDialog.value = false;
    selectedUsuarios.value = null;
    window.location.reload();
};


const editUsuario = (prod: Usuario) => {
    usuario.value = { ...prod };
    usuarioDialog.value = true;
};

const confirmDeleteUsuario = (prod: Usuario) => {
    usuario.value = prod;
    deleteUsuarioDialog.value = true;
};

const confirmDeleteSelected = () => {
    deleteUsuariosDialog.value = true;
};

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const hideDialog = () => {
    usuarioDialog.value = false;
    submitted.value = false;
};

const saveUsuario = async () => {
    submitted.value = true;

    if (usuario.value.name.trim() != '' || usuario.value.email.trim() != '' || usuario.value.rol.trim() != '') {
        if (usuario?.value.id == 0) {
            await store.addUsuario(usuario.value);
        } else {
            await store.editUsuario(usuario.value);
        }
        usuarioDialog.value = false;
        usuario.value = {
            id: 0,
            name: "",
            email: "",
            rol: "",
        };
        window.location.reload()
    }

};

</script>

<template>
    <AdminIntranetMenu></AdminIntranetMenu>

    <div class="card align-items-end">
        <DataTable ref="dt" :value="data" striped-rows v-model:selection="selectedUsuarios" dataKey="id"
            :filters="filters">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <Toolbar class="mb-4">
                        <template #start>
                            <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                :disabled="!selectedUsuarios || !selectedUsuarios.length" />
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
            <Column field="name" header="NOMBRE" sortable style="min-width:16rem"></Column>
            <Column field="email" header="CORREO" sortable style="min-width:16rem"></Column>
            <Column field="rol" header="ROL" sortable style="min-width:16rem"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUsuario(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteUsuario(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="usuarioDialog" :style="{ width: '450px' }" header="Detalle" :modal="true" class="p-fluid">
        <div class="card flex justify-content-center">
            <FloatLabel>
                <label for="nombre">Nombre</label>
                <InputText id="nombre" v-model.trim="usuario.name" required="true" autofocus
                    :invalid="submitted && !usuario.name" />
            </FloatLabel>
            <small class="p-error" v-if="submitted && !usuario.name">El campo es obligatorio</small>
        </div>
        <div class="card flex justify-content-center">
            <FloatLabel>
                <label for="correo">Correo</label>
                <InputText id="correo" v-model.trim="usuario.email" required="true" autofocus
                    :invalid="submitted && !usuario.email" />
            </FloatLabel>
            <small class="p-error" v-if="submitted && !usuario.email">El campo es obligatorio</small>
        </div>
        <div class="card flex justify-content-center">
            <FloatLabel>
                <label for="rol">Rol</label>
                <InputText id="rol" v-model.trim="usuario.rol" required="true" autofocus
                    :invalid="submitted && !usuario.rol" />
            </FloatLabel>
            <small class="p-error" v-if="submitted && !usuario.rol">El campo es obligatorio</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text @click="saveUsuario" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteUsuarioDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="usuario">¿Estás seguro de borrar <b>{{ usuario.name
                    }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteUsuarioDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteUsuario(usuario.id)" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteUsuariosDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="usuario">¿Estás seguro de borrar los usuarios seleccionados?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteUsuariosDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteUsuarios" />
        </template>
    </Dialog>
</template>

<style scoped></style>
