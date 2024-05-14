import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface Curso {
    id: number,
    nombreCurso: string,
}

const rawData = ref()

const seatData = ref<Curso[]>()


export const cursoStore = defineStore('cursoFunctions', () => {


    function setData(newData: Curso[]) {
        seatData.value = newData
    }

    async function getCursos() {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Curso`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData: Curso[] = [];

            for (let index = 0; index < json.length; index++) {
                mappedData.push({
                    "id": json[index]["id"],
                    "nombreCurso": json[index]["nombreCurso"],
                })

            }

            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { seatData, getCursos }
})