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
            const response = await fetch(`https://galactic2api.retocsv.es/TipoJuego/`, requestOptions);

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

    async function deleteTipoJuego(juegoId: number) {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/TipoJuego/${juegoId}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function addTipoJuego(tipo: string) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tipo": tipo
            })
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/TipoJuego`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function editTipoJuego(tipoJuego: GameType) {
        const requestOptions: RequestInit = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tipo": tipoJuego.tipo
            })
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/TipoJuego/${tipoJuego.id}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { seatData, getTipoJuego, deleteTipoJuego, addTipoJuego, editTipoJuego }
})