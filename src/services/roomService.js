
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/rooms";

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
  // Lấy phòng theo hotelId
  getRoomsByHotelId: async (hotelId) => {
    try {
      // API request sẽ là: /rooms?hotelId={hotelId}
      const res = await axios.get(BASE_URL, {
        params: {
          hotelId: hotelId,
        },
      });

      const rooms = res.data.data ?? res.data;
      return Array.isArray(rooms) ? rooms : [];
    } catch (error) {
      console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
      // Quan trọng: Ném lỗi để component RoomList có thể xử lý và hiển thị thông báo lỗi
      throw error; 
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
