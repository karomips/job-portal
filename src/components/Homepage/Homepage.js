import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
              <img src="/barangay_logo.jpg" alt="Job Portal Banner" className="homepage-banner" />
      <h1>Welcome to Barangay Mangan-vaca Job Portal</h1>
      <p>
        Find the latest job opportunities and recommendations for our community. Start your career journey here!
      </p>
      {/* If your image is in the public folder, use the path below */}
    </div>
  );
}

export default Homepage;