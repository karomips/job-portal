import React, { useEffect, useState } from 'react';
import './Homepage.css';

const slides = [
  { src: '/barangay_logo.jpg', caption: 'Welcome to Barangay Mangan-vaca Job Portal' },
  { src: '/tasktracker.png', caption: 'Find jobs in your community!' },
  { src: '/slide3.png', caption: 'Post your job openings easily.' },
  { src: '/gcccsaco.png', caption: 'Stay updated with the latest opportunities.' },
  { src: '/weatherapp.png', caption: 'Connect with employers and applicants.' },
];

function Homepage() {
  const [jobs, setJobs] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-slideshow" style={{
        width: '100%',
        maxWidth: '700px',
        height: '320px',
        margin: '0 auto 1.5rem auto',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        background: '#f4f4f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={slides[slideIndex].src}
          alt={slides[slideIndex].caption}
          className="homepage-banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
            display: 'block'
          }}
        />
        <div className="homepage-slide-caption" style={{
          position: 'absolute',
          bottom: '12px',
          left: 0,
          right: 0,
          color: '#fff',
          background: 'rgba(36, 102, 36, 0.7)',
          padding: '0.7rem 1rem',
          borderRadius: '0 0 12px 12px',
          fontSize: '1.2rem',
          fontWeight: 600,
          textShadow: '0 2px 8px rgba(0,0,0,0.18)'
        }}>
          {slides[slideIndex].caption}
        </div>
      </div>
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