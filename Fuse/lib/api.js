// frontend/src/lib/api.js
const API_BASE = 'http://localhost:5000/api';

export const fetchUsers = async () => {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

// Usage:
// fetchUsers().then(data => console.log(data));