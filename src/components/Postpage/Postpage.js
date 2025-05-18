import React, { useState, useEffect } from 'react';
import './Postpage.css';

function Postpage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company || !location || !description) return;
    const newJob = { title, company, location, description };

    // POST to backend
    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    })
      .then(res => res.json())
      .then(addedJob => {
        setJobs([addedJob, ...jobs]);
        setTitle('');
        setCompany('');
        setLocation('');
        setDescription('');
      });
  };

  return (
    <div className="postpage-container">
      <form className="postpage-form" onSubmit={handleSubmit}>
        <h2>Post a Job</h2>
        <div className="postpage-field">
          <label htmlFor="title">Job Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Barangay Health Worker"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="postpage-field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            placeholder="e.g. Barangay Mangan-vaca Health Center"
            value={company}
            onChange={e => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="postpage-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Barangay Mangan-vaca"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="postpage-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe the job responsibilities and requirements"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <button className="postpage-btn" type="submit">Post Job</button>
      </form>

      <div className="postpage-listings">
        <h3>Posted Jobs</h3>
        {jobs.length === 0 ? (
          <p className="postpage-nojobs">No jobs posted yet.</p>
        ) : (
          jobs.map((job, idx) => (
            <div className="postpage-jobcard" key={job._id || idx}>
              <h4>{job.title}</h4>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Postpage;