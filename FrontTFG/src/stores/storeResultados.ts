import { defineStore } from "pinia";
import { ref } from "vue";


export const resultadosStore = defineStore('resultadosStore', () => {
    const seatData = ref<number[]>([]);

    function setData(newData: number[]) {
        seatData.value = newData;
    }

    async function getResultadoAsignaturaById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Resultado/asignaturas/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            
            if (Array.isArray(json) && json.every(item => typeof item === 'number')) {
                setData(json);
            } else {
                throw new Error('La respuesta de la API no es un array de enteros');
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function getResultadoCursoById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Resultado/cursos/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            
            if (Array.isArray(json) && json.every(item => typeof item === 'number')) {
                setData(json);
            } else {
                throw new Error('La respuesta de la API no es un array de enteros');
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    return { seatData, getResultadoAsignaturaById, getResultadoCursoById };
});
