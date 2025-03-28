// frontend/src/hooks/useUsers.js
import { useState, useEffect } from 'react';

export default function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  return users;
}

// Usage in any component:
// const users = useUsers();