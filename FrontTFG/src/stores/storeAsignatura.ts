import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface Asignatura {
    id: number,
    nombreAsignatura: string
}




const rawData = ref()

const seatData = ref<Asignatura[]>()


export const asignaturaStore = defineStore('asignaturaFunctions', () => {


    function setData(newData: Asignatura[]) {
        seatData.value = newData
    }

    var asignaturas = reactive(Array<Asignatura>());


    async function getAsignaturas() {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Asignatura`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            console.log(json);
            // const mappedData = [{
            //     "id": json["id"],
            //     "nombreAsignatura": json["nombreAsignatura"],
            // }];
            // setData(mappedData);
            asignaturas.push(...json);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function deleteAsignatura(asignaturaId: number) {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Asignatura/${asignaturaId}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function addAsignatura(nombreAsignatura: string) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombreAsignatura": nombreAsignatura
            })
        };

        try {
            const response = await fetch(`http://localhost:5183/Asignatura`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function editAsignatura(asignatura: Asignatura) {
        const requestOptions: RequestInit = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombreAsignatura": asignatura.nombreAsignatura
            })
        };

        try {
            const response = await fetch(`http://localhost:5183/Asignatura/${asignatura.id}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { asignaturas, getAsignaturas, deleteAsignatura, addAsignatura, editAsignatura }
})