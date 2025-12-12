import axios from "axios";

const BASE_URL = "http://localhost:8081/api/auth";

const authService = {
  login: async (email, password) => {
    const res = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    // Lưu token vào localStorage
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
    }

    return res.data;
  }
};

export default authService;
