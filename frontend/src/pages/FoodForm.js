import React, { useState, useEffect } from 'react';
import API from '../api';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import { jwtDecode } from 'jwt-decode';

import './FoodForm.css';
import logoImage from '../assets/images/Logo.png';

function FoodForm({ logout }) {
  const [formData, setFormData] = useState({
    allergies: '',
    dietary_restrictions: '',
    dietary_preferences: '',
    preferred_foods: '',
    lifestyle: '',
    health_goals: '',
    budget: '',
    additional_info: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Track if response was successful
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state
  const navigate = useNavigate();

  let isSubmitting = false; // Prevent duplicate submissions

  // Function to get user ID from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.user_id || decodedToken.sub; // Use appropriate key based on token structure
      } catch (err) {
        console.error('Error decoding token:', err);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    document.body.className = 'food-app';
    return () => {
      document.body.className = ''; // Cleanup on component unmount
    };
  }, []);

  // Fetch user preferences on component load
  useEffect(() => {
    const fetchPreferences = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const response = await API.get(`/user/${userId}/`);
        const profile = response.data.profile || {};
        // Populate form fields with user preferences or leave blank if null
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...Object.fromEntries(
            Object.entries(profile).map(([key, value]) => [key, value || ''])
          ),
        }));
      } catch (err) {
        console.error('Error fetching user preferences:', err);
      }
    };

    fetchPreferences();
  }, []); // Run only once on component mount

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions
    isSubmitting = true;

    setLoading(true);
    setMessage('');
    setSuccess(false); // Reset success state

    const userId = getUserIdFromToken();
    if (!userId) {
      setMessage('Failed to retrieve user ID. Please log in again.');
      setLoading(false);
      isSubmitting = false;
      return;
    }

    // Remove empty strings from formData
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== '')
    );


    try {
      // Step 1: Update user preferences
      await API.put(`/user/${userId}/`, { profile: filteredData });
      setMessage('Preferences updated successfully!');
      // Step 2: Trigger OpenAI API call to generate data
      await API.post('/food/generate-grocery-list/', {
        prompt: `





Generate a weekly grocery list, followed by 5 recipes based on that list.
The grocery list should have a name and include numeric amounts with the items.
Each recipe should be labeled 'Recipe'.
Each recipe should include a name, ingredients, and instructions.
If any of the following user preferences are included,
 prioritize the grocery list around the included
  user preferences prioritizing from most important to least important user preferences
   in this order:
  1. Allergies
  2. Dietary restrictions
  3. Dietary preferences
  4. Budget
  5. Health goals
  6. Preferred foods
  7. Lifestyle
  8. Additional info

  User preferences are: ${JSON.stringify(filteredData)}

The OUTPUT should look like this:

Weekly Grocery List:

[amount, item],
[amount, item],
...





Recipe:
[recipe name]
[ingredients]
[instructions]

Recipe:
[recipe name]
[ingredients]
[instructions]

...






`,
      });

      setSuccess(true); // Mark response as successful
      setMessage('Grocery List and Recipes generated successfully!');
    } catch (err) {
      console.error('Error updating preferences or generating data:', err);
      setMessage('Failed to update preferences or generate data. Please try again later.');
    } finally {
      setLoading(false);
      isSubmitting = false;
    }
  };

  const handleNavigateToGroceryList = (e) => {
    e.preventDefault();
    if (!success) return; // Prevent navigation if no success
    navigate('/grocery-list');
  };



  return (
    <div className="food-form-container">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />

      {/* Header */}
      <div className="dashboard-header">
        <button className="account-icon" onClick={toggleSidebar}>
          <img src={logoImage} alt="Account" className="account-logo" />
        </button>
      </div>

      {/* Back Button */}
      <NavLink to="/food-dashboard" className="back-button">
        Back to Food Ecosystem
      </NavLink>
      <div>
        <p>All Fields are OPTIONAL.  You can use full sentences, or single words, or leave them blank or say none.</p>
        <p>The more you tailor your PREFERENCES, the more tailored your grocery lists become.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
          // Define custom label mapping
          const labelMapping = {
            allergies: 'Allergies: Are you allergic to anything??',
            dietary_restrictions: 'Dietary Restrictions: Is there anything you want kept off the list?',
            dietary_preferences: 'Dietary Preferences: Are you following any specific diet or program, such as Keto?',
            preferred_foods: 'Preferred Foods: Are there any foods you want included?',
            lifestyle: 'Lifestyle: Are you active, sedentary, an athlete, etc.?',
            health_goals: 'Health Goals: Do you have any special health goals?',
            budget: 'Budget: How much can you spend on groceries per week?',
            additional_info: 'Additional Info: Any thing we forgot and you want to add?',
          };

          // Use the custom label if it exists, otherwise fallback to default
          const label = labelMapping[key] || key.replace(/_/g, ' ').toUpperCase();

          return (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{label}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-control"
                disabled={loading}
                placeholder={`Enter your ${key.replace(/_/g, ' ')}`}
              />
            </div>
          );
        })}

        {/* Messages */}
        {message && (
          <p className={`form-message ${success ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        {/* See Grocery List Button */}
        {success && (
          <button
            className="see-list-button"
            onClick={handleNavigateToGroceryList}
            title="Click to view the newly generated grocery list"
          >
            See New Grocery List
          </button>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Generate Grocery List & Recipes'}
        </button>
      </form>
    </div>
  );

}

export default FoodForm;
