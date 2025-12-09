import axios from "axios";

const BASE_URL = "http://localhost:8082/api/nearby";

const nearbyService = {

    // Lấy top địa điểm gần khách sạn
    getTopNearby: async (hotelId) => {
        try {
            const res = await axios.get(`${BASE_URL}/${hotelId}/top-nearby`);
            return res.data;
        } catch (error) {
            console.error("Error fetching nearby places:", error.response || error);
            throw error;
        }
    },
};

export default nearbyService;
