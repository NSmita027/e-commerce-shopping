import axios from "axios"; //Axios is a JavaScript library that makes it easy to send requests (GET, POST, PUT, DELETE) from frontend → backend.

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", //This sets the default backend URL.
    headers: {
        "Content-Type": "application/json", //This tells backend → “I am sending JSON data”. Without this, backend may not parse your request body properly.
    },
    withCredentials: false,
      // If you are using cookies for login sessions, set this to true.
      // If you are using JWT tokens in headers (our case), keep it false.
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

