import React, { useState, useEffect } from 'react';
import API from '../api';
import { NavLink } from 'react-router-dom';
import './Recipe.css';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import logoImage from '../assets/images/Logo.png';

function Recipes({ logout }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });
  const [editingId, setEditingId] = useState(null); // Track which recipe title is being edited
  const [newTitle, setNewTitle] = useState(''); // Store the updated title
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  useEffect(() => {
      document.body.className = 'food-app';
      return () => {
        document.body.className = ''; // Cleanup on component unmount
      };
    }, []);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`food/recipes/${id}/`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
      setDeletePopup({ show: false, id: null });
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('Failed to delete recipe. Please try again later.');
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      const recipe = recipes.find((recipe) => recipe.id === id);

      const payload = {
        name: newTitle,
        ingredients: recipe.ingredients, // Include existing ingredients
        instructions: recipe.instructions, // Include existing instructions
        grocery_list: recipe.grocery_list, // Ensure related grocery list is included
        user_feedback: recipe.user_feedback || '', // Include optional user feedback
      };

      await API.put(`food/recipes/${id}/`, payload);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, name: newTitle } : recipe
        )
      );
      setEditingId(null);
      setNewTitle('');
    } catch (err) {
      console.error('Error updating recipe title:', err.response?.data || err.message);
      setError('Failed to update recipe title. Please try again later.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }






  return (
    <div className="recipe-container">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} logout={logout} />

      {/* Header */}
      <div className="dashboard-header">
        <button className="account-icon" onClick={toggleSidebar}>
          <img src={logoImage} alt="Account" className="account-logo" />
        </button>
      </div>

      {/* Back to Food Dashboard Button */}
      <div className="back-button-container">
        <NavLink to="/food-dashboard" className="back-button">
          Back to Food Ecosystem
        </NavLink>
      </div>

      {/* Main Content */}
      {recipes.length === 0 ? (
        <p>No recipes found. Try generating some!</p>
      ) : (
        <ul className="recipe-list">
  {recipes.slice().reverse().map((recipe) => (
    <li key={recipe.id} className="recipe-item">
      {editingId === recipe.id ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit(recipe.id);
          }}
        >
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="edit-input"
          />
          <button type="submit" className="save-button">Save</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              setEditingId(null);
              setNewTitle('');
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <h3
          onClick={() => {
            setEditingId(recipe.id);
            setNewTitle(recipe.name);
          }}
          className="editable-title"
        >
          {recipe.name}
        </h3>
      )}
      <h4>Ingredients:</h4>
      <p>{recipe.ingredients}</p>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
      <h4>Grocery List:</h4>
      <p>{recipe.grocery_list_name}</p>
      <button
        className="delete-button"
        onClick={() => setDeletePopup({ show: true, id: recipe.id })}
      >
        Delete
      </button>
      {deletePopup.show && deletePopup.id === recipe.id && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this Recipe?</p>
          <button
            className="confirm-button"
            onClick={() => handleDelete(recipe.id)}
          >
            Yes
          </button>
          <button
            className="cancel-button"
            onClick={() => setDeletePopup({ show: false, id: null })}
          >
            No
          </button>
        </div>
      )}
    </li>
  ))}
</ul>

      )}

      {/* Delete Popup */}
      {deletePopup.show && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this recipe?</p>
          <button
            className="confirm-button"
            onClick={() => handleDelete(deletePopup.id)}
          >
            Yes
          </button>
          <button
            className="cancel-button"
            onClick={() => setDeletePopup({ show: false, id: null })}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipes;
