
import type { RefSymbol } from '@vue/reactivity';
import { defineStore } from 'pinia';
import { reactive, ref } from "vue";

const TYPE_NAME = 'Nombre del Juego';
const TYPE_COURSE = 'Curso';
const TYPE_SUBJECT = 'Asignatura';
const TYPE_GAME = 'Juego';
const TYPE_DESCRIPTION = 'Tema del Juego';

const TYPE_QUESTION = 'Pregunta'
const TYPE_ANSWER = 'Respuesta'

interface RequestBody {
  name: string,
  idJuego: number,
  idCurso: number,
  idAsignatura: number,
  temaJuego: string,
  preguntas: PreguntaPasapalbra[],
}

interface PreguntaPasapalbra {
  letra: string,
  pregunta: string,
  respuesta: string,
}

const RequestBodyData = ref<RequestBody>({
  name: '',
  idJuego: 1,
  idCurso: 0,
  idAsignatura: 0,
  temaJuego: '',
  preguntas: [],
});

const RequestPreguntas = ref<PreguntaPasapalbra[]>(Array.from({ length: 26 }, (_, i) => ({
  letra: String.fromCharCode(65 + i),
  pregunta: '',
  respuesta: '',
})));


export const useJuegoStore = defineStore('juegoStore', () => {
  const resultadoJson = ref('');

  function isRequestHeaderCorrect() {
    if (RequestBodyData.value.name.trim() === '' || RequestBodyData.value.name.trim() === null) {
      return false;
    }
    if (RequestBodyData.value.temaJuego.trim() === '' || RequestBodyData.value.temaJuego.trim() === null) {
      return false;
    }
    if (RequestBodyData.value.idAsignatura === 0 || RequestBodyData.value.idAsignatura === null) {
      return false;
    }
    if (RequestBodyData.value.idCurso === 0 || RequestBodyData.value.idCurso === null) {
      return false;
    }
    if (RequestBodyData.value.idJuego === 0 || RequestBodyData.value.idJuego === null) {
      return false;
    }
    return true;
  }

  function isRequestPreguntasCorrect() {
    if (RequestPreguntas.value.length === 0) {
      return false;
    }

    for (let index = 0; index < RequestPreguntas.value.length; index++) {
      if (RequestPreguntas.value[index].pregunta.trim() === null || RequestPreguntas.value[index].pregunta.trim() === '') {
        return false;
      }

      if (RequestPreguntas.value[index].respuesta.trim() === null || RequestPreguntas.value[index].pregunta.trim() === '') {
        return false;
      }

    }

    return true;
  }

  function isFullRequestBodyCorrect() {
    return isRequestHeaderCorrect() && isRequestPreguntasCorrect();
  }

  function fillRequestHeader(value: string, object: any, requestOption: string) {
    var id = object?.id ?? 0;

    switch (requestOption) {
      case TYPE_NAME:
        RequestBodyData.value.name = value;
        break;
      case TYPE_COURSE:
        RequestBodyData.value.idCurso = id;
        break;
      case TYPE_SUBJECT:
        RequestBodyData.value.idAsignatura = id;
        break;
      case TYPE_GAME:
        RequestBodyData.value.idJuego = id;
        break;
      case TYPE_DESCRIPTION:
        RequestBodyData.value.temaJuego = value;
        break;
    }
  }

  function searchRequestPreguntasIndex(letra: string) {
    for (let index = 0; index < RequestPreguntas.value.length; index++) {
      if (RequestPreguntas.value[index].letra === letra) {
        return index;
      }
    }
  }

  function fillRequestPreguntas(letra: string, value: string, type: string) {
    const findIndex = searchRequestPreguntasIndex(letra);

    switch (type) {
      case TYPE_QUESTION:
        RequestPreguntas.value[findIndex!].pregunta = value;
        break;
      case TYPE_ANSWER:
        RequestPreguntas.value[findIndex!].respuesta = value;
        break;
    }
  }

  async function enviarJson() {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    RequestBodyData.value.preguntas = RequestPreguntas.value;
    var data = RequestBodyData.value;

    requestOptions.body = JSON.stringify(data);

    try {
      const response = await fetch('http://localhost:5183/Pasapalabra', requestOptions);

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

    } catch (error) {
      console.log('Error al hacer la llamada a la API:', error);
    }
  }

  return { resultadoJson, enviarJson, fillRequestHeader, RequestPreguntas, fillRequestPreguntas, isFullRequestBodyCorrect };
});
