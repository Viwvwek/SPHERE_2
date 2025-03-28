import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    return null;
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Profile fetch failed:", error.response?.data?.message || error.message);
    return null;
  }
};
