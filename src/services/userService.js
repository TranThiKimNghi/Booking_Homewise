
import api from '../services/api';

const BASE_URL = "/users";

const userService = {
  getAll: async () => {
    try {
      const res = await api.get(BASE_URL);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  create: async (user) => {
    try {
      const res = await api.post(BASE_URL, user);
      return res.data.data;
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error);
      throw error;
    }
  },

  update: async (id, user) => {
    try {
      const res = await api.put(`${BASE_URL}/${id}`, user);
      return res.data.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error.response?.data || error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error.response?.data || error);
      throw error;
    }
  },
};

export default userService;
