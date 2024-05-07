import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface Asignatura {
    id: number,
    nombreAsignatura: string
}

interface Curso {
    id: number,
    nombreCurso: string,
    asignaturas: Asignatura[]
}

const curso = ref<Curso>({
    id: 0,
    nombreCurso: '',
    asignaturas: []
});



const rawData = ref()

const seatData = ref<Curso[]>()


export const asignaturaStore = defineStore('asignaturaFunctions', () => {


    function setData(newData: Curso[]) {
        seatData.value = newData
    }

    async function getCursoById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Curso/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData = [{
                "id": json["id"],
                "nombreCurso": json["nombreCurso"],
                "asignaturas": json["asignaturas"] || [],
            }];
            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { seatData, getCursoById }
})