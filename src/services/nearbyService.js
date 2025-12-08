import api from "../services/api";

const BASE_URL = "/nearby";

const nearbyService = {

    // Lấy top địa điểm gần khách sạn
    getTopNearby: async (hotelId) => {
        try {
            const res = await api.get(`${BASE_URL}/${hotelId}/top-nearby`);
            return res.data;
        } catch (error) {
            console.error("Error fetching nearby places:", error.response || error);
            throw error;
        }
    },
};

export default nearbyService;
