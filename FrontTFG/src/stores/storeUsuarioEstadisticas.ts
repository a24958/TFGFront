import { defineStore } from "pinia";
import { ref } from "vue";

interface Usuario {
    id: number,
    name: string,
    email: string,
    media: number,
    juegosCompletados: number,
    acertadas:number,
    falladas: number,
    resultados: Resultado[]
}

interface Resultado {
    idUsuario: number,
    idJuego: number,
    juego: string,
    completado: string,
    resultado: number,
    acertadas: number,
    falladas: number,
}


const rawData = ref()

const seatData = ref<Usuario[]>()

export const usuarioEstadisticasStore = defineStore('usuarioEstadisticasStore', () => {

    function setData(newData: Usuario[]) {
        seatData.value = newData
    }

    async function getUsuarioById(Id: string) {
        const requestOptions: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:5183/Usuario/${parseInt(Id)}`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            
            const mappedData = [{
                "id": json["id"],
                "name": json["name"],
                "email": json["email"],
                "media": json["media"],
                "juegosCompletados": json["juegoCompletados"],
                "acertadas": json["acertadas"],
                "falladas":json["falladas"],
                "resultados": json["resultados"] || []
            }];

            setData(mappedData);


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
        }
    }

    return { seatData, getUsuarioById }
})