// frontend/src/pages/users.js
import { useEffect } from 'react';

export default function UsersPage() {
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return <div>Check browser console for user data</div>;
}