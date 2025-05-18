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
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // For fade-in effect on image change
  useEffect(() => {
    setImgLoaded(false);
  }, [slideIndex]);

  return (
    <div className="homepage-container" style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '2rem',
      minHeight: '400px'
    }}>
      {/* Background Animation */}
      <div className="homepage-bg-animated">
        <div className="homepage-bg-bubble b1"></div>
        <div className="homepage-bg-bubble b2"></div>
        <div className="homepage-bg-bubble b3"></div>
        <div className="homepage-bg-bubble b4"></div>
      </div>

      {/* Slideshow Container */}
      <div className="homepage-slideshow" style={{
        width: '100%',
        maxWidth: '700px',
        minWidth: '340px',
        height: '320px',
        flex: '1 1 340px',
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
          className={`homepage-banner ${imgLoaded ? 'fade-in' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
            display: 'block',
            transition: 'opacity 0.7s'
          }}
          onLoad={() => setImgLoaded(true)}
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
        {/* Slide navigation dots */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setSlideIndex(idx)}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: idx === slideIndex ? '#246624' : '#fff',
                border: '2px solid #246624',
                cursor: 'pointer',
                display: 'inline-block',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Latest Job Posts Container */}
      <div className="homepage-latestjobs-container" style={{
        maxWidth: '400px',
        minWidth: '320px',
        flex: '1 1 320px',
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 4px 24px rgba(36,102,36,0.08)',
        padding: '2rem',
        marginTop: 0
      }}>
        <h2 style={{ color: '#246624', marginBottom: '1.2rem' }}>
          Latest Job Posts
          <span style={{
            fontSize: '1rem',
            color: '#888',
            marginLeft: '0.5rem'
          }}>
            ({jobs.length})
          </span>
        </h2>
        {loading ? (
          <div className="spinner" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px'
          }}>
            <div className="lds-dual-ring"></div>
          </div>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {jobs.slice(0, 5).map((job) => (
              <li
                key={job._id}
                className="homepage-job-item"
                style={{
                  marginBottom: '1.2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e0f2e9',
                  transition: 'background 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#f7faf7'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <strong>{job.title}</strong> at {job.company} — {job.location}
                <div style={{ fontSize: '0.95em', color: '#555', marginTop: '0.3em' }}>
                  {job.description}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Welcome Text below the containers */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
        <h1>Welcome to Barangay Mangan-vaca Job Portal</h1>
        <p>
          Find the latest job opportunities and recommendations for our community. Start your career journey here!
        </p>
      </div>
    </div>
  );
}

export default Homepage;