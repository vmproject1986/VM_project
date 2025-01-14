import React, { useState } from 'react';
import Login from './Login';
import UserList from './components/UserList';
import useAuth from './hooks/useAuth';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  return (
    <div>
      <h1>Welcome to VM Project</h1>

      {authenticated ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={() => logout(setAuthenticated)}>Logout</button>
          <UserList />
        </div>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
}

export default App;
