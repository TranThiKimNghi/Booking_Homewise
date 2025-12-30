// src/services/roomServiceService.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/room-services"; // chỉnh lại port + path đúng backend

const roomServiceAPI = {
  // Lấy dịch vụ theo phòng
  getByRoom: async (roomId) => {
    if (!roomId) throw new Error("roomId is required");
    const res = await axios.get(`${BASE_URL}/room/${roomId}`);
    return res.data;
  },

  // Lấy dịch vụ theo khách sạn
  getByHotel: async (hotelId) => {
    if (!hotelId) throw new Error("hotelId is required");
    const res = await axios.get(`${BASE_URL}/hotel/${hotelId}`);
    return res.data;
  },

  // Thêm mới room-service (nếu cần)
  create: async (payload) => {
    const res = await axios.post(`${BASE_URL}`, payload);
    return res.data;
  },
};

export default roomServiceAPI;
