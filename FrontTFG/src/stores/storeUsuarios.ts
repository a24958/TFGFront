import router from "@/router";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface Usuario {
    id: number,
    name: string,
    email: string,
    rol: string,
}




const rawData = ref()

const seatData = ref<Usuario[]>()


export const usuariosStore = defineStore('usuariosFunctions', () => {


    function setData(newData: Usuario[]) {
        seatData.value = newData
    }

    var usuarios = reactive(Array<Usuario>());


    async function getUsuarios() {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Usuario`, requestOptions);

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
            usuarios.push(...json);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function deleteUsuario(usuarioId: number) {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Asignatura/${usuarioId}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function addUsuario(usuario: Usuario) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario
            })
        };

        try {
            const response = await fetch(`http://localhost:5183/Usuario`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    async function editUsuario(usuario: Usuario) {
        const requestOptions: RequestInit = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario
            })
        };

        try {
            const response = await fetch(`http://localhost:5183/Usuario/${usuario.id}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }


    return { usuarios, getUsuarios, deleteUsuario, addUsuario, editUsuario }
})