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

const TYPE_COURSE = 'Curso';
const TYPE_SUBJECT = 'Asignatura';

const rawData = ref()

const requestData = ref<BuscadorRequestBody>({
    idTipoJuego: 0,
    idCurso: 0,
    idAsignatura: 0
});

const seatData = ref<BuscadorResponseBody[]>()

export const gameFormStore = defineStore('gameFormFunctions', () => {
    async function load(loading: Ref<boolean>) {
        loading.value = true;
        await searchGames(requestData.value);
        setTimeout(() => {
            loading.value = false;
        }, 1000);

        return seatData.value?.length;
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
            const response = await fetch(`https://galactic2api.retocsv.es/Buscador`, requestOptions);

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
            setData(mappedData);

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    function restoreRequestOption() {
        requestData.value.idAsignatura = 0,
            requestData.value.idCurso = 0,
            requestData.value.idTipoJuego = 1
    }

    function fillRequestOption(object: any, type: string) {
        const id = object?.id ?? 0;

        switch (type) {
            case TYPE_COURSE:
                requestData.value.idCurso = id;
                break;
            case TYPE_SUBJECT:
                requestData.value.idAsignatura = id;
                break;
            default:
                requestData.value.idTipoJuego = id;
                break;
        }
    }

    return { load, seatData, searchGames, fillRequestOption, restoreRequestOption }
})