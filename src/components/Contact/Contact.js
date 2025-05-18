import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the message to the backend or email service
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Admin / Community</h2>
        <p className="contact-desc">
          Have questions, suggestions, or want to connect with the admin or other users? Fill out the form below!
        </p>
        <div className="contact-field">
          <label htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Your Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            placeholder="Type your message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            required
          />
        </div>
        <button className="contact-btn" type="submit">Send Message</button>
        {submitted && (
          <div className="contact-success">
            Thank you for reaching out! Your message has been sent.
          </div>
        )}
      </form>
      <div className="contact-info">
        <h3>Other Ways to Connect</h3>
        <ul>
          <li>Email: <a href="mailto:admin@manganvaca-jobportal.com">admin@manganvaca-jobportal.com</a></li>
          <li>Facebook: <a href="https://www.facebook.com/profile.php?id=61552854767866" target="_blank" rel="noopener noreferrer">Barangay Mangan-vaca</a></li>
          <li>Barangay Office: Mangan-vaca, Subic, Zambales</li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;