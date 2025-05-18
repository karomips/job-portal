import React, { useEffect, useState } from 'react';
import './Homepage.css';

function Homepage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div className="homepage-container">
      <img src="/barangay_logo.jpg" alt="Job Portal Banner" className="homepage-banner" />
      <h1>Welcome to Barangay Mangan-vaca Job Portal</h1>
      <p>
        Find the latest job opportunities and recommendations for our community. Start your career journey here!
      </p>
      <div className="homepage-jobs-list">
        <h2>Latest Job Posts</h2>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {jobs.slice(0, 5).map((job) => (
              <li key={job._id} className="homepage-job-item">
                <strong>{job.title}</strong> at {job.company} — {job.location}
                <div style={{ fontSize: '0.95em', color: '#555', marginTop: '0.3em' }}>
                  {job.description}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Homepage;