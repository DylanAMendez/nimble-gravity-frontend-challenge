import { useState } from 'react';
import { CandidateProfile } from './components/Candidate';
import { type Candidate } from './types/index';
import { type Job } from './types/index';
import { JobsList } from './components/Jobs';



function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>

      <h1>Nimble Gravity Challenge</h1>


      <CandidateProfile onCandidateLoaded={setCandidate} />

      <JobsList onJobsList={setJobs} />

    </div>

  );
}

export default App;