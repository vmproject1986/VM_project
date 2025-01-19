import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Use environment variable for base URL
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
        const refreshToken = localStorage.getItem('refresh_token');
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/token/refresh/`, // Use environment variable for refresh URL
          {
            refresh: refreshToken,
          }
        );

        // Store the new access and refresh tokens
        localStorage.setItem('access_token', refreshResponse.data.access);
        localStorage.setItem('refresh_token', refreshResponse.data.refresh);

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return API.request(error.config);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default API;
