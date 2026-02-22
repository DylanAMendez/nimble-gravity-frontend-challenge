import { useState } from 'react';
import { CandidateProfile } from './components/Candidate';
import { type Candidate } from './types/index';



function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>

      <h1>Nimble Gravity Challenge</h1>


      <CandidateProfile onCandidateLoaded={setCandidate} />


    </div>

  );
}

export default App;