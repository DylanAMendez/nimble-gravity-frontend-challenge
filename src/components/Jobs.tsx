import { type Job } from "../types/index";

import { GetJobs } from '../services/api';

import { useEffect, useState } from 'react';

interface Props {
    onJobsList: (jobs: Job[]) => void;
}

export const JobsList = ({ onJobsList }: Props) => {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        GetJobs()
            .then((jobs) => {
                setJobs(jobs);
                onJobsList(jobs);
            })
            .catch((error) => {
                setError(error.message || "Error al obtener lista de trabajos");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando lista de trabajos...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    if (jobs.length === 0) {
        return <p>No hay trabajos disponibles en este momento.</p>;
    }

    return (
        <div>
            <h2>Lista de Trabajos</h2>

            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>{job.title}</li>
                ))}
            </ul>

        </div>
    )

}
