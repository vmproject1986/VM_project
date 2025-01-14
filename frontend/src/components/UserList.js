import React, { useEffect, useState } from 'react';
import API from '../api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/user/user_list/');
        const usersWithProfiles = await Promise.all(
          response.data.map(async (user) => {
            const profileResponse = await API.get(`/user/${user.id}/`);
            return { ...user, profile: profileResponse.data.profile };
          })
        );
        setUsers(usersWithProfiles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {user.email} <br />
            {user.profile && (
              <div>
                <strong>Allergies:</strong> {user.profile.allergies || 'None'} <br />
                <strong>Dietary Restrictions:</strong> {user.profile.dietary_restrictions || 'None'} <br />
                <strong>Health Goals:</strong> {user.profile.health_goals || 'None'} <br />
                <strong>Budget:</strong> {user.profile.budget || 'Not set'}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
