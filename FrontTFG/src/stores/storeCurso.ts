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
            const response = await fetch(`http://localhost:5183/Curso`, requestOptions);

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
            const response = await fetch(`http://localhost:5183/Curso/${cursoId}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            // Si la solicitud fue exitosa, actualizar la lista de cursos
            const updatedCursos = seatData.value?.filter(curso => curso.id !== cursoId) || [];
            setData(updatedCursos);

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function addCurso(nuevoCurso: Omit<Curso, 'id'>): Promise<Curso | null> {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCurso)
        };

        try {
            const response = await fetch(`http://localhost:5183/Curso`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            const cursoAgregado: Curso = { id: json.id, nombreCurso: json.nombreCurso };
            setData([...(seatData.value || []), cursoAgregado]);
            return cursoAgregado;

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
            return null;
        }
    }

    return { seatData, getCursos, deleteCurso, addCurso }
});
