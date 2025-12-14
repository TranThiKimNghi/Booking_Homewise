import axios from "axios";

const API_BASE = "http://localhost:8083/api/bookings";

const bookingItineraryService = {
  getBookingItinerary: async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Chưa đăng nhập");
    }

    try {
      const response = await axios.get(`${API_BASE}/${bookingId}/itinerary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // trả về mảng itinerary
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      throw error;
    }
  },
};

export const getBookingItinerary = bookingItineraryService.getBookingItinerary;

export default bookingItineraryService;
