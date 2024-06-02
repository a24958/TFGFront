<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useJuegoStore } from '@/stores/storeCrearPasapalabra';
import CreateGameTextInput from './teacher-create-game-form/CreateGameTextInput.vue';
import CreateGameSelector from './teacher-create-game-form/CreateGameSelector.vue';
import CreateGameQARow from './teacher-create-game-form/CreateGameQ&ARow.vue';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import 'primeicons/primeicons.css'
import FileUpload from 'primevue/fileupload';
import Pasapalabra from './Pasapalabra.vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { gameTypeStore } from '@/stores/storeGameType';
import { storeToRefs } from 'pinia';
import { cursoStore } from '@/stores/storeCurso';
import { asignaturaJuegoStore } from '@/stores/storeAsignaturaJuego';

const confirm = useConfirm();
const toast = useToast();

const confirm1 = () => {
  confirm.require({
    message: 'Pulse en crear para crear el juego',
    header: '¿Estás seguro?',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Crear',
    accept: () => {
      toast.add({ severity: 'success', summary: 'Creado', detail: 'Juego creado correctamente', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Creación de juego cancleada correctamente', life: 3000 });
    }
  });
};

const confirm2 = () => {
  confirm.require({
    message: 'Pulse en borrar si quiere cancelar la creacion de Juego',
    header: '¿Estás seguro?',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Borrar',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      toast.add({ severity: 'success', summary: 'Cancelado', detail: 'Se ha cacelado la creación de juego', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Se ha producido algun error mientras se producía la operació', life: 3000 });
    }
  });
};



// Accedemos a los stores
const { juego } = useJuegoStore();

const storeJuegos = gameTypeStore();
const storeCursos = cursoStore();
const storeAsignaturas = asignaturaJuegoStore();

onBeforeMount(async () => {
  await storeJuegos.getTipoJuego();
  await storeCursos.getCursos();
  await storeAsignaturas.getAsignaturas();
})

const { seatData: juegos } = storeToRefs(storeJuegos);
const { seatData: cursos } = storeToRefs(storeCursos);
const { setAsignatuaJuegoData: asignaturas } = storeToRefs(storeAsignaturas);


</script>

<template>
  <div class="create_game_form_container">
    <h1>Crear Juegos</h1>
    <form @submit.prevent="">
      <div class="game_properties">
        <CreateGameTextInput :label-text="'Nombre del Juego'"></CreateGameTextInput>
        <CreateGameSelector :label-text="'Juego'" :array="juegos" :option-label="'tipo'"></CreateGameSelector>
        <CreateGameSelector :label-text="'Curso'" :array="cursos" :option-label="'nombreCurso'"></CreateGameSelector>
        <CreateGameSelector :label-text="'Asignatura'" :array="asignaturas" :option-label="'nombreAsignatura'">
        </CreateGameSelector>
      </div>
      <CreateGameTextInput :label-text="'Tema del Juego'"></CreateGameTextInput>
      <br>
      <div v-for="(pregunta, index) in juego.preguntas" :key="index">
        <CreateGameQARow :letra="pregunta.letra" :label-answer-text="'Respuesta'" :label-question-text="'Pregunta'">
        </CreateGameQARow>
      </div>
    </form>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="card flex flex-wrap gap-2 justify-content-center">
      <Button @click="confirm1()" label="Crear" severity="success"></Button>
      <Button @click="confirm2()" label="Borrar" severity="danger"></Button>
    </div>
  </div>
</template>


<style scoped>
/* Añade estilos según sea necesario */
.create_game_form_container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
}

.game_properties {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
}

div {
  margin-bottom: 20px;
}
</style>
