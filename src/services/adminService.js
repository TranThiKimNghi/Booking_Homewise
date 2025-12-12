import api from "./api";

const adminService = {
  getAll: async () => {
    const res = await api.get("/admin");
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/admin/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post("/admin", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/admin/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/admin/${id}`);
    return res.data;
  },
};

export default adminService;
