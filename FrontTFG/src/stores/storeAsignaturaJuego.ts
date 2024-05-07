import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface AsignaturaJuego {
    id: number,
    nombreAsignatura: string
}

interface Asignatura {
    id: number,
    nombreAsignatura: string,
    asignaturasJuegos: AsignaturaJuego[]
}

const curso = ref<Asignatura>({
    id: 0,
    nombreAsignatura: '',
    asignaturasJuegos: []
});



const rawData = ref()

const seatData = ref<Asignatura[]>()


export const asignaturaJuegoStore = defineStore('asignaturaJuegoFunctions', () => {


    function setData(newData: Asignatura[]) {
        seatData.value = newData
    }

    async function getAsignaturaById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Asignatura/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData = [{
                "id": json["id"],
                "nombreAsignatura": json["nombreAsignatura"],
                "asignaturasJuegos": json["asignaturasJuegos"] || [],
            }];
            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { seatData, getAsignaturaById }
})