import axios from "axios";

const api = axios.create({
  baseURL: "https://pft-backend-0di1.onrender.com/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    if (status === 403 && message?.includes("verify")) {
      window.location.href = "/verify-otp";
    }

    return Promise.reject(error);
  }
);

export default api;
