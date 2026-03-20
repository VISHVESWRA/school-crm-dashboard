import axios from "axios";
import axiosInstance from "./axiosInstance";

export const LoginApi = (data) => axiosInstance.post("/auth/login", data);
export const VerifyEmailApi = (data) =>
  axiosInstance.post("/auth/verify", data);
export const ResetApi = (data) => axiosInstance.post("/auth/reset", data);

export const ForgotPasswordApi = (data) =>
  axiosInstance.post("/auth/forgot-password", data);

export const ResetPasswordApi = (token, data) =>
  axiosInstance.post(`/auth/reset-password/${token}`, data);

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:9900/api",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const URL = "http://localhost:9900/api/auth/login";

// export const LoginApi = (data) => axios.post(`${URL}/auth/login`, data);

// // const axiosInstance = axios.create({
// //   baseURL: URL,
// // });

// export const LoginApi = (data) => {
//   return axios.post(URL, data);
// };

// // export const LoginApi = (data) => axiosInstance.post("/auth/login", data);
