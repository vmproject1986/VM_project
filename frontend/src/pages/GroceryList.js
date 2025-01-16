import React, { useState, useEffect } from 'react';
import API from '../api';
import { NavLink } from 'react-router-dom';
import './GroceryList.css';

function GroceryList() {
  const [groceryLists, setGroceryLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroceryLists = async () => {
      try {
        const response = await API.get('food/grocery-lists/all/');
        setGroceryLists(response.data);
      } catch (err) {
        console.error('Error fetching grocery lists:', err);
        setError('Failed to load grocery lists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryLists();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="grocery-list-container">
      <h2>Your Grocery Lists</h2>
      <NavLink to="/food-dashboard" className="back-button">
        Back to Food Ecosystem
      </NavLink>
      {groceryLists.length === 0 ? (
        <p>No grocery lists found. Try generating one!</p>
      ) : (
        <ul className="grocery-list">
          {groceryLists.map((list) => (
            <li key={list.id} className="grocery-list-item">
              <h3>{list.name}</h3>
              <p>{list.items}</p>
              <small>Generated on: {new Date(list.created_at).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroceryList;
