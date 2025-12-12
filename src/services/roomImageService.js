import api from "axios";

const ROOM_IMAGE_URL = "http://localhost:8082/api/room-images";

const roomImageService = {
  upload: async (data) => {
    const res = await api.post(ROOM_IMAGE_URL, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`${ROOM_IMAGE_URL}/${id}`);
    return res.data;
  },

  getByRoom: async (roomId) => {
    const res = await api.get(`/rooms/${roomId}/images`);
    return res.data;
  }
};

export default roomImageService;
