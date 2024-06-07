<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useJuegoStore } from '@/stores/storeCrearPasapalabra';
import CreateGameTextInput from './teacher-create-game-form/CreateGameTextInput.vue';
import CreateGameSelector from './teacher-create-game-form/CreateGameSelector.vue';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import 'primeicons/primeicons.css'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import Dialog from 'primevue/dialog';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { gameTypeStore } from '@/stores/storeGameType';
import { storeToRefs } from 'pinia';
import { cursoStore } from '@/stores/storeCurso';
import { asignaturaJuegoStore } from '@/stores/storeAsignaturaJuego';

import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import TeacherIntranetMenu from './general-utils/TeacherIntranetMenu.vue';

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
    accept: async () => {
      store.enviarJson(preguntas.value);

      isValid.value = store.isFullRequestBodyCorrect();
      if (isValid.value === true && fileName.value === 'data.csv') {

      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Algún campo del formulario esta vacío o archivo de preguntas incorrecto', life: 3000 });
      }
    },
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
      toast.add({ severity: 'success', summary: 'Borrado', detail: 'Se han borrado todos los campos', life: 3000 });
    },
  });
};



// Accedemos a los stores
const store = useJuegoStore();

const isValid = ref(true);

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

const preguntas = ref();
const showPanel = ref(false);
const fileName = ref('');

// Datos para el CSV
const data = [
  {
    "letra": "A",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "B",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "C",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "D",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "E",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "F",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "G",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "H",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "I",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "J",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "K",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "L",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "M",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "N",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "O",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "P",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "Q",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "R",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "S",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "T",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "U",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "V",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "W",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "X",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "Y",
    "pregunta": "",
    "respuesta": "",
  },
  {
    "letra": "Z",
    "pregunta": "",
    "respuesta": "",
  }
];
// Función para descargar el CSV
const downloadCSV = () => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'data.csv');
};


const handleFileUpload = (event: FileUploadSelectEvent) => {
  const file = event.files && event.files.length > 0 ? event.files[0] : null;

  if (file && file.name === 'data.csv') {
    const reader = new FileReader();

    reader.onload = () => {
      const csv = reader.result;

      if (typeof csv === 'string') {
        Papa.parse(csv, {
          complete: (results: any) => {
            const updatedData = results.data.map((item: any) => ({
              ...item,
              acertado: false,
              contestado: false
            }));

            preguntas.value = updatedData;
            fileName.value = file.name;
            console.log(preguntas.value);
          },
          header: true,
        });
      } else {
        console.error('The file could not be read as a string.');
      }
    };

    reader.readAsText(file);
  } else {
    showDialog();
  }
};

function showDialog() {
  showPanel.value = true;
}

function closeDialog() {
  showPanel.value = false;
}

</script>

<template>
  <TeacherIntranetMenu></TeacherIntranetMenu>
  <div class="create_game_form_container">
    <h1>Crear Juegos</h1>
    <Dialog v-model:visible="showPanel" modal :header="'ATENCION'" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <p class="m-0">
        POR FAVOR SELECCIONE EL ARCHIVO CON EL NOMBRE CORRECTO (data.csv)
      </p>
      <Button :label="'Entendido'" @click="closeDialog()"></Button>
    </Dialog>
    <form @submit.prevent="">
      <div class="game_properties">
        <CreateGameTextInput :label-text="'Nombre del Juego'" :letra="''" :is-valid="!isValid"></CreateGameTextInput>
        <CreateGameSelector :label-text="'Juego'" :array="juegos" :option-label="'tipo'" :is-valid="!isValid">
        </CreateGameSelector>
        <CreateGameSelector :label-text="'Curso'" :array="cursos" :option-label="'nombreCurso'" :is-valid="!isValid">
        </CreateGameSelector>
        <CreateGameSelector :label-text="'Asignatura'" :array="asignaturas" :option-label="'nombreAsignatura'"
          :is-valid="!isValid">
        </CreateGameSelector>
      </div>
      <CreateGameTextInput :label-text="'Tema del Juego'" :letra="''" :is-valid="!isValid" </CreateGameTextInput>
    </form>
    <div class="actions-buttons">
      <FileUpload choose-label="Cargar Preguntas" mode="basic" accept="text/csv" :maxFileSize="1000000"
        @select="handleFileUpload" />
      <Button label="Descargar Plantilla" icon="pi pi-download" severity="contrast" @click="downloadCSV()" />
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="card flex flex-wrap gap-2 justify-content-center">
      <Button @click="confirm1()" label="Crear" severity="success" style="margin-right: 16px;"></Button>
      <Button @click="confirm2()" label="Borrar" severity="danger" style="margin-right: 16px;"></Button>
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

.actions-buttons {
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.actions-buttons div {
  margin-bottom: 0px;
  margin-right: 8px;
}
</style>
