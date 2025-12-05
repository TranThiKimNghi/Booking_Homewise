import api from '../services/api';

const BASE_URL = "/booking-details";


const booking_detailService = {
  getAll: async () => {
    try {
      const res = await api.get(BASE_URL);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const res = await api.post(BASE_URL, data);
      return res.data.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const res = await api.put(`${BASE_URL}/${id}`, data);
      return res.data.data;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  },
};

export default bookingService;
