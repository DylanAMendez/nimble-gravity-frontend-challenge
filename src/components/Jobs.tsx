import { type Job } from "../types/index";

import { GetJobs } from '../services/api';

import { useEffect, useState } from 'react';

import { JobItem } from './JobItem';

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

    const handleJobSubmit = (jobId: string, repoUrl: string) => {
        console.log(`Enviando postulación para el Job ID: ${jobId}`);
        console.log(`Repo URL: ${repoUrl}`);

        alert(`Listo para enviar el Step 5 con el repo: ${repoUrl}`);
    };

    if (loading) return <p>Cargando lista de trabajos...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div >
            <h2>Posiciones Abiertas</h2>

            <ul style={{ padding: 0 }}>

                {jobs.map((job) =>
                (
                    <JobItem
                        key={job.id}
                        job={job}
                        onSubmit={handleJobSubmit}
                    />
                ))}
            </ul>

        </div>
    );
};