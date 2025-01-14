import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add a request interceptor to include the token in the headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Refresh the access token
        const refreshToken = localStorage.getItem('refresh_token');
        const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });

        // Store the new access token
        localStorage.setItem('access_token', refreshResponse.data.access);

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return API.request(error.config);
      } catch (refreshError) {
        // If the refresh fails, clear the tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
