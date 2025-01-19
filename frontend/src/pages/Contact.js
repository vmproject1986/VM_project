import React, { useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
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

      // Post to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/send-email/`,
        {
          to_name: formData.get('to_name'),
          from_name: formData.get('from_name'),
          message: formData.get('message'),
        }
      );

      if (response.data.success) {
        toast.success(response.data.success, {
          onClose: () => navigate('/dashboard'), // Redirect after toast
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.', {
        onClose: () => navigate('/dashboard'), // Redirect after toast
      });
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

      <ToastContainer />
    </div>
  );
}

export default Contact;
