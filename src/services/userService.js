// src/admin/services/userService.js
import axios from "axios";

const BASE_URL = "http://34.177.103.163:8081/api/users";

const userService = {
  getAll: async () => {
  try {
    const res = await axios.get(BASE_URL);
    // Trả về mảng user thực sự
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
      console.error("Error creating user:", error);
      throw error;
    }
  },

  update: async (id, user) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, user);
      return res.data.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },
};

export default userService;
