// src/services/roomService.js
import axios from "axios";

const BASE_URL = "http://34.177.103.163:8082/api/rooms";

const roomService = {
  // Lấy tất cả phòng
  getAll: async () => {
    try {
      const res = await axios.get(BASE_URL);
      console.log("Room API response:", res.data);
      const rooms = res.data.data ?? res.data; // Nếu API trả về { data: [...] } hoặc trực tiếp [...]
      return Array.isArray(rooms) ? rooms : [];
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  },

  // Lấy phòng theo id
  getById: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error);
      return null;
    }
  },

  // Tạo mới phòng
  create: async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },

  // Cập nhật phòng
  update: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error updating room ${id}:`, error);
      throw error;
    }
  },

  // Xóa phòng
  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error deleting room ${id}:`, error);
      throw error;
    }
  },
};

export default roomService;
