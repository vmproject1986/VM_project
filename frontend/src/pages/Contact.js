import React, { useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import API from '../api'; // Use the Axios instance with token handling
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

function Contact() {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form.current);

      // Make the authenticated POST request using the API instance
      const response = await API.post('/user/send-email/', {
        to_name: formData.get('to_name'),
        from_name: formData.get('from_name'),
        message: formData.get('message'),
      });

      if (response.data.success) {
        // Show success toast and redirect
        toast.success(response.data.success, {
          onClose: () => navigate('/dashboard'), // Redirect after the toast message
        });
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error('Error sending email:', error);

      // Check for specific error messages from the backend
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
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
          <label htmlFor="from_name">Email:</label>
          <input
            type="email"
            id="from_name"
            name="from_name"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Contact;
