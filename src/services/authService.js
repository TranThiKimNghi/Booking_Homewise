import api from "./api";

const authService = {
  // Nhận object { email, password }
  login: async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }

    return res.data;
  },

  logout: async () => {
    localStorage.clear();
  },
};

export default authService;
