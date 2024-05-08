import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface User {
    id: number,
    email: string,
    nombre: string,
    avatar: string
}

const user = ref<User>({
    id: 0,
    email: '',
    nombre: '',
    avatar: ''
});



const rawData = ref()

const seatData = ref<User[]>()



export const loginStore = defineStore('loginFunctions', () => {

    function setData(newData: User[]) {
        seatData.value = newData
    }
    
    async function getUser(email: string, password: string) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const data = {
            "email": email,
            "password": password,
        }

        requestOptions.body = JSON.stringify(data);

        try {
            const response = await fetch('http://localhost:5183/login', requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const json = await response.json();
            console.log(json);
            const userData = {
                    "id": json["id"],
                    "email": json["email"],
                    "nombre": json["nombre"],
                    "avatar": json["avatar"]
            }
            console.log(userData);

            
            // Guardar datos en el Local Storage
            localStorage.setItem('userData', JSON.stringify(userData));
            const mappedData = [{
                "id": json["id"],
                    "email": json["email"],
                    "nombre": json["nombre"],
                    "avatar": json["avatar"]
            }];
            setData(mappedData)
            return userData;

        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
            return false;
        }
    }


    async function postUser(user: string, email: string, password: string) {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = {
            "email": email,
            "password": password,
            "nombre": user,
        }

        requestOptions.body = JSON.stringify(data);

        try {
            const response = await fetch(`http://localhost:5183/register`, requestOptions);

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            return true;


        } catch (error) {
            console.log('Error al hacer la llamada a la API:', error);
            return false;
        }
    }

    return {seatData, getUser, postUser }
})