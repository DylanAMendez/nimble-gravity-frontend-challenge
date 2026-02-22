// Forzamos la ruta completa al archivo
import { type Candidate, type Job, type ApplicationBody } from "../types/index.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ENDPOINT_GET_CANDIDATE_BY_EMAIL = import.meta.env.VITE_API_ENDPOINT_GET_CANDIDATE_BY_EMAIL;

const API_ENDPOINT_GET_JOBS = import.meta.env.VITE_API_ENDPOINT_GET_JOBS;

const API_ENDPOINT_APPLY_JOB = import.meta.env.VITE_API_ENDPOINT_APPLY_JOB;

export const GetCandidateByEmail = async (email: string): Promise<Candidate> => {
    try {

        const res = await fetch(`${BASE_URL}${API_ENDPOINT_GET_CANDIDATE_BY_EMAIL}${email}`)

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        // console.log("Respuesta del servidor:", await res.json());

        return res.json();
    }
    catch (error) {
        throw error || "Error al obtener candidato con email: " + email;
    }

}

export const GetJobs = async (): Promise<Job[]> => {
    try {

        const res = await fetch(`${BASE_URL}${API_ENDPOINT_GET_JOBS}`);

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return data;
    }
    catch (error: any) {
        throw new Error(error?.message || "Error al obtener listado trabajos");
    }
}

export const ApplyToJob = async (body: ApplicationBody): Promise<{ ok: boolean }> => {
    try {

        const res = await fetch(`${BASE_URL}${API_ENDPOINT_APPLY_JOB}`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

        if (!res.ok) {
            const errorData = await res.json();

            console.error("Detalle del error:", errorData);

            if (errorData) {
                const detailsErrors = errorData.errors ? JSON.stringify(errorData.errors) : "";
                throw new Error(errorData.message || `Error ${res.status}: ${detailsErrors}` || "Datos de postulación inválidos");
            }

            throw new Error(`Error ${res.status}: No se pudo enviar la postulación`);
        }

        return await res.json();
    }
    catch (error: any) {
        throw new Error(error?.message || "Error al intentar postularse");
    }
};