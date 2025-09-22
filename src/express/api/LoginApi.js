import axios from "axios";

const URL = "http://localhost:9900/api/auth/login";

const axiosInstance = axios.create({
  baseURL: URL,
});

export const LoginApi = (data) => {
  return axios.post(URL, data);
};

// export const LoginApi = (data) => axiosInstance.post("/auth/login", data);