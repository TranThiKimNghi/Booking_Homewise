import axios from "axios";

const BASE_URL = "http://localhost:8082/api/hotel-images";

const hotelImageService = {
    // POST /api/hotel-images
    upload: async (data) => {
        const res = await axios.post(BASE_URL, data);
        return res.data;
    },

    // DELETE /api/hotel-images/{id}
    delete: async (id) => {
        const res = await axios.delete(`${BASE_URL}/${id}`);
        return res.data;
    },

    // GET /api/hotel-images/hotel/{hotelId}
    getByHotelId: async (hotelId) => {
        try {
            const res = await axios.get(`${BASE_URL}/hotel/${hotelId}`);
            return res.data.data || []; 
        } catch (err) {
            console.error("Fetch hotel images failed:", err);
            return [];
        }
    }
};

export default hotelImageService;
