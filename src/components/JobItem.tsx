import { useState } from 'react';
import { type Job } from '../types/index';

import styles from '../styles/JobItem.module.css';

interface JobItemProps {
    job: Job;
    onSubmit: (jobId: string, repoUrl: string) => void;
}

export const JobItem = ({ job, onSubmit }: JobItemProps) => {

    const [repoUrl, setRepoUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const cleanUrl = repoUrl.replace(/\s+/g, '');

        if (!cleanUrl) {
            alert("La URL no puede estar vacía");
            return;
        }

        if (!cleanUrl.includes("github.com")) {
            alert("Por favor, ingresa una URL válida de GitHub");
            return;
        }

        onSubmit(job.id, cleanUrl);
    };

    return (
        <li className={styles['job-card']}>
            <h3 className={styles['job-title']}>{job.title}</h3>

            <form onSubmit={handleSubmit} className={styles['job-form']}>
                <input
                    type="url"
                    placeholder="https://github.com/tu-usuario/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className={styles['job-input']}
                    required
                />

                <button type="submit" className={styles['job-button']}>
                    Enviar
                </button>
            </form>
        </li>
    );
};