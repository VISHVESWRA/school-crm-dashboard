import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9900/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const LoginApi = (data) => axiosInstance.post("/auth/login", data);
export const VerifyEmailApi = (data) =>
  axiosInstance.post("/auth/verify", data);
export const ResetApi = (data) => axiosInstance.post("/auth/reset", data);

// const URL = "http://localhost:9900/api/auth/login";

// export const LoginApi = (data) => axios.post(`${URL}/auth/login`, data);

// // const axiosInstance = axios.create({
// //   baseURL: URL,
// // });

// export const LoginApi = (data) => {
//   return axios.post(URL, data);
// };

// // export const LoginApi = (data) => axiosInstance.post("/auth/login", data);
