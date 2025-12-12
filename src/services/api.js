// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://34.177.103.163:8000/common/api"
// // });

// // // api.interceptors.request.use(config => {
// // //   const adminToken = localStorage.getItem("adminToken");
// // //   const customerToken = localStorage.getItem("customerToken");

// // //   if (adminToken) {
// // //     config.headers.Authorization = `Bearer ${adminToken}`;
// // //   } else if (customerToken) {
// // //     config.headers.Authorization = `Bearer ${customerToken}`;
// // //   }

// // //   return config;
// // //});

// // export default api;

import axios from "axios";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

