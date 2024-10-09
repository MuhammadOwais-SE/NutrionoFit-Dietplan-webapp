"use client";
import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/user-data');
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>{user.name} - {user.goals}</li>
        ))}
      </ul>
    </div>
  );
}
