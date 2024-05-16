<script>
import { useJuegoStore } from '@/stores/storeCrearPasapalabra';
import { onMounted } from 'vue';

export default {
  setup() {
    const { juego, resultadoJson, generarJson, enviarJson } = useJuegoStore();

    const submitForm = async () => {
      generarJson();
      await enviarJson();
    };

    onMounted(() => {
      juego.preguntas = Array.from({ length: 26 }, (_, i) => ({
        letra: String.fromCharCode(65 + i),
        pregunta: '',
        respuesta: ''
      }));
    });

    return {
      juego,
      resultadoJson,
      submitForm
    };
  }
};
</script>


<template>
  <div>
    <h1>Crear Juego de Abecedario</h1>
    <form @submit.prevent="submitForm">
      <!-- Formulario como se mostró antes -->
      <div>
        <label for="name">Nombre del Juego:</label>
        <input v-model="juego.name" type="text" id="name" required />
      </div>
      <div>
        <label for="idJuego">ID del Juego:</label>
        <input v-model="juego.idJuego" type="number" id="idJuego" required />
      </div>
      <div>
        <label for="idCurso">ID del Curso:</label>
        <input v-model="juego.idCurso" type="number" id="idCurso" required />
      </div>
      <div>
        <label for="idAsignatura">ID de la Asignatura:</label>
        <input v-model="juego.idAsignatura" type="number" id="idAsignatura" required />
      </div>
      <div>
        <label for="temaJuego">Tema del Juego:</label>
        <input v-model="juego.temaJuego" type="text" id="temaJuego" required />
      </div>
      <div v-for="(pregunta, index) in juego.preguntas" :key="index">
        <h3>Pregunta {{ String.fromCharCode(65 + index) }}</h3>
        <label>Letra: {{ String.fromCharCode(65 + index) }}</label>
        <br />
        <label for="pregunta">Pregunta:</label>
        <input v-model="pregunta.pregunta" type="text" :id="'pregunta' + index" required />
        <br />
        <label for="respuesta">Respuesta:</label>
        <input v-model="pregunta.respuesta" type="text" :id="'respuesta' + index" required />
      </div>
      <button type="submit">Crear</button>
    </form>
  </div>
</template>


<style>
/* Añade estilos según sea necesario */
form {
  max-width: 600px;
  margin: auto;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
