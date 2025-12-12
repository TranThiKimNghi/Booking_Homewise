
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/services";

const servicesService = {
  // Lấy tất cả phòng
  getAll: async () => {
    try {
      const res = await axios.get(BASE_URL);
      console.log("Service API response:", res.data);
      const rooms = res.data.data ?? res.data; 
      return Array.isArray(rooms) ? rooms : [];
    } catch (error) {
      console.error("Error fetching service:", error);
      return [];
    }
  },

  // Lấy phòng theo id
  getById: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      return null;
    }
  },
 
  // Tạo mới phòng
  create: async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  },

  // Cập nhật phòng
  update: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      throw error;
    }
  },

  // Xóa phòng
  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      throw error;
    }
  },
};


export default roomService;
