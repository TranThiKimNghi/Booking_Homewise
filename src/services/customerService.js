import api from "./api";

const customerService = {
  get: async () => {
    const res = await api.get("/customer");
    return res.data;
  },

  update: async (data) => {
    const res = await api.put("/customer", data);
    return res.data;
  },

  delete: async () => {
    const res = await api.delete("/customer");
    return res.data;
  },
};

export default customerService;
