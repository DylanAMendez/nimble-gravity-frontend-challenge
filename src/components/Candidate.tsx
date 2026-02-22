import { type Candidate } from "../types/index";

import { GetCandidateByEmail } from '../services/api';
import { useEffect, useState } from 'react';

interface Props {
    onCandidateLoaded: (candidate: Candidate) => void;
}

export const CandidateProfile = ({ onCandidateLoaded }: Props) => {
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const MY_EMAIL = import.meta.env.VITE_CANDIDATE_EMAIL;


    useEffect(() => {
        GetCandidateByEmail(MY_EMAIL)
            .then((data) => {
                setCandidate(data);
                onCandidateLoaded(data);
            })
            .catch((e) => setError(e?.message ?? String(e)))
            .finally(() => setLoading(false));
    }, [onCandidateLoaded]);

    if (loading) return <p>Cargando datos del candidato...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>

            <h2>Candidato: {candidate?.firstName} {candidate?.lastName}</h2>
            <p>Email: {candidate?.email}</p>
            <p>applicationId: {candidate?.applicationId}</p>
            <p>candidateId: {candidate?.candidateId}</p>
            <p>uuid: {candidate?.uuid}</p>

        </div>
    );
};