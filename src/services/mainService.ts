import { Credentials } from "@/types"
import axios from "axios"

const loginUrl = "http://localhost:8090/"
const inscriptionsUrl = "http://localhost:8080/inscription/"
const assistantUrl = "http://localhost:8080/assistant/"

export function useCredentials(){
    const login = (credentials: Credentials) => {
        return axios.post(loginUrl+"login/access", credentials)
    }

    return {login};
}

export function useInscriptions(){
    const getInscriptions= () => {
        return axios.get(inscriptionsUrl+"getInscriptions")
    }

    const createInscription = (eventId: number, userId: number) => {
        return axios.post(inscriptionsUrl+`addAssistantInscription/${eventId}/${userId}`);
    }

    const deleteInscription = (eventId: number, userId: number) => {
        return axios.post(inscriptionsUrl+`deleteAssistantInscription/${eventId}/${userId}`);
    }

    return {
        getInscriptions,
        createInscription,
        deleteInscription
    }
}

export function useAssistants(){
    const createAssistant = (id: number) => {
        return axios.post(assistantUrl + id)
    }

    return {
        createAssistant
    }
}