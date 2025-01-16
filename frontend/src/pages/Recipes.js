import React, { useState, useEffect } from 'react';
import API from '../api';
import { NavLink } from 'react-router-dom';
import './SharedPageStyles.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await API.get('food/recipes/all/');
        setRecipes(response.data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Your Recipes</h2>
      <NavLink to="/food-dashboard" className="back-to-menu-button">
        Back to Food Ecosystem
      </NavLink>
      {recipes.length === 0 ? (
        <p>No recipes found. Try generating some!</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recipes;
