import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <h1>Contact Us</h1>
      <p>Have questions? Reach out to us via the form below.</p>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="user_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="user_email" required />
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
