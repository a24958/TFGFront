import { defineStore } from "pinia";
import { ref } from "vue";

interface Ahorcado {
    id: number,
    name: string,
    idJuego: number,
    preguntaAhorcado: PreguntaAhorcado
}


interface PreguntaAhorcado {
    id: number,
    pregunta: string,
    respuesta: string,
}

const rawData = ref()

const seatData = ref<Ahorcado[]>()

export const ahorcadoStore = defineStore('ahorcadoStore', () => {

    function setData(newData: Ahorcado[]) {
        seatData.value = newData
    }

    async function getAhorcadoById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/Ahorcado/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();

            const mappedData = [{
                "id": json["id"],
                "name": json["name"],
                "idJuego": json["idJuego"],
                "preguntaAhorcado": json["preguntaAhorcado"] || []
            }];

            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }



    return { seatData, getAhorcadoById }
})