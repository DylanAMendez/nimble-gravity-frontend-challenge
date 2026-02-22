import { type Candidate, type Job, type ApplicationBody } from "../types/index";

import { ApplyToJob, GetJobs } from '../services/api';

import { useEffect, useState } from 'react';

import { JobItem } from './JobItem';

interface Props {
    onJobsList: (jobs: Job[]) => void;
    candidate: Candidate;
}

export const JobsList = ({ onJobsList, candidate }: Props) => {

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

    const handleJobSubmit = async (jobId: string, repoUrl: string) => {
        try {
            const applicationData: ApplicationBody =
            {
                uuid: candidate.uuid,
                jobId: jobId,
                candidateId: String(candidate.candidateId),
                repoUrl: repoUrl,
                applicationId: candidate.applicationId
            };

            const result = await ApplyToJob(applicationData);

            if (result.ok) {
                console.log(`Postulación exitosa para ${candidate.firstName}!`);
                alert(`Postulación exitosa para ${candidate.firstName}!`);
            }
        } catch (err: any) {
            alert(err.message);
        }
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