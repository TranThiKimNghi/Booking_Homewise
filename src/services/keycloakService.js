import axios from "../utils/axiosConfig"; 

const keycloakService = {
    login: async (username, password) => {
        return axios.post("/iam/login", { username, password });
    },

    logout: async () => {
        return axios.post("/iam/logout");
    },

    validateToken: async (token) => {
        return axios.post("/iam/validate-token", { token });
    },

    getUserInfo: async () => {
        return axios.get("/iam/user-info");
    },

    createUser: async (user) => {
        return axios.post("/iam/create-user", user);
    },

    updateUser: async (id, data) => {
        return axios.put(`/iam/update-user/${id}`, data);
    },

    changePassword: async (payload) => {
        return axios.post(`/iam/change-password`, payload);
    },

    deleteUser: async (id) => {
        return axios.delete(`/iam/delete-user/${id}`);
    }
};

export default keycloakService;
