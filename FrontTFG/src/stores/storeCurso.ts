import { defineStore } from "pinia";
import { ref } from "vue";

interface Curso {
    id: number;
    nombreCurso: string;
}

const rawData = ref()

const seatData = ref<Curso[]>()

export const cursoStore = defineStore('cursoFunctions', () => {
    function setData(newData: Curso[]) {
        seatData.value = newData;
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
            const response = await fetch(`https://galactic2api.retocsv.es/Curso`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const mappedData: Curso[] = json.map((curso: any) => ({
                id: curso.id,
                nombreCurso: curso.nombreCurso,
            }));

            setData(mappedData);

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function deleteCurso(cursoId: number) {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/Curso/${cursoId}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function addCurso(nombreCurso: string) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombreCurso": nombreCurso
            })
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/Curso`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function editCurso(curso: Curso) {
        const requestOptions: RequestInit = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombreCurso": curso.nombreCurso
            })
        };

        try {
            const response = await fetch(`https://galactic2api.retocsv.es/Curso/${curso.id}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    return { seatData, getCursos, deleteCurso, addCurso, editCurso }
});
