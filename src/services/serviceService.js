import axios from "axios";

const BASE_URL = "http://localhost:8082/api/services";

const serviceService = {
  getAll: async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  },
  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  },
  create: async (service) => {
    const res = await axios.post(BASE_URL, service);
    return res.data;
  },
  update: async (id, service) => {
    const res = await axios.put(`${BASE_URL}/${id}`, service);
    return res.data;
  },
  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export default serviceService;
