import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9900/api",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await axios.post(
        "http://localhost:9900/api/auth/refresh-token",
        {
          refreshToken,
        },
      );

      localStorage.setItem("token", res.data.accessToken);

      error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return axios(error.config);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
