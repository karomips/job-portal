import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState(1); // 1 for upload, 2 for registration
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file size (5MB limit)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setError('Please upload only JPG, PNG or PDF files');
      return;
    }

    setFile(selectedFile);
    setSubmitted(false);
    setError(null);

    // Create preview for images
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitted(true);
        localStorage.setItem('uploadId', response.data.file.id);
        setStep(2); // Move to registration step
      } else {
        setError(response.data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (registrationData.password !== registrationData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        ...registrationData,
        uploadId: localStorage.getItem('uploadId')
      });

      if (response.data.success) {
        localStorage.removeItem('uploadId');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-bg-animated">
        <div className="upload-bg-bubble b1"></div>
        <div className="upload-bg-bubble b2"></div>
        <div className="upload-bg-bubble b3"></div>
      </div>
      
      {step === 1 ? (
        <form className="upload-form" onSubmit={handleSubmit}>
          <h2>Submit Your Credentials</h2>
          <p className="upload-desc">
            Step 1: Upload your credentials for verification
          </p>
          
          <div className="upload-field">
            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                className="upload-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="file-upload" className="upload-label">
                <i className="fas fa-cloud-upload-alt"></i>
                <span>{file ? file.name : 'Choose a file'}</span>
              </label>
              
              {previewUrl && (
                <div className="upload-preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              )}
            </div>
            
            <div className="upload-info">
              <p>Accepted formats: PDF, JPG, PNG</p>
              <p>Maximum size: 5MB</p>
            </div>
          </div>

          <button 
            className={`upload-btn ${uploading ? 'uploading' : ''}`} 
            type="submit"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload and Continue to Registration'}
          </button>

          {error && (
            <div className="upload-error">
              {error}
            </div>
          )}
          
          {submitted && (
            <div className="upload-success">
              <i className="fas fa-check-circle"></i>
              Credentials uploaded successfully. Proceeding to registration...
            </div>
          )}
        </form>
      ) : (
        <form className="upload-form registration-step" onSubmit={handleRegistration}>
          <h2>Complete Registration</h2>
          <p className="upload-desc">
            Step 2: Enter your account details
          </p>

          <div className="upload-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={registrationData.name}
              onChange={handleRegistrationChange}
              required
            />
          </div>

          <div className="upload-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              required
            />
          </div>

          <div className="upload-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              required
            />
          </div>

          <div className="upload-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={registrationData.confirmPassword}
              onChange={handleRegistrationChange}
              required
            />
          </div>

          <button 
            className="upload-btn"
            type="submit"
          >
            Complete Registration
          </button>

          {error && (
            <div className="upload-error">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default Upload;