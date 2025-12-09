import axios from "axios";

const BASE_URL = "http://localhost:8082/api/hotels";

const hotelService = {
  // Lấy danh sách tất cả khách sạn
  getAll: async () => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data; // giả sử API trả { data: [...] }
    } catch (error) {
      console.error("Error fetching hotels:", error.response || error);
      throw error;
    }
  },

  // Lấy chi tiết 1 khách sạn theo id
  getById: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching hotel:", error.response || error);
      throw error;
    }
  },

  // Tạo khách sạn mới (nếu API hỗ trợ)
  create: async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return res.data;
    } catch (error) {
      console.error("Error creating hotel:", error.response || error);
      throw error;
    }
  },

  // Cập nhật khách sạn
  update: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data;
    } catch (error) {
      console.error("Error updating hotel:", error.response || error);
      throw error;
    }
  },

  // Xóa khách sạn
  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting hotel:", error.response || error);
      throw error;
    }
  },
};

export default hotelService;
