import React, { useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

function Contact() {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_grcq3ee', // Replace with your EmailJS Service ID
        'template_mx6xfnd', // Replace with your EmailJS Template ID
        form.current,
        '2tZNWzIvUOoPgPfJC' // Replace with your EmailJS User ID (or public key)
      )
      .then(
        () => {
          toast.success('Your message has been sent successfully!', {
            onClose: () => navigate('/dashboard'), // Redirect after toast closes
          });
        },
        () => {
          toast.error('An error occurred. Please try again later.', {
            onClose: () => navigate('/dashboard'), // Redirect after toast closes
          });
        }
      );
  };

  return (
    <div className="page-container">
      <h1>Feedback</h1>
      <p>We'd love to hear your thoughts!</p>
      <NavLink to="/dashboard" className="back-to-dashboard">
        Back to Dashboard
      </NavLink>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="to_name" name="to_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="from_name" name="from_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Contact;
