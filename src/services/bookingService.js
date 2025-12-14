import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8083/api",
  withCredentials: true,
});

// 👉 interceptor tự gắn token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const bookingService = {
  create: (data) => api.post("/bookings", data),
  getMyBookings: () => api.get("/bookings/me"),
  getAllBookings: () => api.get("/bookings"),
  delete: (id) => api.delete(`/bookings/${id}`),

};

export default bookingService;
