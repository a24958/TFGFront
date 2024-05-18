<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useJuegoStore } from '@/stores/storeCrearPasapalabra';
import CreateGameTextInput from './teacher-create-game-form/CreateGameTextInput.vue';
import CreateGameSelector from './teacher-create-game-form/CreateGameSelector.vue';
import CreateGameQARow from './teacher-create-game-form/CreateGameQ&ARow.vue';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Pasapalabra from './Pasapalabra.vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: '¿Estas seguro?',
    message: 'Por favor, acepte para continuar',
    accept: () => {
      toast.add({ severity: 'success', summary: 'Confirmado', detail: 'Juego Creado Correctamente', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Cancelada la creación de juego', life: 3000 });
    }
  });
};



// Accedemos al store
const { juego, resultadoJson, generarJson, enviarJson } = useJuegoStore();

const juegos = [{ name: 'Pasapalabra' }]
const cursos = [
  { name: '1º Primaria' },
  { name: '2º Primaria' },
  { name: '3º Primaria' },
  { name: '4º Primaria' },
  { name: '5º Primaria' },
  { name: '6º Primaria' },
]
const asignaturas = [
  { name: 'Literatura' },
  { name: 'Matemáticas' },
  { name: 'Conocimiento del Medio' },
  { name: 'Artes Plásticas' },
  { name: 'Inglés' },
]
// Definimos la función submitForm
const submitForm = async () => {
  generarJson();
  await enviarJson();
};

// Configuramos el ciclo de vida del componente
onMounted(() => {
  juego.preguntas = Array.from({ length: 26 }, (_, i) => ({
    letra: String.fromCharCode(65 + i),
    pregunta: '',
    respuesta: ''
  }));
});
</script>

<template>
  <div class="create_game_form_container">
    <h1>Crear Juegos</h1>
    <form @submit.prevent="submitForm">
      <div class="game_properties">
        <CreateGameTextInput :label-text="'Nombre del Juego'"></CreateGameTextInput>
        <CreateGameSelector :label-text="'Juego'" :array="juegos"></CreateGameSelector>
        <CreateGameSelector :label-text="'Curso'" :array="cursos"></CreateGameSelector>
        <CreateGameSelector :label-text="'Asignatura'" :array="asignaturas"></CreateGameSelector>
      </div>
      <CreateGameTextInput :label-text="'Tema del Juego'"></CreateGameTextInput>
      <br>
      <div v-for="(pregunta, index) in juego.preguntas" :key="index">
        <CreateGameQARow :letra="pregunta.letra" :label-answer-text="'Respuesta'" :label-question-text="'Pregunta'">
        </CreateGameQARow>
      </div>
      <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
            <div
              class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
              <i class="pi pi-question text-5xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex align-items-center gap-2 mt-4">
              <Button label="Save" @click="acceptCallback"></Button>
              <Button label="Cancel" outlined @click="rejectCallback"></Button>
            </div>
          </div>
        </template>
      </ConfirmDialog>
      <div class="card flex justify-content-center">
        <Button @click="requireConfirmation()" label="Crear"></Button>
      </div>
      <Toast />
    </form>
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
