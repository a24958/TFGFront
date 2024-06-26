import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface Juego {
    id: number,
    temaJuego: string,
    codigo: string
}

interface AsignaturaJuego {
    id: number,
    juegoAsignatura: string,
    tipoJuego: number,
    juegos: Juego[]
}

const curso = ref<AsignaturaJuego>({
    id: 0,
    juegoAsignatura: '',
    tipoJuego:0,
    juegos: []
});



const rawData = ref()

const seatData = ref<AsignaturaJuego[]>()


export const juegoStore = defineStore('juegoFunctions', () => {


    function setData(newData: AsignaturaJuego[]) {
        seatData.value = newData
    }

    async function getAsignaturaJuegoById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/AsignaturaJuego/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData = [{
                "id": json["id"],
                "juegoAsignatura": json["juegoAsignatura"],
                "tipoJuego": json["tipoJuego"],
                "juegos": json["juegos"] || [],
            }];
            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { seatData, getAsignaturaJuegoById }
})