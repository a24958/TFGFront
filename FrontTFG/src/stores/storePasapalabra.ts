import { defineStore } from "pinia";
import { ref } from "vue";

interface Pasapalabra {
    id: number,
    name: string,
    preguntas: PreguntaPasapalabra[]
}

interface PreguntaPasapalabra {
    id: number,
    pregunta: string,
    respuesta: string,
    letra: string,
    contestado: boolean,
    acertado: boolean,
}

const rawData = ref()

const seatData = ref<Pasapalabra[]>()

const multiplayerData = ref<Pasapalabra[]>();

export const pasapalabraStore = defineStore('pasapalabraStore', () => {

    function setData(newData: Pasapalabra[]) {
        seatData.value = newData
    }

    async function getPasapalabraById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Pasapalabra/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();

            const mappedData = [{
                "id": json["id"],
                "name": json["name"],
                "preguntas": json["preguntas"] || []
            }];

            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function getMultiplayerPasapalabra() {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/multijugador`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData: Pasapalabra[] = [];

            for (let index = 0; index < json.length; index++) {
                mappedData.push({
                    "id": json[index]["id"],
                    "name": json[index]["name"],
                    "preguntas": json[index]["preguntas"] || []
                })

            }
            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    return { seatData, getPasapalabraById, getMultiplayerPasapalabra }
})