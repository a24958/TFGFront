import { defineStore } from "pinia";
import { ref } from "vue";

interface GameType {
    id: number,
    tipo: string,
}

const rawData = ref()

const seatData = ref<GameType[]>()

export const gameTypeStore = defineStore('gameTypeFunctions', () => {

    function setData(newData: GameType[]) {
        seatData.value = newData
    }

    async function getTipoJuego() {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/TipoJuego/`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData: GameType[] = [];

            for (let index = 0; index < json.length; index++) {
                mappedData.push({
                    "id": json[index]["id"],
                    "tipo": json[index]["tipo"],
                })

            }

            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { seatData, getTipoJuego }
})