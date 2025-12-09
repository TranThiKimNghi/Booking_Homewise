
import api from '../services/api';

import axios from "axios";

const BASE_URL = "http://localhost:8082/api/users";

const userService = {
  getAll: async () => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  create: async (user) => {
    try {
      const res = await axios.post(BASE_URL, user);
      return res.data.data;
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error);
      throw error;
    }
  },

  update: async (id, user) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, user);
      return res.data.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error.response?.data || error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error.response?.data || error);
      throw error;
    }
  },
};

export default userService;
