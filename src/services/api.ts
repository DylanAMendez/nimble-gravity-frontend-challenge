// Forzamos la ruta completa al archivo
import { type Candidate } from "../types/index.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GetCandidateByEmail = async (email: string): Promise<Candidate> => {
    try {

        const res = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`)

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al obtener candidato con email: " + email);
        }

        // console.log("Respuesta del servidor:", await res.json());

        return res.json();
    }
    catch (error) {
        throw error || "Error al obtener candidato con email: " + email;
    }

}