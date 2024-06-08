import { defineStore } from "pinia";
import { reactive, ref } from "vue";


interface Resultado {
    usuario: string,
    juego: string,
    resultado: number,
    acertadas: number,
    falladas: number,
}



export const resultadosStore = defineStore('resultadosStore', () => {
    const seatData = ref<number[]>([]);
    const seatData2 = ref<number[]>([]);
    const seatData3 = ref<Resultado[]>()


    function setData(newData: number[]) {
        seatData.value = newData;
    }

    function setData2(newData: number[]) {
        seatData2.value = newData;
    }

    function setData3(newData: Resultado[]) {
        seatData3.value = newData;
    }

    var resultado = reactive(Array<Resultado>());


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
                setData2(json);
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

    async function getResultadosProfesor(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Resultado/profesor/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            // const mappedData = [{
            //     "usuario": json["usuario"],
            //     "juego": json["juego"],
            //     "resultado": json["resultado"],
            //     "acertadas": json["acertadas"],
            //     "falladas": json["falladas"]
            // }];


            resultado.push(...json);

            // setData3(mappedData);

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    return { seatData, seatData2, resultado, getResultadoAsignaturaById, getResultadoCursoById, getResultadosProfesor };
});
