import axios from "axios";

const BASE_URL = "http://localhost:8082/api/rooms";

const roomService = {
  // =========================
  // GET ALL ROOMS
  // =========================
  getAll: async () => {
    try {
      const res = await axios.get(BASE_URL);
      const rooms = res.data?.data ?? res.data;
      return Array.isArray(rooms) ? rooms : [];
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }
  },

  // =========================
  // GET ROOM BY ID
  // =========================
  getById: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data?.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error);
      return null;
    }
  },

  // =========================
  // ✅ GET ROOMS BY HOTEL ID
  // =========================
  getByHotelId: async (hotelId) => {
    try {
      const res = await axios.get(`${BASE_URL}/hotel/${hotelId}`);
      const rooms = res.data?.data ?? res.data;
      return Array.isArray(rooms) ? rooms : [];
    } catch (error) {
      console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
      throw error;
    }
  },

  // =========================
  // CREATE ROOM
  // =========================
  create: async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return res.data?.data ?? res.data ?? null;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },

  // =========================
  // UPDATE ROOM
  // =========================
  update: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data?.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error updating room ${id}:`, error);
      throw error;
    }
  },

  // =========================
  // DELETE ROOM
  // =========================
  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data?.data ?? res.data ?? null;
    } catch (error) {
      console.error(`Error deleting room ${id}:`, error);
      throw error;
    }
  },
};

export default roomService;
