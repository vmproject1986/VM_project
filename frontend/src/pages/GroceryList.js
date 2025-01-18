// Updated GroceryList Component with Fix for Recipe Deletion
import React, { useState, useEffect } from 'react';
import API from '../api';
import { NavLink } from 'react-router-dom';
import './GroceryList.css';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import logoImage from '../assets/images/Logo.png';
import changeTitle from '../assets/images/ChangeYourGroceryListTitle.png'



function GroceryList({ logout }) {
  const [groceryLists, setGroceryLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });
  const [editingId, setEditingId] = useState(null); // Track which title is being edited
  const [newTitle, setNewTitle] = useState(''); // Store the updated title
  const [expandedList, setExpandedList] = useState(null); // Track which list is expanded to show recipes
  const [allRecipes, setAllRecipes] = useState([]); // Store all recipes
  const [recipeDeletePopup, setRecipeDeletePopup] = useState({ show: false, recipeId: null, groceryListId: null });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state


  useEffect(() => {
    document.body.className = 'food-app';
    return () => {
      document.body.className = ''; // Cleanup on component unmount
    };
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groceryResponse, recipeResponse] = await Promise.all([
          API.get('food/grocery-lists/all/'),
          API.get('food/recipes/all/'),
        ]);

        setGroceryLists(groceryResponse.data);
        setAllRecipes(recipeResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`food/grocery-lists/${id}/`);
      setGroceryLists((prevLists) => prevLists.filter((list) => list.id !== id));
      setDeletePopup({ show: false, id: null });
    } catch (err) {
      console.error('Error deleting grocery list:', err);
      setError('Failed to delete grocery list. Please try again later.');
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      await API.delete(`food/recipes/${recipeDeletePopup.recipeId}/`);
      // Update the state to remove the deleted recipe
      setAllRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeDeletePopup.recipeId)
      );
      setRecipeDeletePopup({ show: false, recipeId: null, groceryListId: null }); // Close the popup
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('Failed to delete recipe. Please try again later.');
    }
  };

  const handleSeeRecipes = (groceryListId) => {
    if (expandedList === groceryListId) {
      setExpandedList(null); // Collapse the list if already expanded
    } else {
      setExpandedList(groceryListId); // Expand the clicked list
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      const groceryList = groceryLists.find((list) => list.id === id);

      const payload = {
        name: newTitle,
        items: groceryList.items, // Include existing items
      };

      await API.put(`food/grocery-lists/${id}/`, payload);
      setGroceryLists((prevLists) =>
        prevLists.map((list) =>
          list.id === id ? { ...list, name: newTitle } : list
        )
      );
      setEditingId(null);
      setNewTitle('');
    } catch (err) {
      console.error('Error updating grocery list title:', err.response?.data || err.message);
      setError('Failed to update grocery list title. Please try again later.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="grocery-list-container food-app">
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
      {groceryLists.length === 0 ? (
        <p>No grocery lists found. Try generating one!</p>
      ) : (
        <ul className="grocery-list">
          {groceryLists.slice().reverse().map((list) => (
            <li key={list.id} className="grocery-list-item">
              {editingId === list.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSubmit(list.id);
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
                    setEditingId(list.id);
                    setNewTitle(list.name);
                  }}
                  className="editable-title"
                >
                  {list.name}
                </h3>
              )}
              <p>{list.items}</p>
              <small>
                Generated on: {list.timestamp ? new Date(list.timestamp).toLocaleDateString() : 'Unknown Date'}
              </small>
              <button
                className="see-recipes-button"
                onClick={() => handleSeeRecipes(list.id)}
              >
                {expandedList === list.id ? 'Hide Recipes' : 'See Recipes'}
              </button>
              <button
                className="delete-button"
                onClick={() => setDeletePopup({ show: true, id: list.id })}
              >
                Delete
              </button>
              {deletePopup.show && deletePopup.id === list.id && (
                <div className="delete-popup">
                  <p>Are you sure you want to delete this Grocery List?</p>
                  <button
                    className="confirm-button"
                    onClick={() => handleDelete(list.id)}
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
              {expandedList === list.id && (
                <div className="recipes-container">
                  <h4>Recipes:</h4>
                  {allRecipes
                    .filter((recipe) => recipe.grocery_list === list.id)
                    .map((recipe) => (
                      <div key={recipe.id} className="recipe-item">
                        <h5>{recipe.name}</h5>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <button
                          className="delete-recipe-button"
                          onClick={() =>
                            setRecipeDeletePopup({
                              show: true,
                              recipeId: recipe.id,
                              groceryListId: list.id,
                            })
                          }
                        >
                          Delete Recipe
                        </button>
                        {recipeDeletePopup.show &&
                          recipeDeletePopup.recipeId === recipe.id &&
                          recipeDeletePopup.groceryListId === list.id && (
                            <div className="delete-popup">
                              <p>Are you sure you want to delete this Recipe?</p>
                              <button
                                className="confirm-button"
                                onClick={() => handleDeleteRecipe(recipe.id, list.id)}
                              >
                                Yes
                              </button>
                              <button
                                className="cancel-button"
                                onClick={() =>
                                  setRecipeDeletePopup({
                                    show: false,
                                    recipeId: null,
                                    groceryListId: null,
                                  })
                                }
                              >
                                No
                              </button>
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Conditional Rendering of the Image */}
      {groceryLists.length > 0 && (
      <div className="change-title-container">
        <h3>Click List Name to Change</h3>
      </div>
    )}
    </div>
  );


}

export default GroceryList;
