import React, { useState } from 'react';
import API from '../api';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode for decoding the token
import './SharedPageStyles.css';

function FoodForm() {
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
  const [dropdownData, setDropdownData] = useState(null); // For dropdown content
  const [dropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setDropdownVisible(false); // Hide dropdown initially

    const userId = getUserIdFromToken();
    if (!userId) {
      setMessage('Failed to retrieve user ID. Please log in again.');
      setLoading(false);
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
      const response = await API.post('/food/generate-grocery-list/', {
        prompt: `Generate a weekly grocery list, followed by recipes based on that list. The grocery list should be labeled 'Grocery List:'. Each recipe should be labeled 'Recipe:'. Each recipe should include a name, ingredients, and instructions.  If any of the following details are included, prioritize the grocery list around them: ${JSON.stringify(
          filteredData
        )}`,
      });

      console.log('OpenAI Response:', response.data);
      setDropdownData(response.data); // Save response for dropdown
      setDropdownVisible(true); // Show dropdown
      setMessage('Grocery List and Recipes generated successfully!');
    } catch (err) {
      console.error('Error updating preferences:', err);
      setMessage('Failed to update preferences or generate data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Update Your Preferences</h2>
      <NavLink to="/food-dashboard" className="back-to-menu-button">
        Back to Food Ecosystem
      </NavLink>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-control"
              disabled={loading}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Generate Grocery List & Recipes'}
        </button>
      </form>
      {message && <p>{message}</p>}

      {/* Conditionally render dropdown */}
      {dropdownVisible && dropdownData && (
  <div className="dropdown-container">
    <h3>Generated Content:</h3>
    <div>
      <h4>Grocery List</h4>
      <ul>
        {dropdownData.items
          ? dropdownData.items
              .split('\n') // Split the items by newline
              .filter((line) => line.trim() && !line.includes('Grocery List:')) // Remove empty lines and title
              .map((item, index) => <li key={index}>{item.trim()}</li>)
          : <li>No grocery list generated.</li>}
      </ul>
    </div>
    <div>
      <h4>Recipes</h4>
      <ul>
        {dropdownData.recipes && dropdownData.recipes.length > 0 ? (
          dropdownData.recipes.map((recipe, index) => (
            <li key={index}>
              <h5>{recipe.title || 'Unnamed Recipe'}</h5>
              <p>{recipe.ingredients || 'No ingredients provided.'}</p>
              <p>{recipe.instructions || 'No instructions provided.'}</p>
            </li>
          ))
        ) : (
          <li>No recipes generated.</li>
        )}
      </ul>
    </div>
  </div>
)}


    </div>
  );
}

export default FoodForm;
