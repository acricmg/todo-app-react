import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Adjust this based on your API URL
  headers: {
    "Content-Type": "application/json",
    // Add other common headers here
  },
});

instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
