import { defineStore } from "pinia";
import { ref, type Ref } from 'vue'


interface BuscadorRequestBody {
    idCurso: number,
    idAsignatura: number,
    idTipoJuego: number,
}

interface BuscadorResponseBody {
    id: number,
    temaJuego: string,
    codigo: string,
    idAsignatura: number,
    idCurso: number,
    idTipoJuego: number
}

const TYPE_COURSE = 'nombreCurso';
const TYPE_SUBJECT = 'nombreAsignatura';

const rawData = ref()

const seatData = ref<BuscadorResponseBody[]>()

export const gameFormStore = defineStore('gameFormFunctions', () => {
    async function load(loading: Ref<boolean>) {
        loading.value = true;
        //TODO WIP HARCODED
        await searchGames({
            idCurso: 0,
            idAsignatura: 0,
            idTipoJuego: 1,
        })
        setTimeout(() => {
            loading.value = false;
        }, 2000);
    };

    function setData(newData: BuscadorResponseBody[]) {
        seatData.value = newData
    }

    async function searchGames(body: BuscadorRequestBody) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = body;

        requestOptions.body = JSON.stringify(data);

        try {
            const response = await fetch(`http://localhost:5183/Buscador`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData: BuscadorResponseBody[] = [];

            for (let index = 0; index < json.length; index++) {
                mappedData.push({
                    "id": json[index]["id"],
                    "temaJuego": json[index]["temaJuego"],
                    "codigo": json[index]["codigo"],
                    "idAsignatura": json[index]["idAsignatura"],
                    "idCurso": json[index]["idCurso"],
                    "idTipoJuego": json[index]["idTipoJuego"]
                })
            }

            console.log(mappedData);
            setData(mappedData);



        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    function fillRequestOption(object: Map<any, any>) {
        const test = {};

        object.forEach(key => {
            if (key === TYPE_COURSE) {
                console.log(key)
            }
        });

        // return {
        //     // idCurso: number,
        //     // idAsignatura: number,
        //     // idTipoJuego: number,
        // }
    }

    return { load, seatData, searchGames, fillRequestOption }
})