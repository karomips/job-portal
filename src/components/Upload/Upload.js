import React, { useState } from 'react';
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    // Here you would typically send the file to the backend using FormData
    setSubmitted(true);
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Upload Your Credentials</h2>
        <p className="upload-desc">
          Please upload your credentials (e.g., resume, certificates, valid ID) for admin approval.
        </p>
        <div className="upload-field">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            required
          />
        </div>
        <button className="upload-btn" type="submit">Upload</button>
        {submitted && (
          <div className="upload-success">
            Your credentials have been uploaded and are pending admin approval.
          </div>
        )}
      </form>
    </div>
  );
}

export default Upload;