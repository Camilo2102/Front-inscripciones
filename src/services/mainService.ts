import { Credentials } from "@/types"
import axios from "axios"

const loginUrl = "http://localhost:8090/"
const inscriptionsUrl = "https://inscripciones-cts9.onrender.com/inscription/"
const assistantUrl = "https://inscripciones-cts9.onrender.com/assistant/"

/**
 * Hook personalizado que proporciona funciones relacionadas con la autenticación.
 * @returns Objeto con la función de inicio de sesión.
 */
export function useCredentials(){
    /**
     * Realiza una solicitud para iniciar sesión utilizando las credenciales proporcionadas.
     * @param credentials Las credenciales del usuario.
     * @returns Una promesa que resuelve con la respuesta de la solicitud de inicio de sesión.
     */
    const login = (credentials: Credentials) => {
        return axios.post(loginUrl+"login/access", credentials)
    }

    return {login};
}

/**
 * Hook personalizado que proporciona funciones relacionadas con las inscripciones a eventos.
 * @returns Objeto con funciones para obtener, crear y eliminar inscripciones.
 */
export function useInscriptions(){
    /**
     * Obtiene la lista de inscripciones.
     * @returns Una promesa que resuelve con la respuesta de la solicitud para obtener inscripciones.
     */
    const getInscriptions= () => {
        return axios.get(inscriptionsUrl+"getInscriptions")
    }

    /**
     * Crea una nueva inscripción para un evento específico.
     * @param eventId El ID del evento al que se desea inscribir.
     * @param userId El ID del usuario que realiza la inscripción.
     * @returns Una promesa que resuelve con la respuesta de la solicitud para crear la inscripción.
     */
    const createInscription = (eventId: number, userId: number) => {
        return axios.post(inscriptionsUrl+`addAssistantInscription/${eventId}/${userId}`);
    }

    /**
     * Elimina la inscripción de un evento para un usuario específico.
     * @param eventId El ID del evento del que se desea cancelar la inscripción.
     * @param userId El ID del usuario cuya inscripción se desea cancelar.
     * @returns Una promesa que resuelve con la respuesta de la solicitud para eliminar la inscripción.
     */
    const deleteInscription = (eventId: number, userId: number) => {
        return axios.post(inscriptionsUrl+`deleteAssistantInscription/${eventId}/${userId}`);
    }

    return {
        getInscriptions,
        createInscription,
        deleteInscription
    }
}

/**
 * Hook personalizado que proporciona funciones relacionadas con los asistentes.
 * @returns Objeto con la función para crear un nuevo asistente.
 */
export function useAssistants(){
    /**
     * Crea un nuevo asistente con el ID especificado.
     * @param id El ID del asistente que se desea crear.
     * @returns Una promesa que resuelve con la respuesta de la solicitud para crear el asistente.
     */
    const createAssistant = (id: number) => {
        return axios.post(assistantUrl + id)
    }

    return {
        createAssistant
    }
}