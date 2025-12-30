import axios from "axios";

const BASE_URL = "http://localhost:8082/api/hotel-images";

const hotelImageService = {
    // POST /api/hotel-images
    upload: async (formData) => {
        const res = await axios.post(HOTEL_IMAGE_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    // DELETE /api/hotel-images/{id}
    delete: async (id) => {
        const res = await axios.delete(`${BASE_URL}/${id}`);
        return res.data;
    },

    // GET /api/hotel-images/hotel/{hotelId}
     getByHotelId: async (hotelId) => {
    const res = await axios.get(`${BASE_URL}/hotel/${hotelId}`);
    return res.data;
  },
};

export default hotelImageService;
