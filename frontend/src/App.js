import React from 'react';
import Login from './Login';
import UserList from './components/UserList';
import useAuth from './hooks/useAuth';

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to VM Project</h1>

      {isAuthenticated ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={logout}>Logout</button>
          <UserList />
        </div>
      ) : (
        <Login setAuthenticated={login} />
      )}
    </div>
  );
}

export default App;
