'use client';

import { useEffect } from 'react';

export default function MappingGuidePage() {
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = '/mappingguide/index.html';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to FHIR IQ Mapping Wiki...</p>
    </div>
  );
}
