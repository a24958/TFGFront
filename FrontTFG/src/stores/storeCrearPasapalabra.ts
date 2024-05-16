import { defineStore } from 'pinia';
import { reactive, ref } from "vue";

export const useJuegoStore = defineStore('juegoStore', () => {
  const juego = reactive({
    name: '',
    idJuego: null,
    idCurso: null,
    idAsignatura: null,
    temaJuego: '',
    preguntas: Array.from({ length: 26 }, (_, i) => ({
      letra: String.fromCharCode(65 + i),
      pregunta: '',
      respuesta: ''
    }))
  });

  const resultadoJson = ref('');

  const generarJson = () => {
    resultadoJson.value = JSON.stringify(juego, null, 2);
  };

  const enviarJson = async () => {
    try {
      const response = await fetch('http://localhost:5183/Pasapalabra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: resultadoJson.value
      });
      const data = await response.json();
      console.log('Éxito:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { juego, resultadoJson, generarJson, enviarJson };
});
