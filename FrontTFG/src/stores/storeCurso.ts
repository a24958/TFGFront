import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";


// interface Play {
//     id: number,
//     nombre: string,
//     descripcion: string,
//     rutaFoto: string,
//     duracion: number
//     sesiones: Session[]
// }

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

    var cursos = reactive(Array<Curso>());

    getCursos();

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
            // const mappedData = [{
            //     "id": json["id"],
            //     "nombreCurso": json["nombreCurso"],
            // }];
            // setData(mappedData);
            console.log(json)
            cursos.push(...json)


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { cursos, getCursos }
})