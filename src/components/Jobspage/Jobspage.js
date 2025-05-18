import React, { useState } from 'react';

const jobsData = [
  {
    id: 1,
    title: 'Barangay Health Worker',
    company: 'Barangay Mangan-vaca Health Center',
    location: 'Barangay Mangan-vaca',
    description: 'Assist in community health programs and provide basic healthcare services to residents.',
  },
  {
    id: 2,
    title: 'Community Outreach Assistant',
    company: 'Mangan-vaca Community Office',
    location: 'Barangay Mangan-vaca',
    description: 'Support outreach activities and help organize local events for the barangay.',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    description: 'Develop and maintain user interfaces for web applications using React.',
  },
  {
    id: 4,
    title: 'Backend Developer',
    company: 'CodeWorks',
    location: 'Manila, PH',
    description: 'Build and manage server-side logic and databases for scalable applications.',
  },
];

function Jobspage() {
  const [search, setSearch] = useState('');

  const filteredJobs = jobsData.filter(
    job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(36,102,36,0.08)' }}>
      <h1 style={{ color: '#246624', marginBottom: '1.5rem' }}>Job Listings</h1>
      <input
        type="text"
        placeholder="Search jobs, companies, or locations..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '0.8rem 1rem',
          borderRadius: '8px',
          border: '1px solid #b2f2bb',
          marginBottom: '2rem',
          fontSize: '1rem',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} style={{
              background: 'linear-gradient(120deg, #f9f9f9 80%, #e0ffe6 100%)',
              padding: '2rem 1.5rem',
              borderRadius: '14px',
              boxShadow: '0 4px 16px rgba(60, 165, 92, 0.08)',
              border: '1px solid #e0f2e9',
              position: 'relative'
            }}>
              <h2 style={{ color: '#246624', marginTop: 0 }}>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p style={{ marginBottom: '1rem' }}>{job.description}</p>
              <button
                style={{
                  background: 'linear-gradient(90deg, #246624 60%, #3ca55c 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(60, 165, 92, 0.10)',
                  transition: 'background 0.3s, transform 0.2s, box-shadow 0.2s'
                }}
                onClick={() => alert('Application feature coming soon!')}
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', color: '#888' }}>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default Jobspage;